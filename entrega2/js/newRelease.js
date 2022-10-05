document.addEventListener("DOMContentLoaded", ()=>{
let carousel = document.querySelector("#newRelease-carousel");
let carouselWidht = carousel.getBoundingClientRect().width;
let carouselPos =0;
let btnFordward =  document.querySelector("#newRelease-next-btn");
let btnBackward =document.querySelector("#newRelease-back-btn");

    btnFordward.addEventListener('click',()=>{
        let visorWidht = document.querySelector(".newRelease-characters-carousel-display").getBoundingClientRect().width;
        carouselPos = carouselPos + visorWidht + 6;

        if(carouselPos>0){
            btnBackward.classList.remove("btn-disabled");
        }

            if(carouselPos<=carouselWidht) {
                carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
                carousel.style.transition=" all 800ms"
                if((carouselPos + visorWidht + 6) > (carouselWidht)) btnFordward.classList.add("btn-disabled");
            }
            else{
                btnFordward.classList.add("btn-disabled");
            }
    });

    btnBackward.addEventListener('click',()=>{
        let visorWidht = document.querySelector(".newRelease-characters-carousel-display").getBoundingClientRect().width;
        carouselPos = carouselPos - visorWidht -6;
        if(carouselPos<=carouselWidht){
            btnFordward.classList.remove("btn-disabled");
        }

        if(carouselPos>=0){
            carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
            carousel.style.transition=" all 800ms"
            if(carouselPos<=0) btnBackward.classList.add("btn-disabled");
        }
        else{
            carouselPos = 0;
            btnFordward.classList.add("btn-disabled");
        }
    });



});
