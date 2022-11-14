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
        let menuLines=document.querySelectorAll(".hamburger-menu-line");
        let menuHamburger=document.querySelector('#hamburger-menu');
         
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

    function include(path) {
        let script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        html.appendChild(script);
    }


    });

