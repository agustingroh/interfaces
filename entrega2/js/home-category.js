
	let carouselCategory = document.querySelector("#home-carrousel-category-container");
	let carouselWidthCategory = carouselCategory.getBoundingClientRect().width;
	let carouselPosCategory = 0;
	let btnForwardCategory = document.querySelector("#home-carrousel-category-next-btn");
	let btnBackwardCategory = document.querySelector("#home-carrousel-category-back-btn");
	const GAP_CAROUSEL_CATEGORY = 12; // GAP between game cards
	let visorHomeCategory = document.querySelector("#home-carousel-category-display").getBoundingClientRect().width;
	let clickPositionCategory = 0;


	/**
	 * @brief build bullets depending on the width of the carousel
	 */
	function buildBullets() {
		let bulletCount = Math.round(Math.ceil(carouselWidthCategory / (visorHomeCategory)));
		const carouselPositionContainer = document.querySelector("#carousel-category-pos");
		for (let i = 0; i < bulletCount; i++) {
			const div = document.createElement("div");
			div.classList.add("bullet-carousel-position-category");
			div.classList.add("bullet-inactive");
			carouselPositionContainer.append(div);
		}
	}

	buildBullets();
	positionBullet(clickPositionCategory); //start first bullet with class active

	btnForwardCategory.addEventListener('click', () => {
		clickPositionCategory += 1;
		positionBullet(clickPositionCategory);
		let visorWidth = document.querySelector("#home-carousel-category-display").getBoundingClientRect().width;

		carouselPosCategory = carouselPosCategory + visorWidth + GAP_CAROUSEL_CATEGORY; //((Math.round(Math.floor(carouselPosCategory + visorWidth) / visorWidth)) * visorWidth) + (GAP_CAROUSEL_CATEGORY * ((Math.round(Math.floor(carouselPosCategory + visorWidth) / visorWidth))));
		if (carouselPosCategory > 0) {
			btnBackwardCategory.classList.remove("btn-disabled");
		}
		if (carouselPosCategory <= carouselWidthCategory) {
			if ((carouselPosCategory + visorWidth + GAP_CAROUSEL_CATEGORY) > (carouselWidthCategory)) {
				carouselPosCategory = carouselWidthCategory - visorWidth;
				console.log(carouselPosCategory);
				carouselCategory.setAttribute("style", `transform:translate(-${carouselPosCategory}px)`);
				carouselCategory.style.transition = " all 800ms"
				btnForwardCategory.classList.add("btn-disabled");
				return;
			} else {
				carouselCategory.setAttribute("style", `transform:translate(-${carouselPosCategory}px)`);
				carouselCategory.style.transition = " all 800ms";
			}
		} else {
			btnForwardCategory.classList.add("btn-disabled");
		}
	});

	btnBackwardCategory.addEventListener('click', () => {
		clickPositionCategory -= 1;
		positionBullet(clickPositionCategory);

		if(carouselPosCategory < carouselWidthCategory){
			btnForwardCategory.classList.remove("btn-disabled");
		}

		let visorWidth = document.querySelector("#home-carousel-category-display").getBoundingClientRect().width;
		carouselPosCategory = carouselPosCategory - visorWidth - GAP_CAROUSEL_CATEGORY;
		if (carouselPosCategory >= 0) {
			carouselCategory.setAttribute("style", `transform:translate(-${carouselPosCategory}px)`);
			carouselCategory.style.transition = " all 800ms"
			if (carouselPosCategory <= 0) btnBackwardCategory.classList.add("btn-disabled");
		} else {
			carouselPosCategory = 0;
			carouselCategory.setAttribute("style", `transform:translate(-${carouselPosCategory}px)`);
			carouselCategory.style.transition = " all 800ms"
			btnBackwardCategory.classList.add("btn-disabled");
			btnForwardCategory.classList.remove("btn-disabled");
		}
	});

	function positionBullet(position) {
		const carouselPositionContainer = document.querySelector("#carousel-category-pos");
		// Get the carousel bullets		
		Array.from(carouselPositionContainer.childNodes).forEach((b) => {
			// Be sure we remove the active class
			b.classList?.add('bullet-inactive');
			b.classList?.remove('bullet-active');

		});
		Array.from(carouselPositionContainer.childNodes)[position + 1].classList?.add("bullet-active");
	}


