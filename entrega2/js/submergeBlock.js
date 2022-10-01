document.addEventListener("DOMContentLoaded", function(){
    console.log("Content loaded");
 document.querySelector('#menu-btn').addEventListener('click',() => {
     console.log("click");
    let menu = document.querySelector("#menu");
     menu.classList.toggle('show-menu');
 });

 document.querySelector('#close-menu-btn').addEventListener('click',() => {
    let menu = document.querySelector("#menu");
        menu.classList.toggle('show-menu');
 });
});