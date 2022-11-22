import * as a1lib from "@alt1/base";
import "./css/nis.css";
import "./css/styles.css";
import * as $ from "./js/jquery.js";
import * as main from "./scripts/script.js";

// Tell webpack to add index.html and appconfig.json to output
require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");

window.onload = async function start() {
	// main.startCountdown();

	// Load localStorage into elements
	for (var i = 0, len = localStorage.length; i < len; i++) {
		var key = localStorage.key(i);
		var value = localStorage[key];

		if (key.includes("Slider")) {
			$("#" + key).val(value);
			$("#" + key + "Output").val(value);
		} else if (value == "true") {
			$("#" + key).attr("checked", "checked");
	  	} 
	}

	if (window.alt1) {
		main.start();
	}

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

// Storage Range values in localStorage
$("input[type=range]").on("input", function() {
	var rangeId = $(this).attr("id");
	var rangeValue = $(this).val();

	localStorage.setItem(rangeId, rangeValue);
	$("#" + rangeId + "Output").val(rangeValue);
});