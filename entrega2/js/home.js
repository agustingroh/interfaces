document.addEventListener("DOMContentLoaded",function (){

    const body = document.querySelector("#body-index");
    const loaderIndex = document.querySelector("#loader-index");
    const loadingSpinner = document.querySelector("#loading-spinner");
    const loadingProgress = document.querySelector("#loading-progress");
    let intervalId=null;
    let progressIntervalId = null;
    let pos = 0;

    function showLoader(){
        body.classList.add('hide');
        loaderIndex.classList.add('loader-index');
        loadingSpinner.classList.add('start');
        let progress = 0;
        console.log("inicio");
       progressIntervalId = setInterval(function (){
            console.log("inicio progreso");
            loadingProgress.innerHTML= ``;
            loadingProgress.innerHTML =  `${progress}%`;
            progress += Math.round(Math.floor(6500/500));
            if(progress>=100) progress =100;
            console.log(progress * 500);
        },500);

        intervalId = setInterval(function (){
            loadingSpinner.setAttribute("style", `transform:rotate(${pos}deg)`);
            pos+=2000;
        },300);

        console.log("Empieza a girar el loader");
    }



    function hideLoader(){
        body.classList.toggle('hide');
        loaderIndex.classList.remove('loader-index');
        loaderIndex.classList.add('hide');
        console.log("Se va el loader y muestra la pagina");
    }

    setTimeout(function () {
        hideLoader();
        clearInterval(intervalId);
        clearInterval(progressIntervalId);
    }, 5000);

    showLoader();

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




});

