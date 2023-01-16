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
	{ name: "audioVolumeSlider", value: "1" },
	{ name: "lowHealthSlider", value: "5000" },
	{ name: "lowPrayerSlider", value: "200" },
	{ name: "refreshRateSlider", value: "1000" },
	{ name: "timeBufferSlider", value: "15" },
	{ name: "excaliburSlider", value: "8000" },
	{ name: "ritualShardSlider", value: "650" },

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
	{ name: "savedPresets", value: "[]" },
]

let presetId = uuid();
let savedPresets = [];

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

	setBuffsTab();
	loadPresetDropdown();
	console.log("Ready to save your ass.");
}

let loadLocalStorageItems = async () => {
	for (let i = 0, len = localStorage.length; i < len; i++) {
		let key = localStorage.key(i);
		let value = localStorage[key];

		if (key.includes("Slider")) {
			$("input#" + key).val(value);
			$("output#" + key + "Output").val(value);
		} else if (value == "true" || value == "false") {
			if (value == "true") {
				$("input#" + key).prop("checked", true);
			} else {
				$("input#" + key).prop("checked", false);
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

let loadPresetDropdown = () => {
	newPreset();
	loadPresetJson();

	loadDropdown("presets");
	loadDropdown("savedPresets");
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

let loadPresetJson = () => {
	savedPresets = JSON.parse(localStorage.getItem("savedPresets"));
}

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
				$("#" + foundPreset.options[o].name)[0].checked = foundPreset.options[o].setting;
			}
		}
	}
});

$("#savedPresets").change(function() {selectPreset(this)});

let selectPreset = (selection) => {
	presetId = selection.value;
	let foundPreset = savedPresets.find(p => p.id == presetId);
	
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
		
	if (foundPreset) {
		foundPreset.presetName = $("#presetName")[0].value;

		for (let o = 0; o < foundPreset.options.length; o++) {
			foundPreset.options[o].setting = $("#" + foundPreset.options[o].name)[0].checked;
		}
	} else {
		let presetName = $("#presetName")[0].value;

		let preset = {
			id: presetId,
			presetName: presetName,
			options: []
		};

		let options = $(".presetOption");

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

$(".contenttab").click(function() {
	$(".activetab").removeClass("activetab");
	$(this).addClass("activetab");
	
	if (this.id == "buffs-tab") {
		setBuffsTab();
	} else if (this.id == "compare-tab") {
		setCompareTab();
	} else if (this.id == "alerts-tab") {
		setAlertsTab();
	} else if (this.id == "presets-tab") {
		setPresetsTab();
	} else if (this.id == "settings-tab") {
		setSettingsTab();
	}
});

export function setBuffsTab() {
	$('#buffs-content').show();
	$('#compare-content').hide();
	$('#alerts-content').hide();
	$('#presets-content').hide();
	$('#settings-content').hide();
};

export function setCompareTab() {
	$('#buffs-content').hide();
	$('#compare-content').show();
	$('#alerts-content').hide();
	$('#presets-content').hide();
	$('#settings-content').hide();
};

export function setAlertsTab() {
	$('#buffs-content').hide();
	$('#compare-content').hide();
	$('#alerts-content').show();
	$('#presets-content').hide();
	$('#settings-content').hide();
};

export function setPresetsTab() {
	$('#buffs-content').hide();
	$('#compare-content').hide();
	$('#alerts-content').hide();
	$('#presets-content').show();
	$('#settings-content').hide();
};

export function setSettingsTab() {
	$('#buffs-content').hide();
	$('#compare-content').hide();
	$('#alerts-content').hide();
	$('#presets-content').hide();
	$('#settings-content').show();
};

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
});

// Store Range values in localStorage
$("input[type=range]").on("input", function() {
	var rangeId = $(this).attr("id");
	var rangeValue = $(this).val();

	localStorage.setItem(rangeId, rangeValue);
	$("#" + rangeId + "Output").val(rangeValue);
});

$("#compareImages").on("change", async function() {
	if (this.files.length == 2) {
		ImageReader.imageToBase64(this.files[0], (firstImage) => {
			ImageReader.imageToBase64(this.files[1], async (secondImage) => {
				let url = await ImageReader.generateMatchingImage(firstImage, secondImage);
				window.open(url, '_blank');
			});
		});
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

export function readFile(file, callback) {
    let reader = new FileReader();

    reader.onloadend = function() {
      callback(reader.result);
    }

    reader.readAsText(file);
}