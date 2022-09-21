document.addEventListener("DOMContentLoaded", function(){
 console.log("submerge block js");
 document.querySelector('#menu-btn').addEventListener('click',()=>{
     let menu = document.querySelector("#menu");
     menu.classList.toggle('show');
 });
});