document.addEventListener("DOMContentLoaded",function (){

    let html = document.querySelector('#html');
    let javascriptFilePaths = ["./js/home-recommended.js","./js/home-category.js","./js/home-latest-releases.js"];

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
       progressIntervalId = setInterval(function (){
            loadingProgress.innerHTML= ``;
            loadingProgress.innerHTML =  `${progress}%`;
            progress += Math.round(Math.floor(6500/500));
            if(progress>=100) progress =100;
        },500);

        intervalId = setInterval(function (){
            loadingSpinner.setAttribute("style", `transform:rotate(${pos}deg)`);
            pos+=2000;
        },300);

    }

    function hideLoader(){
        body.classList.toggle('hide');
        loaderIndex.classList.remove('loader-index');
        loaderIndex.classList.add('hide');
    }

    setTimeout(function () {
       hideLoader();
       clearInterval(intervalId);
       clearInterval(progressIntervalId);
       javascriptFilePaths.forEach(path=>{
           include(path);
       });
    }, 5000);
    showLoader();


       /**
        * @brief menu actions
        * **/
       document.querySelector('#menu-btn').addEventListener('click', () => {
           console.log("click");
           let menu = document.querySelector("#menu");
           menu.classList.toggle('show-menu');
       });

       document.querySelector('#close-menu-btn').addEventListener('click', () => {
           let menu = document.querySelector("#menu");
           menu.classList.toggle('show-menu');
       });

    function include(path) {
        let script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        html.appendChild(script);
    }


    });

