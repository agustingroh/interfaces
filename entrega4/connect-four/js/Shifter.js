class Shifter {
    turn  = 0;
    timerId=null;
    player1Coin = document.querySelector("#player-1-coin");
    player2Coin = document.querySelector("#player-2-coin");
    player1CoinContainer =  document.querySelector("#player-1-coin-container");
    player2CoinContainer =  document.querySelector("#player-2-coin-container");

 playerMapper={
     0:null,
     1:null
 };

    constructor(player1,player2,game) {
        this.playerMapper[0] = player1;
        this.playerMapper[1] = player2;
        this.game = game;
        this.player1Coin.style.backgroundImage = `url(${game.config.colorCoinPlayer1})`;
        this.player2Coin.style.backgroundImage = `url(${game.config.colorCoinPlayer2})`;
        this.player2CoinContainer.style.opacity = "0.2";
        this.player1CoinContainer.style.filter = "0.2";
    }

getInitPlayer(){
   this.turn =   Math.floor(Math.random() * 2);
    if(this.turn===1){
        this.player2CoinContainer.style.opacity = "1";
        this.player2CoinContainer.style.boxShadow = "0px 0px 7px #ed08c7";

    }
    else {
        this.player1CoinContainer.style.opacity = "1";
        this.player1CoinContainer.style.boxShadow =  "0px 0px 7px #ed08c7";
    }
    return this.playerMapper[this.turn];
}

endTurn(){
      this.game.finishTurn();
}

getNext(){
        if(this.turn===1){
            this.turn=0;
            this.player1CoinContainer.style.opacity = "1";
            this.player2CoinContainer.style.opacity = "0.2";
            this.player1CoinContainer.style.boxShadow =  "0px 0px 7px #ed08c7";
            this.player2CoinContainer.style.boxShadow = "none";

        }
        else {
            this.turn = 1;
            this.player2CoinContainer.style.opacity = "1";
            this.player1CoinContainer.style.opacity = "0.2";
            this.player2CoinContainer.style.boxShadow = "0px 0px 7px #ed08c7";
            this.player1CoinContainer.style.boxShadow = "none";
        }
        return this.playerMapper[this.turn];
}

initTurnTimer(){
        console.log('before',this.timerId);
        if(this.timerId)clearTimeout(this.timerId);
    this.timerId=setInterval(this.updateTimer,1000,this);
     //   this.endTurn,10000,this.game);
    console.log('after',this.timerId);
}
updateTimer(shifter){
        shifter.timer=shifter.timer+1;
        console.log(shifter.timer);
        if(shifter.timer===10){
            shifter.timer=0;
            clearTimeout(shifter.timerId);
           shifter.endTurn();
        }
}

}
