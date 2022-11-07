
    const canvas = document.querySelector("#four-in-line");
    const ctx = canvas.getContext("2d");
    const configPanel = document.querySelector("#four-in-line-config");
    const startBtn = document.querySelector("#submergeBLock-game-start-btn");
    const reStartBtn = document.querySelector("#submergeBlock-reStart-btn");
    const modalWinnerPlayer = document.querySelector("#modal-winner-player");

    const modalCloseBtn = document.querySelector("#close-modal-winner-player-btn");

    modalCloseBtn.addEventListener("click",()=>{
        modalWinnerPlayer.classList.toggle("show-modal");
    });

    const backToConfigBtn = document.querySelector("#submergeBLock-back-to-config-game");

    gameStatus = document.querySelector("#game-status");
    gameBtnContainer =  document.querySelector("#game-btn-container");

    closeBtn =  document.querySelector("#submergeBLock-close-game");

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

    const coinPlayer1 = document.querySelectorAll(".submergeBlock-player1-btn");
    coinPlayer1.forEach(b => {
        b.addEventListener("click", () => {
            coinPlayer1.forEach((c)=>{c.style.boxShadow = "inherit";});
            b.style.boxShadow = "4px 3px 9px #2770bd";
            onCoinSelectionPlayer1(b.value);
        })
    });

    const coinPlayer2 = document.querySelectorAll(".submergeBlock-player2-btn");
    coinPlayer2.forEach(b => {
        b.addEventListener("click", () => {
            coinPlayer2.forEach((c)=>{c.style.boxShadow = "inherit";});
            b.style.boxShadow = "4px 3px 9px #2770bd";
            onCoinSelectionPlayer2(b.value);
        })
    });


    startBtn.addEventListener("click", () => {
            start();
        }
    );

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
        coinPlayer1.forEach((c)=>{c.style.boxShadow = "inherit";});
        coinPlayer2.forEach((c)=>{c.style.boxShadow = "inherit";});
        gameStatus.innerHTML = "";
        submergeBlock.clear();
        submergeBlock = null;
    }

    const cantFichas = document.querySelector("#submergeBlock-game-boardConfig-coins");
    cantFichas.addEventListener("change", (e) => {
        gameConfig.boardConfig = Number(cantFichas.value);
    });

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
            startBtn.style.opacity = 1;
            startBtn.disabled=false;
            startBtn.style.pointerEvents= "visible";
        }
    }


    function start() {
        game.classList.remove("hide");
        configPanel.classList.add("hide");
        gameConfig.coinSize = coinSizeMapper[gameConfig.boardConfig];
        gameConfig.coinBoardSpace = coinBoardSpace[gameConfig.boardConfig];
        submergeBlock = new Game(gameConfig);
    }






