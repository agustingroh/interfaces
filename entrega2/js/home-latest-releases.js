document.addEventListener("DOMContentLoaded",function (){ 
	let carousel = document.querySelector("#home-latest-releases-container");
	let carouselWidth = carousel.getBoundingClientRect().width;
	let carouselPos =0;
	let btnFordward =  document.querySelector("#home-latest-releases-back-btn");
	let btnBackward =document.querySelector("#home-latest-releases-next-btn");
	const GAP = 12; // GAP between game cards
	let v = document.querySelector("#home-latest-releases-display").getBoundingClientRect().width;
	let clickPosition = 0;


	btnFordward.addEventListener('click',()=>{
		clickPosition +=1;	 
		let visorWidth = document.querySelector(".home-latest-releases-display").getBoundingClientRect().width;
		console.log(visorWidth);
		 console.log("carousel pos",carouselPos);
		 console.log("carousel width",carouselWidth);

		let carouselContainer = document.querySelector("#home-latest-releases-container");
	   
		carouselPos = ((Math.round(Math.floor( carouselPos + visorWidth)/visorWidth)) * visorWidth) + (GAP * ((Math.round(Math.floor( carouselPos + visorWidth )/visorWidth))));
		console.log("carousel pos",carouselPos);
		if(carouselPos>0){
			btnBackward.classList.remove("btn-disabled-latest-realeses");
		}
			if(carouselPos<=carouselWidth) {
				if((carouselPos + visorWidth + GAP) > (carouselWidth)){
					carouselPos = carouselWidth -  visorWidth;
					console.log(carouselPos);
					carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
					carousel.style.transition=" all 800ms"
					btnFordward.classList.add("btn-disabled-latest-realeses");
					return;
				}else {
					carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
					carousel.style.transition = " all 800ms";
				}
			}
			else{
				btnFordward.classList.add("btn-disabled-latest-realeses");
			}
	});

	btnBackward.addEventListener('click',()=>{
		clickPosition -=1;
		

		let visorWidth = document.querySelector("#home-latest-releases-display").getBoundingClientRect().width;
		carouselPos = carouselPos - visorWidth - GAP;
		if(carouselPos>=0){
			carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
			carousel.style.transition=" all 800ms";
			if(carouselPos<=0) btnBackward.classList.add("btn-disabled-latest-realeses");
		}
		else{
			carouselPos = 0;
			carousel.setAttribute("style", `transform:translate(-${carouselPos}px)`);
			carousel.style.transition=" all 800ms";			
			btnBackward.classList.add("btn-disabled-latest-realeses");
			btnFordward.classList.remove("btn-disabled-latest-realeses");
		}
	});




});