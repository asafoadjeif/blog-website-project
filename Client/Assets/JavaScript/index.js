const helpers = require("./helpers");
const mode = require("./mode");

let dark = false;

function settingListeners() {
    darkModeSwitch=document.getElementById('darkModeSwitch');
    darkModeSwitch.addEventListener('change', () => {
        dark=mode.switchMode(dark);
    })

 
}
settingListeners();
helpers.lightMode();

