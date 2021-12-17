
// const post = require('../Client/javascript/Post');
const helpers = require('../Client/javascript/helpers');
const mode = require('../Client/javascript/mode');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../Client/Index.html'), 'utf8');



describe('Head Testing', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    test('title has been changed', () => {
        let titleHeader = document.querySelector('title');
        expect(titleHeader.textContent).not.toEqual('Document');
    })

})

// *************************
// Testing fetch commands (not complete, returns null at addEventListener: Post.js  line 18)
// *************************

// describe('Fetch Testing', () => {
//     let gifBtn, postBtn, postList
//     beforeAll(() => { 
//     document.documentElement.innerHTML = html.toString();
//     postList = document.getElementById('postList');
//     postBtn = document.getElementById('postBtn');
//     gifBtn = document.getElementById('gifBtn');
//     })

//     test('it makes a fetch call to the given giphy api url', () => { 
//         post.loadContent();
//         expect(fetch).toHaveBeenCalled()
// })
// })

describe('DarkMode Testing', () => {
let bckgrnd;
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        bckgrnd = document.querySelector('div.col-9');
    })

    test('it changes the color of the background', () => {
        helpers.darkMode();
        expect(bckgrnd.style.backgroundColor).toEqual('rgb(24, 24, 24)')
    })

    test('switchMode returns a boolean value', () => {
            dark = true;
            expect(mode.switchMode(dark)).toEqual(false);
            dark = false;
            expect(mode.switchMode(dark)).toEqual(true);   
        })



})




