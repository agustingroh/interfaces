document.addEventListener("DOMContentLoaded", function(){


document.querySelector("#submergeBlock-carousel").classList.add("submergeBlock-carousel-slide");

 document.querySelector('#menu-btn').addEventListener('click',() => {
     console.log("click");
    let menu = document.querySelector("#menu");
     menu.classList.toggle('show-menu');
 });

 document.querySelector('#close-menu-btn').addEventListener('click',() => {
    let menu = document.querySelector("#menu");
        menu.classList.toggle('show-menu');
 });

document.querySelector("#submergeBlock-carousel").addEventListener("hover",()=>{

});
});
