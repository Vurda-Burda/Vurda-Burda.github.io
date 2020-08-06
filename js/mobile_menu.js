'use strict';

let menuButton = document.querySelector('.mobile_menu');
let menuBlock = document.querySelector('.website_page_list');
let headerBlock = document.querySelector('.page_header');
menuButton.addEventListener('click',function() {
    if(menuButton.innerHTML === "Menu ▲") {
        menuBlock.style.display = 'block';
        menuButton.innerHTML = 'Menu ▼';
        headerBlock.style.height = '530px';
    } else if (menuButton.innerHTML === "Menu ▼") {
        menuBlock.style.display = 'none';
        menuButton.innerHTML = 'Menu ▲';
        headerBlock.style.height = 'auto';
    }
})