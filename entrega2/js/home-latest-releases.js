
	let carouselLatestReleases = document.querySelector("#home-latest-releases-container");
	let carouselWidthLatestReleases = carouselLatestReleases.getBoundingClientRect().width;
	let carouselPosLatestReleases = 0;
	let btnForwardLatestReleases = document.querySelector("#home-latest-releases-back-btn");
	let btnBackwardLatestReleases = document.querySelector("#home-latest-releases-next-btn");
	const GAP_CAROUSEL_LATEST_RELEASE = 12; // GAP between game cards
	let visorLatestReleases = document.querySelector("#home-latest-releases-display").getBoundingClientRect().width;
	let clickPositionLatestRelease = 0;


	btnForwardLatestReleases.addEventListener('click', () => {
		clickPositionLatestRelease += 1;
		let visorWidth = document.querySelector(".home-latest-releases-display").getBoundingClientRect().width;
		carouselPosLatestReleases = ((Math.round(Math.floor(carouselPosLatestReleases + visorWidth) / visorWidth)) * visorWidth) + (GAP_CAROUSEL_LATEST_RELEASE * ((Math.round(Math.floor(carouselPosLatestReleases + visorWidth) / visorWidth))));
		if (carouselPosLatestReleases > 0) {
			btnBackwardLatestReleases.classList.remove("btn-disabled-latest-realeses");
		}
		if (carouselPosLatestReleases <= carouselWidthLatestReleases) {
			if ((carouselPosLatestReleases + visorWidth + GAP_CAROUSEL_LATEST_RELEASE) > (carouselWidthLatestReleases)) {
				carouselPosLatestReleases = carouselWidthLatestReleases - visorWidth;
				console.log(carouselPosLatestReleases);
				carouselLatestReleases.setAttribute("style", `transform:translate(-${carouselPosLatestReleases}px)`);
				carouselLatestReleases.style.transition = " all 800ms"
				btnForwardLatestReleases.classList.add("btn-disabled-latest-realeses");
				return;
			} else {
				carouselLatestReleases.setAttribute("style", `transform:translate(-${carouselPosLatestReleases}px)`);
				carouselLatestReleases.style.transition = " all 800ms";
				btnBackwardLatestReleases.classList.remove("btn-disabled-latest-realeses");
			}
		} else {
			console.log("aca");
			btnForwardLatestReleases.classList.add("btn-disabled-latest-realeses");

		}
	});

	btnBackwardLatestReleases.addEventListener('click', () => {
		clickPositionLatestRelease -= 1;


		let visorWidth = document.querySelector("#home-latest-releases-display").getBoundingClientRect().width;
		carouselPosLatestReleases = carouselPosLatestReleases - visorWidth - GAP_CAROUSEL_LATEST_RELEASE;
		if (carouselPosLatestReleases >= 0) {
			carouselLatestReleases.setAttribute("style", `transform:translate(-${carouselPosLatestReleases}px)`);
			carouselLatestReleases.style.transition = " all 800ms";
			if (carouselPosLatestReleases <= 0) btnBackwardLatestReleases.classList.add("btn-disabled-latest-realeses");
		} else {
			carouselPosLatestReleases = 0;
			carouselLatestReleases.setAttribute("style", `transform:translate(-${carouselPosLatestReleases}px)`);
			carouselLatestReleases.style.transition = " all 800ms";
			btnBackwardLatestReleases.classList.add("btn-disabled-latest-realeses");
			btnForwardLatestReleases.classList.remove("btn-disabled-latest-realeses");
		}
	});




