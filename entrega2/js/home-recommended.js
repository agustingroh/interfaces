
document.addEventListener("DOMContentLoaded",function () {
    let carousel = document.querySelector("#home-carrousel-container");
    let carouselWidth = carousel.getBoundingClientRect().width;
    let carouselPos = 0;
    let btnFordward = document.querySelector("#home-carrousel-next-btn");
    let btnBackward = document.querySelector("#home-carrousel-back-btn");
    const GAP = 12; // GAP between game cards
    let v = document.querySelector(".home-carrousel-display").getBoundingClientRect().width;

    let clickPosition = 0;


    /**
     * @brief build bullets depending on the width of the carousel
     */
    function buildBullets() {

        let bulletCount = Math.round(Math.floor(carouselWidth / v));

        const carouselPositionContainer = document.querySelector("#carousel-recommended-pos");
        for (let i = 0; i < bulletCount; i++) {
            const div = document.createElement("div");
            div.classList.add("bullet-carousel-position");
            div.classList.add("bullet-inactive");
            carouselPositionContainer.append(div);
        }
    }

    buildBullets();
    positionBullet(clickPosition); //start first bullet with class active

    btnFordward.addEventListener('click', () => {
        clickPosition += 1;
        positionBullet(clickPosition);
        let visorWidth = document.querySelector(".home-carrousel-display").getBoundingClientRect().width;
        console.log(visorWidth);
        console.log("carousel pos", carouselPos);
        console.log("carousel width", carouselWidth);

        let carouselContainer = document.querySelector("#home-carrousel-container");

        carouselPos = ((Math.round(Math.floor(carouselPos + visorWidth) / visorWidth)) * visorWidth) + (GAP * ((Math.round(Math.floor(carouselPos + visorWidth) / visorWidth))));
        console.log("carousel pos", carouselPos);
        if (carouselPos > 0) {
            btnBackward.classList.remove("btn-disabled");
        }
        if (carouselPos <= carouselWidth) {
            if ((carouselPos + visorWidth + GAP) > (carouselWidth)) {
                carouselPos = carouselWidth - visorWidth;
                console.log(carouselPos);
                carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
                carousel.style.transition = " all 800ms"
                btnFordward.classList.add("btn-disabled");
                return;
            } else {
                carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
                carousel.style.transition = " all 800ms";
            }
        } else {
            btnFordward.classList.add("btn-disabled");
        }
    });

    btnBackward.addEventListener('click', () => {
        clickPosition -= 1;
        positionBullet(clickPosition);

        let visorWidth = document.querySelector("#home-carousel-recommended-display").getBoundingClientRect().width;
        carouselPos = carouselPos - visorWidth - GAP;
        if (carouselPos >= 0) {
            carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
            carousel.style.transition = " all 800ms"
            if (carouselPos <= 0) btnBackward.classList.add("btn-disabled");
        } else {
            carouselPos = 0;
            carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
            carousel.style.transition = " all 800ms"
            btnBackward.classList.add("btn-disabled");
            btnFordward.classList.remove("btn-disabled");
        }
    });


    function positionBullet(position) {
        // Get the carousel bullets
        const bullets = document.querySelectorAll(".bullet-carousel-position");
        bullets.forEach((b) => {
            // Be sure we remove the active class
            b.classList.remove('bullet-active');
            b.classList.add("bullet-inactive");
        });
        bullets.item(position).classList.add('bullet-active');
    }
});
