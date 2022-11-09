
    const canvas = document.querySelector("#four-in-line");
    const ctx = canvas.getContext("2d");
    const configPanel = document.querySelector("#four-in-line-config");
    const startBtn = document.querySelector("#submergeBLock-game-start-btn");
    const reStartBtn = document.querySelector("#submergeBlock-reStart-btn");
    const modalWinnerPlayer = document.querySelector("#modal-winner-player");
    const modalCloseBtn = document.querySelector("#close-modal-winner-player-btn");
    const backToConfigBtn = document.querySelector("#submergeBLock-back-to-config-game");
    const gameStatus = document.querySelector("#game-status");
    const gameBtnContainer =  document.querySelector("#game-btn-container");
    const closeBtn =  document.querySelector("#submergeBLock-close-game");


    const game = document.querySelector("#submergeBlock-four-in-line");
    let submergeBlock = null;
    const coinSizeMapper = {4: 35, 5: 30, 6: 28, 7: 26};
    const coinBoardSpace = {4: 90, 5: 80, 6: 70, 7: 68};
    let gameConfig = {
        namePlayer1: "player1",
        namePlayer2: "player2",
        boardConfig: 4,
        colorCoinPlayer1: null,
        colorCoinPlayer2: null,
        ctx: ctx,
        canvas:canvas,
    }

    modalCloseBtn.addEventListener("click",()=>{
        modalWinnerPlayer.classList.toggle("show-modal");
    });

    const cantFichas = document.querySelector("#submergeBlock-game-boardConfig-coins");
    cantFichas.addEventListener("change", (e) => {
        gameConfig.boardConfig = Number(cantFichas.value);
    });

    const coinPlayer1 = document.querySelectorAll(".submergeBlock-player1-btn");
    coinPlayer1.forEach(b => {
        b.addEventListener("click", () => {
            coinPlayer1.forEach((c)=>{c.style.boxShadow = "inherit";
            c.style.opacity = "0.2";
            });
            b.style.boxShadow = "0px 0px 34px #2770bd";
            b.style.opacity = "1";
            onCoinSelectionPlayer1(b.value);
        })
    });

    const coinPlayer2 = document.querySelectorAll(".submergeBlock-player2-btn");
    coinPlayer2.forEach(b => {
        b.addEventListener("click", () => {
            coinPlayer2.forEach((c)=>{
                c.style.boxShadow = "inherit";
                c.style.opacity = "0.2";
            });
            b.style.boxShadow = "0px 0px 34px #2770bd";
            b.style.opacity = "1";
            onCoinSelectionPlayer2(b.value);
        })
    });


    startBtn.addEventListener("click", () => { start(); });

    reStartBtn.addEventListener("click",function (e){
        clean();
        gameBtnContainer.classList.add("hide");
        game.classList.add("hide");
        configPanel.classList.remove("hide");
    });

    backToConfigBtn.addEventListener("click",()=>{
        clean();
        gameBtnContainer.classList.add("hide");
        game.classList.add("hide");
        configPanel.classList.remove("hide");
    });

    closeBtn.addEventListener("click",()=>{
        clean();
        gameBtnContainer.classList.add("hide");
        game.classList.add("hide");
        configPanel.classList.add("hide");
        document.querySelector("#submergeBlock-game").classList.remove("hide");
    });

    function clean(){
        coinPlayer1.forEach((c)=>{c.style.boxShadow = "inherit";
        c.style.opacity = "0.5";
        });
        coinPlayer2.forEach((c)=>{c.style.boxShadow = "inherit";
            c.style.opacity = "0.5";
        });
        disableStartBtn();
        gameStatus.innerHTML = "";
        submergeBlock.clear();
        submergeBlock = null;
        gameConfig.boardConfig = 4;
        cantFichas.value = 4;
    }



    function onCoinSelectionPlayer1(value) {
        gameConfig.colorCoinPlayer1 = value;
        isFormCompleted();
    }

    function onCoinSelectionPlayer2(value) {
        gameConfig.colorCoinPlayer2 = value;
        isFormCompleted();
    }

    function isFormCompleted() {
        if(gameConfig.boardConfig && gameConfig.colorCoinPlayer1 && gameConfig.colorCoinPlayer2){
           enableStartBtn();
        }
    }

    function enableStartBtn(){
        startBtn.style.opacity = 1;
        startBtn.disabled=false;
        startBtn.style.pointerEvents= "visible";
    }

    function disableStartBtn(){
        startBtn.style.opacity = "0.3";
        startBtn.disabled=true;
        startBtn.style.pointerEvents= "none";
    }

    function start() {
        game.classList.remove("hide");
        configPanel.classList.add("hide");
        gameConfig.coinSize = coinSizeMapper[gameConfig.boardConfig];
        gameConfig.coinBoardSpace = coinBoardSpace[gameConfig.boardConfig];
        submergeBlock = new Game(gameConfig);
    }






