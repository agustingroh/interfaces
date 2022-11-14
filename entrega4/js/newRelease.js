document.addEventListener("DOMContentLoaded", ()=>{
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

//  document.querySelector('#close-menu-btn').addEventListener('click',() => {
//             let menu = document.querySelector("#menu");
//             
            
//  });

let stickyContent = document.querySelector("#newRelease-sticky-content");
let imgContainer = document.querySelector("#newRelease-img-container");
let carousel = document.querySelector("#newRelease-carousel");
let carouselWidth = carousel.getBoundingClientRect().width;
let carouselPos =0;
let btnFordward =  document.querySelector("#newRelease-next-btn");
let btnBackward =document.querySelector("#newRelease-back-btn");
const GAP = 4; // GAP between game cards
let v = document.querySelector(".newRelease-characters-container").getBoundingClientRect().width;
let clickPosition = 0;
let cards = document.querySelectorAll(".newRelease-card");
let characterTitle=document.querySelector("#newRelease-sticky-title-characters");
let historyTitle=document.querySelector("#newRelease-sticky-title-history");
let featureTitle=document.querySelector("#newRelease-sticky-feature-history");
let historyContainer=document.querySelector("#newRelease-game-history");
let historyImages =  document.getElementsByClassName("item");

let newReleaseNewSale =  document.querySelector("#newRelease-new-sale");
let newReleaseBtnWish = document.querySelector("#newRelease-btn-wish");

    window.addEventListener("scroll", (event) => {
        let scroll = this.scrollY;
        console.log(scroll);
        let historyTop= historyContainer.offsetTop;
        // Move nav bar to history section
        if(scroll>=345) {
            newReleaseNewSale.classList.add("newRelease-sale-move");
            newReleaseBtnWish.classList.add("newRelease-btn-wish-animate");

        }
       if(scroll>=950 && scroll<=1100){
            historyTitle.classList.add("newRelease-sticky-underline");
            featureTitle.classList.remove("newRelease-sticky-underline");
            characterTitle.classList.remove("newRelease-sticky-underline");
           historyImages[0].classList.add("show-history-images");
        }else if(scroll>=1000 && scroll<=1200){
            characterTitle.classList.remove("newRelease-sticky-underline");
            featureTitle.classList.add("newRelease-sticky-underline");
            historyTitle.classList.remove("newRelease-sticky-underline");
        }else if(scroll > 1300 && scroll < 1800){
            featureTitle.classList.remove("newRelease-sticky-underline");
            characterTitle.classList.add("newRelease-sticky-underline");
            historyTitle.classList.remove("newRelease-sticky-underline");
        }else{
            historyTitle.classList.remove("newRelease-sticky-underline");
        }
       if(scroll<1100){
           cards.forEach((c)=>{
               c.classList.add("newRelease-card-remove-cards-carousel");
               c.classList.remove("newRelease-card-move-to-carousel");
           });
       }
       // Characters section
        if(scroll > 1100 && scroll < 1800){
            cards.forEach((c)=>{
                c.classList.add("newRelease-card-move-to-carousel");
                c.classList.remove("newRelease-card-remove-cards-carousel");
            });
        }
    });

   const animation =  [  {
        transform: 'translateY(0px)'
    },
    {
        transform: 'translateY(-80px)'
    },
    {
        transform: 'translateY(0)'
    }];



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

    // Animation
        for(let i=0 ; i<cards.length; i++){
            cards[i].animate(animation,{
                duration:900,
                easing: "ease-in-out",
                delay:  80 * i,

            })
        }
        if(carouselPos>0){
            btnBackward.classList.remove("btn-disabled");
        }
            if(carouselPos<=carouselWidth) {
                if((carouselPos + visorWidth + GAP) > (carouselWidth)){
                    carouselPos = carouselWidth -  visorWidth;
                    carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
                    carousel.style.transition="ease-out 900ms"
                    btnFordward.classList.add("btn-disabled");
                    return;
                }else {
                    carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
                    carousel.style.transition = " ease-out 900ms";
                }
            }
            else{
                btnFordward.classList.add("btn-disabled");
            }

    });

    btnBackward.addEventListener('click',()=>{
        clickPosition -=1;
        positionBullet(clickPosition);

        // https://stackdiary.com/css-animations/
        // Se puede implementar en javascript
        let delay = 0;
        for(let i= cards.length -1 ; i>= 0; i--){
            cards[i].animate(animation,{
                duration:600,
                easing: "ease-in-out",
                delay: delay,
            })
            delay= delay + 80;
        }

        let visorWidth = document.querySelector(".newRelease-characters-carousel-display").getBoundingClientRect().width;
        carouselPos = carouselPos - visorWidth - GAP;
        if(carouselPos>=0){
            carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
            carousel.style.transition="ease-out 900ms";
            if(carouselPos<=0) btnBackward.classList.add("btn-disabled");
        }
        else{
            carouselPos = 0;
            carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
            carousel.style.transition=" ease-out 900ms"
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


    let sticky = imgContainer.offsetTop;

	window.onscroll = function() {
		
		if (window.pageYOffset > sticky) {
			stickyContent.classList.remove("hide-sticky");
			stickyContent.classList.add("newRelease-sticky-content");
        //    stickyContent.style.transition = " all 800ms"
		  } else {
			stickyContent.classList.remove("newRelease-sticky-content");
            stickyContent.classList.add("hide-sticky");
		  }
	};

    /**
     * @brief shows the images in history section depending on the scroll position
     * */
    document.querySelector("#history-img-container").addEventListener('scroll',()=>{
        let pos = document.querySelector("#history-img-container").scrollTop;
        if(pos > 900 && pos<2000){
            historyImages[1].classList.add("show-history-images");
        }
        if(pos > 2000 && pos<3150){
            historyImages[2].classList.add("show-history-images");
        }

        if(pos > 3550 && pos<3967){
            historyImages[3].classList.add("show-history-images");
        }

    })
});






