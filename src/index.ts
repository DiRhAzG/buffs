import * as a1lib from "@alt1/base";
import "./css/nis.css";
import "./css/styles.css";
import * as $ from "./js/jquery.js";
import * as main from "./scripts/script.js";
import * as ImageReader from "./scripts/image-reader.js";

// Tell webpack to add index.html and appconfig.json to output
require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");

let defaultSettings = [
	{ name: "mouseTooltip", value: "true" },
	{ name: "lowHealthSlider", value: "4000" },
	{ name: "lowPrayerSlider", value: "200" },
	{ name: "refreshRateSlider", value: "200" },
	{ name: "timeBufferSlider", value: "10" },

	{ name: "overloadBuff", value: "false" },
	{ name: "animateDeadBuff", value: "false" },
	{ name: "excaliburBuff", value: "false" },
	{ name: "prayerRenewalBuff", value: "false" },
	{ name: "ritualShardBuff", value: "false" },
	{ name: "weaponPoisonBuff", value: "false" },
	{ name: "antifireBuff", value: "false" },
	{ name: "placeholderBuff", value: "false" },
	{ name: "lowHealthBar", value: "false" },
	{ name: "lowPrayerBar", value: "false" }
]

window.onload = async function start() {
	// ImageReader.generateMatchingImage();
	// Add defaults if missing
	for (let d = 0; d < defaultSettings.length; d++) {
		let foundSetting = localStorage[defaultSettings[d].name];
		
		if (!foundSetting) {
			localStorage.setItem(defaultSettings[d].name, defaultSettings[d].value);
		};
	};

	// Load localStorage into elements
	for (let i = 0, len = localStorage.length; i < len; i++) {
		let key = localStorage.key(i);
		let value = localStorage[key];

		if (key.includes("Slider")) {
			$("#" + key).val(value);
			$("#" + key + "Output").val(value);
		} else if (key.includes("Buff") || key == "mouseTooltip") {
			if (value == "true") {
				$("#" + key).prop("checked", true);
			} else {
				$("#" + key).prop("checked", false);
			}
	  	} 
	};



	if (window.alt1) {
		main.start();
	};

	setBuffsTab();
	console.log("Ready to save your ass.");
}

// Listen for pasted (ctrl-v) images, usually used in the browser version of an app
a1lib.PasteInput.listen(img => {
	main.test(img);
}, (err, errid) => {

});

if (window.alt1) {
	alt1.identifyAppUrl("./appconfig.json");
}

$(".contenttab").click(function() {
	$(".activetab").removeClass("activetab");
	$(this).addClass("activetab");
	
	if (this.id == "buffs-tab") {
		setBuffsTab();
	} else if (this.id == "settings-tab") {
		setSettingsTab();
	}
});

export function setBuffsTab() {
	$('#buffs-content').show();
	$('#settings-content').hide();
};

export function setSettingsTab() {
	$('#buffs-content').hide();
	$('#settings-content').show();
};

// Store Checkbox values in localStorage
$("input:checkbox").on("change", async function() {
	var checkboxId = $(this).attr("id");

	if ($(this).is(":checked")) {
		localStorage.setItem(checkboxId, "true");
	} else {
		localStorage.setItem(checkboxId, "false");
	}

	await main.updateBuffSettings();
});

// Store Range values in localStorage
$("input[type=range]").on("input", function() {
	var rangeId = $(this).attr("id");
	var rangeValue = $(this).val();

	localStorage.setItem(rangeId, rangeValue);
	$("#" + rangeId + "Output").val(rangeValue);
});