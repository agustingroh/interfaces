
    let carouselRecommended = document.querySelector("#home-carrousel-container");
    let carouselWidthRecommended = carouselRecommended.getBoundingClientRect().width;
    let carouselPosRecommended = 0;
    let btnForwardRecommended = document.querySelector("#home-carrousel-next-btn");
    let btnBackwardRecommended = document.querySelector("#home-carrousel-back-btn");
    const GAP_CAROUSEL_RECOMMENDED = 12; // GAP between game cards
    let visorRecommended = document.querySelector("#home-carousel-recommended-display").getBoundingClientRect().width;
    let clickPositionRecommended = 1;
    let cardsRecommended = document.getElementsByClassName("home-carrousel-card-recommended");

    const animation =  [  {
        opacity: "1",
        scale: '1.0'

    },{
        opacity: '0.5',
        scale:'1.3'
    },{
        opacity: '1',
        scale: '1.0'
    }];

    /**
     * @brief build bullets depending on the width of the carousel
     */
    function buildBulletsRecommended() {
        let bulletCount = getBulletsByResolution();
        const carouselPositionContainer = document.querySelector("#carousel-recommended-pos");
        for (let i = 0; i < bulletCount; i++) {
            const div = document.createElement("div");
            div.classList.add("bullet-carousel-position");
            div.classList.add("bullet-inactive");
            carouselPositionContainer.append(div);
        }
    }

    function getBulletsByResolution(){
        const windowWidth = document.getElementsByTagName('body')[0].getBoundingClientRect().width;
        let bulletCount = 0 ;
        if(windowWidth <=768){
            bulletCount = Math.round(Math.floor(carouselWidthRecommended / visorRecommended));
        }else{
            bulletCount = Math.round(Math.ceil(carouselWidthRecommended / visorRecommended));
        }
        return bulletCount;
    }

    buildBulletsRecommended();
    positionBulletRecommended(clickPositionRecommended); //start first bullet with class active

    btnForwardRecommended.addEventListener('click', () => {
        clickPositionRecommended += 1;
        positionBulletRecommended(clickPositionRecommended);
        let visorWidth = document.querySelector("#home-carousel-recommended-display").getBoundingClientRect().width;
        carouselPosRecommended =  carouselPosRecommended + visorWidth + GAP_CAROUSEL_RECOMMENDED;
        if (carouselPosRecommended > 0) {
            btnBackwardRecommended.classList.remove("btn-disabled");
        }

        if (carouselPosRecommended <= carouselWidthRecommended) {
            // Animation
            for(let i=0 ; i<cardsRecommended.length; i++){
                cardsRecommended[i].animate(animation,{
                    duration:100,
                    easing: "ease-in-out",
                    delay:  45 * i,
                })
            }

            if ((carouselPosRecommended + visorWidth + GAP_CAROUSEL_RECOMMENDED) >= (carouselWidthRecommended)) {
                carouselPosRecommended = carouselWidthRecommended - visorWidth;
                carouselRecommended.setAttribute("style", `transform:translate(-${carouselPosRecommended}px)`);
                carouselRecommended.style.transition = " all 800ms"
                btnForwardRecommended.classList.add("btn-disabled");
                return;
            } else {
                carouselRecommended.setAttribute("style", `transform:translate(-${carouselPosRecommended}px)`);
                carouselRecommended.style.transition = " all 800ms";
            }
        } else {
            btnForwardRecommended.classList.add("btn-disabled");
        }

    });

    btnBackwardRecommended.addEventListener('click', () => {
        clickPositionRecommended -= 1;
        positionBulletRecommended(clickPositionRecommended);
        let visorWidth = document.querySelector("#home-carousel-recommended-display").getBoundingClientRect().width;
        carouselPosRecommended = carouselPosRecommended - visorWidth - GAP_CAROUSEL_RECOMMENDED;

        if(carouselPosRecommended < carouselWidthRecommended){
            btnForwardRecommended.classList.remove("btn-disabled");
        }

        if (carouselPosRecommended >= 0) {
            animationBack();
            carouselRecommended.setAttribute("style", `transform:translate(-${carouselPosRecommended}px)`);
            carouselRecommended.style.transition = " all 800ms";
          if (carouselPosRecommended <= 0) btnBackwardRecommended.classList.add("btn-disabled");

        } else {
            animationBack();
            carouselPosRecommended = 0;
            carouselRecommended.setAttribute("style", `transform:translate(-${carouselPosRecommended}px)`);
            carouselRecommended.style.transition = " all 800ms"
            btnBackwardRecommended.classList.add("btn-disabled");
            btnForwardRecommended.classList.remove("btn-disabled");
        }
    });

    function animationBack(){
        let delay = 0;
        for(let i= cardsRecommended.length -1 ; i>= 0; i--){
            cardsRecommended[i].animate(animation,{
                duration:100,
                easing: "ease-in-out",
                delay: delay,
            })
            delay= delay + 60;
        }
    }

    function positionBulletRecommended(position) {
        // Get the carousel bullets
        const recommendedBullet = document.querySelector("#carousel-recommended-pos");
        // Get the carousel bullets
        Array.from(recommendedBullet.childNodes).forEach((b) => {
            // Be sure we remove the active class
            b.classList?.add('bullet-inactive');
            b.classList?.remove('bullet-active');

        });

        Array.from(recommendedBullet.childNodes)[position].classList.add("bullet-active");
    }

