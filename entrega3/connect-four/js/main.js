const canvas = document.querySelector("#four-in-line");
const ctx = canvas.getContext("2d");


    const coinSizeMapper = {4: 25, 5: 23, 6: 21, 7: 19};
    const coinBoardSpace = {4: 70, 5: 60, 6: 60, 7: 50};
    let gameConfig = {
        namePlayer1: "player1",
        namePlayer2: "player2",
        boardConfig: 4,
        colorCoinPlayer1: null,
        colorCoinPlayer2: null,
    }
gameConfig.ctx = ctx;
gameConfig.canvas = canvas;



    const coinPlayer1 = document.querySelectorAll(".submergeBlock-player1-btn");
    console.log("before", coinPlayer1);
    coinPlayer1.forEach(b => {
        b.addEventListener("click", () => {
            onCoinSelectionPlayer1(b.value);
        })
    });

    const coinPlayer2 = document.querySelectorAll(".submergeBlock-player2-btn");
    console.log("before", coinPlayer2);
    coinPlayer2.forEach(b => {
        b.addEventListener("click", () => {
            onCoinSelectionPlayer2(b.value);
        })
    });

    let startBtn = document.querySelector("#submergeBLock-game-start-btn");
    startBtn.addEventListener("click", () => {
            start();
        }
    );



    const cantFichas= document.querySelector("#submergeBlock-game-boardConfig-coins");
    cantFichas.addEventListener("change",(e)=>{
        console.log(cantFichas.value);
        gameConfig.boardConfig= Number(cantFichas.value);
    });

    function onCoinSelectionPlayer1(value) {
        gameConfig.colorCoinPlayer1 = value;
    }

    function onCoinSelectionPlayer2(value) {
        gameConfig.colorCoinPlayer2 = value;
    }


    function start() {
        console.log(gameConfig);
        gameConfig.coinSize = coinSizeMapper[gameConfig.boardConfig];
        gameConfig.coinBoardSpace = coinBoardSpace[gameConfig.boardConfig];
        console.log(gameConfig);
        new Game(gameConfig);
    }


