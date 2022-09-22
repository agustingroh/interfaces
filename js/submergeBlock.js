document.addEventListener("DOMContentLoaded", function(){
 document.querySelector('#menu-btn').addEventListener('click',() => {
     let menu = document.querySelector("#menu");
     menu.classList.toggle('show-menu');
 });

 document.querySelector('#close-menu-btn').addEventListener('click',() => {
    let menu = document.querySelector("#menu");
        menu.classList.toggle('show-menu');
 });
});