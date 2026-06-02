import * as a1lib from "@alt1/base";
import "./css/nis.css";
import "./css/styles.css";
import * as $ from "./js/jquery.js";
import * as main from "./scripts/script.ts";
import * as ImageReader from "./scripts/image-reader.js";
import { v4 as uuid } from 'uuid';
import { buffRegistry } from './scripts/buff-registry.js';

// Tell webpack to add index.html and appconfig.json to output
require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");

let defaultSettings = [
	{ name: "buffOnOffSwitch", value: "true" },
	{ name: "skillingOnOffSwitch", value: "false" },
	{ name: "nexusOnOffSwitch", value: "false" },
	{ name: "mouseTooltip", value: "true" },
	{ name: "buffColor", value: "true" },
	{ name: "soundsOn", value: "false" },
	{ name: "debugMode", value: "false" },
	{ name: "skillingTab", value: "true" },
	{ name: "nexusTab", value: "false" },
	{ name: "presetsTab", value: "true" },
	{ name: "compareTab", value: "false" },
	{ name: "soundVolumeSlider", value: "0.2" },
	{ name: "lowHealthSlider", value: "5000" },
	{ name: "lowPrayerSlider", value: "200" },
	{ name: "lowFamiliarSlider", value: "10000" },
	{ name: "refreshRateSlider", value: "1000" },
	{ name: "timeBufferSlider", value: "15" },
	{ name: "excaliburSlider", value: "8000" },
	{ name: "ritualShardSlider", value: "650" },
	{ name: "interfaceScalingDropdown", value: "100" },

	{ name: "lowHealthBar", value: "false" },
	{ name: "lowPrayerBar", value: "false" },
	{ name: "lowFamiliarBar", value: "false" },
	...buffRegistry.map((b: any) => ({ name: b.name, value: "false" })),
	{ name: "savedPresets", value: "[]" },
]

let presetId = uuid();
let savedPresets: any[] = [];
const buffPresets = document.getElementById('buffPresets');
const skillingPresets = document.getElementById('skillingPresets');

function syncDropdowns(source: any, target: any) {
  target.value = source.value; // Update target value
}

function renderSkillingTab() {
	const skillingBuffs = buffRegistry.filter((b: any) => b.skilling);
	let rows = '';
	for (let i = 0; i < skillingBuffs.length; i += 2) {
		const left = skillingBuffs[i];
		const right = skillingBuffs[i + 1];
		const cell = (buff: any) => buff ? `<td>
					<div class="list-group">
					<label class="list-group-item table-item form-check form-switch form-check-label" for="${buff.name}">
						<input class="form-check-input" type="checkbox" id="${buff.name}" role="switch">
						${buff.friendlyName}
					</label>
					</div>
				</td>` : '<td></td>';
		rows += `<tr>${cell(left)}${cell(right)}</tr>`;
	}
	$('#skilling-buff-rows').html(rows);
}

function renderBuffPresets() {
	const barItems = [
		{ name: "lowHealthBar",   friendlyName: "Low Health" },
		{ name: "lowPrayerBar",   friendlyName: "Low Prayer" },
		{ name: "lowFamiliarBar", friendlyName: "Low Familiar" },
	];
	const all = [...barItems, ...buffRegistry];
	const half = Math.ceil(all.length / 2);
	const makeLabel = (item: any) =>
		`<label class="form-presets-label" for="${item.name}Preset">` +
		`<input class="presetOption" type="checkbox" id="${item.name}Preset" />${item.friendlyName}` +
		`</label>`;
	$('#presets-col-left').html(all.slice(0, half).map(makeLabel).join(''));
	$('#presets-col-right').html(all.slice(half).map(makeLabel).join(''));
}

window.onload = async function start() {
	// Add defaults if missing
	for (let d = 0; d < defaultSettings.length; d++) {
		let foundSetting = localStorage[defaultSettings[d].name];
		
		if (!foundSetting) {
			localStorage.setItem(defaultSettings[d].name, defaultSettings[d].value);
		};
	};
	
	renderSkillingTab();
	renderBuffPresets();

	// Load localStorage into elements
	await loadLocalStorageItems();

	if (window.alt1) {
		main.start();
	};

	loadPresetDropdown(true);
	updateScrollHeight();

	console.log("Ready to save your ass.");

}

function updateScrollHeight() {
    const offsetTop = $(".settings-scroll").offset().top; // distance from top of window
    const windowHeight = $(window).height();             // viewport height

    const newHeight = windowHeight - offsetTop;
    $(".settings-scroll").css("max-height", newHeight + "px");
}

// Run on resize
$(window).on("resize", updateScrollHeight);

let loadLocalStorageItems = async () => {
	for (let i = 0, len = localStorage.length; i < len; i++) {
		const key = localStorage.key(i);
		if (!key) continue;
		const value = localStorage[key];

		if (key.includes("Slider")) {
			$("input#" + key).val(value);
			$("output#" + key + "Output").val(value);
		} else if (key.includes("Dropdown")) {
			$("#" + key).val(value);
		} else if (value == "true" || value == "false") {
			const checked = value === "true";
			const $checkbox = $("input#" + key);

			$checkbox.prop("checked", checked);

			if (key.includes("Tab")) {
				const tabId = key.replace("Tab", "-tab");
				$("#" + tabId).toggle(checked);
			}
	  	} 
	};

	await main.updateSelections();
}

// Listen for pasted (ctrl-v) images, usually used in the browser version of an app
a1lib.PasteInput.listen(img => {
	main.test(img);
}, (err, errid) => {

});

if (window.alt1) {
	alt1.identifyAppUrl("./appconfig.json");
}

let loadPresetDropdown = (firstLoad = false) => {
	newPreset();
	loadPresetJson(firstLoad);

	loadDropdown("presets");
	loadDropdown("buffPresets");
	loadDropdown("skillingPresets");
}

let loadDropdown = (dropdownName: string) => {
	let orderedPresets = savedPresets.sort((a, b) => a.presetName.localeCompare(b.presetName));

	$("#" + dropdownName).empty();

	if (dropdownName == "presets") {
		$("#" + dropdownName).append($("<option>", {
			value: "new",
			text: "---Create New---"
		}))
	} else {
		$("#" + dropdownName).append($("<option>", {
			value: "",
			text: "---Select Preset---"
		}))
	}

	for (let p = 0; p < orderedPresets.length; p++) {
		$("#" + dropdownName).append($("<option>", {
			value: orderedPresets[p].id,
			text: orderedPresets[p].presetName
		}))
	}
}

let loadPresetJson = (firstLoad: boolean) => {
	savedPresets = JSON.parse(localStorage.getItem("savedPresets") ?? "[]");

	if (firstLoad) {
		let options = $(".presetOption");

		for (let s = 0; s < savedPresets.length; s++) {
			for (let o = 0; o < options.length; o++) {
				let foundOption = savedPresets[s].options.find((s: any) => s.name == options[o].id)

				if (!foundOption) {
					savedPresets[s].options.push({
						name: options[o].id,
						setting: false
					})
				}
			}
		}
	}
}

// Change handler for all synced switches
$(document).on("change", ".sync-switch", function() {
    const setting = $(this).data("setting"); // e.g., "onOffSwitch"
    const checked = this.checked;

    // Update all checkboxes with the same data-setting
    $(`.sync-switch[data-setting="${setting}"]`).each(function() {
        $(this).prop("checked", checked);               // visually update checkbox
        localStorage.setItem($(this).attr("id"), checked); // update localStorage per checkbox ID
    });
});

let newPreset = () => {
	presetId = uuid();
	$("#presetName")[0].value = "";

	let options = $(".presetOption");
	for (let o = 0; o < options.length; o++) {
		options[o].checked = false;
	}
}

$("#presets").change(function() {
	if (this.value == "new") {
		newPreset();
	} else {
		presetId = this.value;
		let foundPreset = savedPresets.find(p => p.id == presetId);
		
		if (foundPreset) {
			$("#presetName")[0].value = foundPreset.presetName;

			for (let o = 0; o < foundPreset.options.length; o++) {
				if ($("#" + foundPreset.options[o].name)[0] != undefined) {
					$("#" + foundPreset.options[o].name)[0].checked = foundPreset.options[o].setting;
				}
			}
		}
	}
});

$("#buffPresets").change(function() {selectPreset(this)});
$("#skillingPresets").change(function() {selectPreset(this)});

let selectPreset = (selection: any) => {
	let foundPreset = savedPresets.find(p => p.id == selection.value);
	console.log(foundPreset);
	if (foundPreset) {
		for (let o = 0; o < foundPreset.options.length; o++) {
			let settingName = foundPreset.options[o].name.replace("Preset", "");

			localStorage.setItem(settingName, foundPreset.options[o].setting);
		}

		loadLocalStorageItems();
	}
}

$("#savePreset").click(function() {
	let foundPreset = savedPresets.find(p => p.id == presetId);
	let options = $(".presetOption");
		
	if (foundPreset) {
		foundPreset.presetName = $("#presetName")[0].value;

		for (let o = 0; o < options.length; o++) {
			let foundOption = foundPreset.options.find((s: any) => s.name == options[o].id)

			if (foundOption) {
				foundOption.setting = options[o].checked;
			} else {
				foundPreset.options.push({
					name: options[o].id,
					setting: options[o].checked
				})
			}
		}
	} else {
		let presetName = $("#presetName")[0].value;

		let preset = {
			id: presetId,
			presetName: presetName,
			options: [] as any[]
		};

		for (let o = 0; o < options.length; o++) {
			preset.options.push({
				name: options[o].id,
				setting: options[o].checked
			})
		}

		savedPresets.push(preset);
	}

	localStorage.setItem("savedPresets", JSON.stringify(savedPresets));
	loadPresetDropdown();

	return false;
});

$("#deletePreset").click(function() {
	let foundPreset = savedPresets.find(p => p.id == presetId);
		
	if (foundPreset) {
		savedPresets = savedPresets.filter(function(el) { return el.id != foundPreset.id; });
		localStorage.setItem("savedPresets", JSON.stringify(savedPresets));
		loadPresetDropdown();
	}

	return false;
});

$(".contenttab").on("click", function () {
  // Active tab styling
  $(".contenttab").removeClass("activetab");
  $(this).addClass("activetab");

  // Hide all tab content
  $(".tabcontent").hide();

  // Show the matching content
  const contentId = this.id.replace("-tab", "-content");
  $("#" + contentId).show();

  if (this.id == "settings-tab") {
	updateScrollHeight();
  }
});

// Store Checkbox values in localStorage
$(document).on("change", "input:checkbox", async function() {
	let checkboxId = $(this).attr("id");
	
	if (!checkboxId.includes("Preset")) {
		if ($(this).is(":checked")) {
			localStorage.setItem(checkboxId, "true");
		} else {
			localStorage.setItem(checkboxId, "false");
		}
	
		await main.updateSelections();
	}

	if (checkboxId.includes("Tab")) {
		const tabId = checkboxId.replace("Tab", "-tab");

        if ($(this).is(":checked")) {
            $("#" + tabId).show();
        } else {
            $("#" + tabId).hide();
        }
	}
});

// Store Range values in localStorage
$("input[type=range]").on("input", function() {
	var rangeId = $(this).attr("id");
	var rangeValue = $(this).val();

	localStorage.setItem(rangeId, rangeValue);
	$("#" + rangeId + "Output").val(rangeValue);
});

$("#compareImages").on("change", async function() {
	var firstImage;
	var secondImage;

	if (this.files.length > 1) {
		for (var i = 0; i < this.files.length - 1; i++) {
			if (i == 0) {
				firstImage = await ImageReader.imageToBase64(this.files[i]);
			}

			secondImage = await ImageReader.imageToBase64(this.files[i + 1]);

			console.log("First Image: " + firstImage);
			console.log("Second Image: " + secondImage);
			firstImage = await ImageReader.generateMatchingImage(firstImage, secondImage);
		}

		window.open(firstImage, '_blank');
	}
});

$("#exportPresets").on("click", async function() {
	const fileContent = localStorage.getItem("savedPresets") ?? '';
	const bb = new Blob([fileContent], { type: 'text/plain' });
	let a = document.createElement('a');
	a.download = 'buff_presets.txt';
	a.href = window.URL.createObjectURL(bb);
	a.click();
	a.remove();
});

$("#importPresets").on("change", async function() {
	readFile(this.files[0], (data) => {
		localStorage.setItem("savedPresets", data);
		loadPresetDropdown();
	});
});

$("#interfaceScalingDropdown").change(async function() {
	localStorage.setItem("interfaceScalingDropdown", this.value);
	await main.loadImages();
});

export function readFile(file: File, callback: (data: string) => void) {
    let reader = new FileReader();

    reader.onloadend = function() {
      callback(reader.result as string);
    }

    reader.readAsText(file);
}