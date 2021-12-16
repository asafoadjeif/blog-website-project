(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let darkModeSwitch;
let switchLabel;
let display;
let cards;
let cardBody;
let cardText;


function darkMode() {
    display=document.querySelector('div.col-9');
    darkModeSwitch=document.getElementById('darkModeSwitch');
    switchLabel=document.getElementById('switchLabel');
    display.style.backgroundColor = '#181818';
    darkModeSwitch.checked = true;
    switchLabel.textContent = 'Darkmode: On';
    cards=document.querySelectorAll('div.card');
    cards.forEach((card) => {
        card.classList.add('bg-dark');
        card.classList.add('border-light'); 
        card.classList.add('text-white');       
    })
}

function lightMode() {
     display=document.querySelector('div.col-9');
    darkModeSwitch=document.getElementById('darkModeSwitch');
    switchLabel=document.getElementById('switchLabel');
    display.style.backgroundColor = 'white';
    darkModeSwitch.checked = false;
    switchLabel.textContent = 'Darkmode: Off';
    cards=document.querySelectorAll('div.card');
    cards.forEach((card) => {
        card.classList.remove('bg-dark');
        card.classList.remove('border-light'); 
        card.classList.remove('text-white');       
    })
}

module.exports = {lightMode, darkMode}
},{}],2:[function(require,module,exports){
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


},{"./helpers":1,"./mode":3}],3:[function(require,module,exports){
const { lightMode, darkMode } = require("./helpers");

function switchMode(dark) {
    dark ? lightMode() : darkMode()
    return !dark
}

module.exports = {switchMode }
},{"./helpers":1}]},{},[2]);
