const canvas = document.querySelector("#four-in-line");
const ctx = canvas.getContext("2d");

const gameConfig = {
    namePlayer1: "player1",
    namePlayer2: "player2",
    boardConfig: 6,
    colorCoinPlayer1: "yellow",
    colorCoinPlayer2: "blue",
}
gameConfig.ctx = ctx;
gameConfig.canvas = canvas;



new Game(gameConfig);
