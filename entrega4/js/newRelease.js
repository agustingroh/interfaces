document.addEventListener("DOMContentLoaded", ()=>{
let menuLines=document.querySelectorAll(".hamburger-menu-line");
let menuHamburger=document.querySelector('#hamburger-menu');
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
let characterTitleHeader=document.querySelector("#newRelease-sticky-title-characters");
let historyTitle=document.querySelector("#newRelease-sticky-title-history");
let featureTitle=document.querySelector("#newRelease-sticky-feature-history");
let historyContainer=document.querySelector("#newRelease-game-history");
let historyImages =  document.getElementsByClassName("item");
let featuresCards =  document.querySelectorAll(".newRelease-feature");
let newReleaseNewSale =  document.querySelector("#newRelease-new-sale");
let newReleaseBtnWish = document.querySelector("#newRelease-btn-wish");
let characterTitle = document.querySelector("#newRelease-character-title");
let cardsPositionMapper = {
    0: -1250,
    1: -800,
    2: -700,
    3:1800,
    4:1950
}
const animation =  [{transform: 'translateY(0px)'},{transform: 'translateY(-80px)'},{transform: 'translateY(0)'}];
let menuSections = document.querySelectorAll(".menu-section");
let heroFront = document.querySelector("#newRelease-hogwarts-back");
let heroRight = document.querySelector("#newRelease-hogwarts-right");

window.addEventListener("mousemove",(e)=>{
    if(e.screenY<600 &&  e.screenY>130){
      if(e.screenX>=500){
          heroFront.classList.add("move-hero-front-left");
          heroRight.classList.add("move-hero-right-to-right");
          heroRight.classList.remove("move-hero-right-to-left");

      }else{
          heroFront.classList.add("move-hero-front-right");
          heroFront.classList.remove("move-hero-front-left");
          heroRight.classList.add("move-hero-right-to-left");
          heroRight.classList.remove("move-hero-right-to-right");

      }
    }else{
        heroRight.classList.remove("move-hero-right-to-left");
        heroRight.classList.remove("move-hero-right-to-right");
        heroFront.classList.remove("move-hero-front-right");
        heroFront.classList.remove("move-hero-front-left");
    }
});

    /**
     * @brief handle menu actions
     */
    menuHamburger.addEventListener('click',() => {
        let menu = document.querySelector("#menu");
        if(!menu.classList.contains('show-menu')){
            menu.classList.remove("close-menu");
            menu.classList.add('show-menu');
            menuLines[2].classList.remove("rotate-clockwise-close");
            menuLines[0].classList.remove("rotate-Anticlockwise-close");
            menuLines[1].classList.add("menu-center-line-open");
            menuLines[2].classList.add("rotate-clockwise");
            menuLines[0].classList.add("rotate-Anticlockwise");
           showMenuSections();
        }else{
            menu.classList.add("close-menu");
            menu.classList.remove("show-menu");
            menuLines[2].classList.remove("rotate-clockwise");
            menuLines[0].classList.remove("rotate-Anticlockwise");
            menuLines[2].classList.add("rotate-clockwise-close");
            menuLines[0].classList.add("rotate-Anticlockwise-close");
            menuLines[1].classList.add("menu-center-line");
            menuLines[1].classList.remove("menu-center-line-open");
            hideMenuSections();
        }
    });

    function showMenuSections(){
        menuSections.forEach((ms,i)=>{
            setTimeout(() => {
                ms.classList.add("menu-section-open");
            }, i * 90);

        });
    }

    function hideMenuSections(){
        menuSections.forEach((ms)=>{
            ms.classList.remove("menu-section-open");
        });
    }

    /**
     * @brief handle scroll events
     */
    window.addEventListener("scroll", (event) => {
        let scroll = this.scrollY;
        let historyTop= historyContainer.offsetTop;
        // Move nav bar to history section
        console.log(scroll);
        if(scroll>=345) {
            newReleaseNewSale.classList.add("newRelease-sale-move");
            newReleaseBtnWish.classList.add("newRelease-btn-wish-animate");

        }
       if(scroll>=950 && scroll<=1800){
            historyTitle.classList.add("newRelease-sticky-underline");
            featureTitle.classList.remove("newRelease-sticky-underline");
            characterTitleHeader.classList.remove("newRelease-sticky-underline");
           historyImages[0].classList.add("show-history-images");
        }else if(scroll>1800 && scroll<=2000){
            characterTitleHeader.classList.remove("newRelease-sticky-underline");
            featureTitle.classList.add("newRelease-sticky-underline");
            historyTitle.classList.remove("newRelease-sticky-underline");
        }else if(scroll > 2000 && scroll < 2450){
            featureTitle.classList.remove("newRelease-sticky-underline");
            characterTitleHeader.classList.add("newRelease-sticky-underline");
            historyTitle.classList.remove("newRelease-sticky-underline");
        }else{
            historyTitle.classList.remove("newRelease-sticky-underline");
        }
       if(scroll<=1200){
           cards.forEach((c)=>{
               c.classList.add("newRelease-card-remove-cards-carousel");
               c.classList.remove("newRelease-card-move-to-carousel");
           });
       }
    moveFeaturesCards(scroll);
    moveCharacterTitle(scroll);
    showCardsInCarousel(scroll);

    });


    /**
     * @Brief Shows cards into the carousel
     * */
    function showCardsInCarousel(scroll){
        if(scroll > 1100 && scroll < 1800){
            cards.forEach((c)=>{
                c.classList.add("newRelease-card-move-to-carousel");
                c.classList.remove("newRelease-card-remove-cards-carousel");
            });
        }
    }

    /**
     * @Brief Animates character title
     * */
    function moveCharacterTitle(scroll){
        if(scroll>1650) {
            if(scroll > 1375 && scroll < 1399) {
                characterTitle.setAttribute("style", `transform:translateY(-900px)`);
                characterTitle.style.opacity = '0';
                characterTitle.style.transition = "ease-out 1200ms";
            }
            if(scroll > 1400 && scroll < 1415) {
                characterTitle.setAttribute("style", `transform:translateY(-750px)`);
                characterTitle.style.opacity = '0';
                characterTitle.style.transition = "ease-out 1200ms";
            }
            if(scroll > 1500 && scroll < 1520) {
                characterTitle.setAttribute("style", `transform:translateY(-500px)`);
                characterTitle.style.opacity = '0';
                characterTitle.style.transition = "ease-out 1200ms";
            }
            if(scroll > 1520 && scroll < 1580) {
                characterTitle.setAttribute("style", `transform:translateY(-350px)`);
                characterTitle.style.opacity = '0';
                characterTitle.style.transition = "ease-out 1200ms";
            }

            if(scroll > 1600 && scroll < 1630) {
                characterTitle.setAttribute("style", `transform:translateY(-300px) `);
                characterTitle.style.opacity = '0.1';
                characterTitle.style.transition = "ease-out 1200ms";
            }

            if(scroll > 1630 && scroll < 1690) {
                characterTitle.setAttribute("style", `transform:translateY(-200px) scale(0.1) `);
                characterTitle.style.opacity = '0';
                characterTitle.style.transition = "ease-out 1200ms";
            }
            if(scroll > 1700 && scroll < 1750) {
                characterTitle.setAttribute("style", `transform:translateY(-100px) scale(0.5)`);
                characterTitle.style.opacity = '0.1';
                characterTitle.style.transition = "ease-out 1200ms";
            }

            if(scroll > 1750 && scroll < 1835) {
                characterTitle.setAttribute("style", `transform:translateY(-50px) scale(0.8)`);
                characterTitle.style.opacity = '0.4';
                characterTitle.style.transition = "ease-out 1200ms";
            }

            if(scroll > 1835) {
                characterTitle.setAttribute("style", `transform:translateY(0px)`);
                characterTitle.style.opacity = '1.0';
                characterTitle.style.transition = "ease-out 1200ms";
            }

        }
    }

    /**
     * @Brief Applies wave effect in the character cards
     * */
    function moveFeaturesCards(scroll){
        if(scroll>=1050){
            featuresCards.forEach((c)=>{
                if(scroll>=1050 && scroll <=1150){
                    c.setAttribute("style", `transform:translate(-90px)  rotate(55deg)`);
                    c.style.transition="ease-out 1200ms";
                }
                if(scroll > 1225 && scroll<= 1300){
                    c.setAttribute("style", `transform:translate(-35px) rotate(35deg)`);
                    c.style.transition="ease-out 1200ms";
                }
                if(scroll > 1300 && scroll< 1310){
                    c.setAttribute("style", `transform:translate(-15px) rotate(15deg)`);
                    c.style.transition="ease-out 1200ms";
                }
                if(scroll > 1310){
                    c.setAttribute("style", `transform:translate(0px) rotate(0deg)`);
                    c.style.transition="ease-out 1200ms"
                }           });
        }else{
            featuresCards.forEach((c,i)=> {
                c.setAttribute("style", `transform:translate(${cardsPositionMapper[i]}px) rotate(360deg)`);
                c.style.transition = "ease-out 1200ms";
            });
        }
    }

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

    /**
     * @brief Moves the carousel forward
     */
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

    /**
     * @brief Moves the carousel backward
     */
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


});






