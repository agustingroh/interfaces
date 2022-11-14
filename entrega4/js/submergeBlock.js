document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#submergeBlock-play-btn").addEventListener("click",()=>{
        document.querySelector("#submergeBlock-game").classList.add("hide");
        document.querySelector("#four-in-line-config").classList.remove("hide");
    });

    const modal = document.querySelector("#modal");
    const main =  document.querySelector("#submergeBlock-main");
    const socialMediaBtn = document.querySelector("#social-media-btn");
    const closeButton = document.querySelector("#close-modal-btn");
    socialMediaBtn.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);


// document.querySelector("#submergeBlock-carousel").classList.add("submergeBlock-carousel-slide");

let menuLines=document.querySelectorAll(".hamburger-menu-line");
let menuHamburger=document.querySelector('#hamburger-menu');
 /**
  * @brief menu actions
  * **/
 
 menuHamburger.addEventListener('click',() => {
            let menu = document.querySelector("#menu");
            if(!menu.classList.contains('show-menu')){
                menu.classList.toggle('show-menu');
                menuLines[2].classList.remove("rotate-clockwise-close");
                menuLines[0].classList.remove("rotate-Anticlockwise-close");
                menuLines[1].classList.add("menu-center-line-open");
                menuLines[2].classList.add("rotate-clockwise");
                menuLines[0].classList.add("rotate-Anticlockwise");
            }else{
                menu.classList.toggle('show-menu');
                menuLines[2].classList.remove("rotate-clockwise");
                menuLines[0].classList.remove("rotate-Anticlockwise");
                menuLines[2].classList.add("rotate-clockwise-close");
                menuLines[0].classList.add("rotate-Anticlockwise-close");
                menuLines[1].classList.add("menu-center-line");
                menuLines[1].classList.remove("menu-center-line-open");
            }
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
