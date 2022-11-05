
  const canvas = document.querySelector("#four-in-line");
  const ctx = canvas.getContext("2d");
  const configPanel = document.querySelector("#four-in-line-config");
  const game = document.querySelector("#submergeBlock-four-in-line");

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
            onCoinSelectionPlayer1(b.value);
        })
    });

    const coinPlayer2 = document.querySelectorAll(".submergeBlock-player2-btn");
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
        gameConfig.boardConfig = Number(cantFichas.value);
    });

    function onCoinSelectionPlayer1(value) {
        gameConfig.colorCoinPlayer1 = value;
    }

    function onCoinSelectionPlayer2(value) {
        gameConfig.colorCoinPlayer2 = value;
    }


    function start() {
        game.classList.remove("hide");
            configPanel.classList.add("hide");
        gameConfig.coinSize = coinSizeMapper[gameConfig.boardConfig];
        gameConfig.coinBoardSpace = coinBoardSpace[gameConfig.boardConfig];
        new Game(gameConfig);
    }



