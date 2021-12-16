const { lightMode, darkMode } = require("./helpers");

function switchMode(dark) {
    dark ? lightMode() : darkMode()
    return !dark
}

module.exports = {switchMode }