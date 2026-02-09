import * as a1lib from "@alt1/base";
import "./css/nis.css";
import "./css/styles.css";
import * as $ from "./js/jquery.js";
import * as main from "./scripts/script.js";
import * as ImageReader from "./scripts/image-reader.js";
import { v4 as uuid } from 'uuid';

// Tell webpack to add index.html and appconfig.json to output
require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");

let defaultSettings = [
	{ name: "onOffSwitch", value: "true" },
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

	{ name: "overloadBuff", value: "false" },
	{ name: "animateDeadBuff", value: "false" },
	{ name: "excaliburBuff", value: "false" },
	{ name: "prayerRenewalBuff", value: "false" },
	{ name: "ritualShardBuff", value: "false" },
	{ name: "weaponPoisonBuff", value: "false" },
	{ name: "antifireBuff", value: "false" },
	{ name: "aggressionBuff", value: "false" },
	{ name: "lowHealthBar", value: "false" },
	{ name: "lowPrayerBar", value: "false" },
	{ name: "lowFamiliarBar", value: "false" },
	{ name: "summonRenewBuff", value: "false" },
	{ name: "bookBuff", value: "false" },
	{ name: "vulnBuff", value: "false" },
	{ name: "smokeCloudBuff", value: "false" },
	{ name: "darknessBuff", value: "false" },
	{ name: "auraBuff", value: "false" },
	{ name: "quickPrayerBuff", value: "false" },
	{ name: "crystalMaskBuff", value: "false" },
	{ name: "lightFormBuff", value: "false" },
	{ name: "perfectPlusBuff", value: "false" },
	{ name: "superheatBuff", value: "false" },
	{ name: "torstolBuff", value: "false" },
	{ name: "clanBuff", value: "false" },
	{ name: "savedPresets", value: "[]" },
]

let presetId = uuid();
let savedPresets = [];
const buffPresets = document.getElementById('buffPresets');
const skillingPresets = document.getElementById('skillingPresets');

function syncDropdowns(source, target) {
  target.value = source.value; // Update target value
}

window.onload = async function start() {
	// Add defaults if missing
	for (let d = 0; d < defaultSettings.length; d++) {
		let foundSetting = localStorage[defaultSettings[d].name];
		
		if (!foundSetting) {
			localStorage.setItem(defaultSettings[d].name, defaultSettings[d].value);
		};
	};
	
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

    const newHeight = windowHeight - offsetTop - 10;
    $(".settings-scroll").css("max-height", newHeight + "px");
}

// Run on resize
$(window).on("resize", updateScrollHeight);

let loadLocalStorageItems = async () => {
	for (let i = 0, len = localStorage.length; i < len; i++) {
		let key = localStorage.key(i);
		let value = localStorage[key];

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

let loadDropdown = (dropdownName) => {
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

let loadPresetJson = (firstLoad) => {
	savedPresets = JSON.parse(localStorage.getItem("savedPresets"));

	if (firstLoad) {
		let options = $(".presetOption");

		for (let s = 0; s < savedPresets.length; s++) {
			for (let o = 0; o < options.length; o++) {
				let foundOption = savedPresets[s].options.find(s => s.name == options[o].id)

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
$(".sync-switch").on("change", function() {
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

let selectPreset = (selection) => {
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
			let foundOption = foundPreset.options.find(s => s.name == options[o].id)

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
			options: []
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
});

// Store Checkbox values in localStorage
$("input:checkbox").on("change", async function() {
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
	let fileContent = localStorage.getItem("savedPresets");
	let bb = new Blob([fileContent ], { type: 'text/plain' });
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

export function readFile(file, callback) {
    let reader = new FileReader();

    reader.onloadend = function() {
      callback(reader.result);
    }

    reader.readAsText(file);
}