class Shifter {
    turn  = 0;
    timerId=null;

 playerMapper={
     0:null,
     1:null
 };

timer = 0;
    constructor(player1,player2,game) {
        this.playerMapper[0] = player1;
        this.playerMapper[1] = player2;
        this.game = game;
    }

getInitPlayer(){
   this.turn =   Math.floor(Math.random() * 2);
   console.log(this.turn);
   this.initTurnTimer();
    return this.playerMapper[this.turn];
}

endTurn(){
      this.game.finishTurn();
}

getNext(){
        console.log(this.turn);
        if(this.turn===1)this.turn=0;
        else this.turn=1;
        this.initTurnTimer();
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
