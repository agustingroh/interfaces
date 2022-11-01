const canvas = document.querySelector("#four-in-line");
const ctx = canvas.getContext("2d");
const coinSizeMapper = { 4: 25, 5: 23 , 6: 21 , 7: 19 };
const coinBoardSpace = { 4: 70, 5: 60 , 6: 60 , 7: 50 };
const gameConfig = {
    namePlayer1: "player1",
    namePlayer2: "player2",
    boardConfig: 4,
    colorCoinPlayer1: "yellow",
    colorCoinPlayer2: "blue",
}
gameConfig.ctx = ctx;
gameConfig.canvas = canvas;

gameConfig.coinSize = coinSizeMapper[gameConfig.boardConfig];
gameConfig.coinBoardSpace = coinBoardSpace[gameConfig.boardConfig];


new Game(gameConfig);
