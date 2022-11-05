
    const canvas = document.querySelector("#four-in-line");
    const ctx = canvas.getContext("2d");
   const configPanel = document.querySelector("#four-in-line-config");
   const game = document.querySelector("#submergeBlock-four-in-line")


    const coinSizeMapper = {4: 40, 5: 35, 6: 33, 7: 30};
    const coinBoardSpace = {4: 120, 5: 100, 6: 90, 7: 80};
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


    const cantFichas = document.querySelector("#submergeBlock-game-boardConfig-coins");
    cantFichas.addEventListener("change", (e) => {
        console.log(cantFichas.value);
        gameConfig.boardConfig = Number(cantFichas.value);
    });

    function onCoinSelectionPlayer1(value) {
        gameConfig.colorCoinPlayer1 = value;
    }

    function onCoinSelectionPlayer2(value) {
        gameConfig.colorCoinPlayer2 = value;
    }


    function start() {
        console.log(gameConfig);
        game.classList.remove("hide");
        console.log(configPanel);
            configPanel.classList.add("hide");
        gameConfig.coinSize = coinSizeMapper[gameConfig.boardConfig];
        gameConfig.coinBoardSpace = coinBoardSpace[gameConfig.boardConfig];
        console.log(gameConfig);
        new Game(gameConfig);
    }



