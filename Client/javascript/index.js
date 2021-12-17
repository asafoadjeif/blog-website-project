const helpers = require("./helpers");
const mode = require("./mode");

let dark = false;

// add event listener to darkmode switch

function settingListeners() {
    darkModeSwitch=document.getElementById('darkModeSwitch');
    darkModeSwitch.addEventListener('change', () => {
        dark=mode.switchMode(dark);
    })

}

settingListeners();
helpers.lightMode();

