document.addEventListener("DOMContentLoaded", ()=>{

 /**
  * @brief menu actions
  * **/
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
let v = document.querySelector(".newRelease-characters-container").getBoundingClientRect().width;
let clickPosition = 0;


 /**
  * @brief build bullets depending on the width of the carousel
   */
 function buildBullets() {
     let bulletCount = Math.round(Math.ceil(carouselWidth / (v > 0 ? v : 260)));
     const carouselPositionContainer = document.querySelector("#carousel-pos");
     for (let i = 0; i < bulletCount; i++) {
         const div = document.createElement("div");
         div.classList.add("bullet-carousel-position");
         div.classList.add("bullet-inactive");
         carouselPositionContainer.append(div);
     }
 }
 buildBullets();
 positionBullet(clickPosition); //start first bullet with class active

    btnFordward.addEventListener('click',()=>{
        clickPosition +=1;
        positionBullet(clickPosition);
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
                btnFordward.classList.add("btn-disabled");
            }
    });

    btnBackward.addEventListener('click',()=>{
        clickPosition -=1;
        positionBullet(clickPosition);

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


function positionBullet(position){
    // Get the carousel bullets
    const bullets = document.querySelectorAll(".bullet-carousel-position");
  bullets.forEach((b)=>{
      // Be sure we remove the active class
      b.classList.remove('bullet-active');
      b.classList.add("bullet-inactive");
  });
  bullets.item(position).classList.add('bullet-active');
}
});
