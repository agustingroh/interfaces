document.addEventListener("DOMContentLoaded", ()=>{


        document.querySelector('#menu-btn').addEventListener('click',() => {
            console.log("click");
            let menu = document.querySelector("#menu");
            menu.classList.toggle('show-menu');
        });

        document.querySelector('#close-menu-btn').addEventListener('click',() => {
            let menu = document.querySelector("#menu");
            menu.classList.toggle('show-menu');
        });













let carousel = document.querySelector("#newRelease-carousel");
let carouselWidth = carousel.getBoundingClientRect().width;
let carouselPos =0;
let btnFordward =  document.querySelector("#newRelease-next-btn");
let btnBackward =document.querySelector("#newRelease-back-btn");
const GAP = 4; // GAP between game cards




    btnFordward.addEventListener('click',()=>{
        let visorWidth = document.querySelector(".newRelease-characters-carousel-display").getBoundingClientRect().width;
        carouselPos = ((Math.round(Math.floor( carouselPos + visorWidth)/visorWidth)) * visorWidth) + (GAP * ((Math.round(Math.floor( carouselPos + visorWidth )/visorWidth))));
        if(carouselPos>0){
            btnBackward.classList.remove("btn-disabled");
        }
            if(carouselPos<=carouselWidth) {
                if((carouselPos + visorWidth + GAP) > (carouselWidth)){
                    carouselPos = carouselWidth -  visorWidth;
                    console.log(carouselPos);
                    carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
                    carousel.style.transition=" all 800ms"
                    btnFordward.classList.add("btn-disabled");
                    return;
                }else {
                    carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
                    carousel.style.transition = " all 800ms";
                }
            }
            else{
                console.log("ACA");
                btnFordward.classList.add("btn-disabled");
            }
    });

    btnBackward.addEventListener('click',()=>{
        let visorWidth = document.querySelector(".newRelease-characters-carousel-display").getBoundingClientRect().width;
        carouselPos = carouselPos - visorWidth - GAP;
        if(carouselPos>=0){
            carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
            carousel.style.transition=" all 800ms"
            if(carouselPos<=0) btnBackward.classList.add("btn-disabled");
        }
        else{
            carouselPos = 0;
            carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
            carousel.style.transition=" all 800ms"
            btnBackward.classList.add("btn-disabled");
            btnFordward.classList.remove("btn-disabled");
        }
    });



});
