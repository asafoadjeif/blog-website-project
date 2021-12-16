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