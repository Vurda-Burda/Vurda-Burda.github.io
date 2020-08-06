'use strict';

let menuButton = document.querySelector('.mobile_menu');
let menuBlock = document.querySelector('.website_page_list');
menuButton.addEventListener('click',function() {
    if(menuButton.innerHTML === "Menu ▲") {
        menuBlock.style.display = 'block';
        menuButton.innerHTML = 'Menu ▼';
    } else if (menuButton.innerHTML === "Menu ▼") {
        menuBlock.style.display = 'none';
        menuButton.innerHTML = 'Menu ▲';
    }
})