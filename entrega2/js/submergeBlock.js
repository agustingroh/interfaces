document.addEventListener("DOMContentLoaded", function(){


    const modal = document.querySelector("#modal");
    const main =  document.querySelector("#submergeBlock-main");
    const socialMediaBtn = document.querySelector("#social-media-btn");
    const closeButton = document.querySelector("#close-modal-btn");
    socialMediaBtn.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);

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


    function toggleModal() {
        modal.classList.toggle("show-modal");
        main.classList.toggle('blur');
    }

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }



});
