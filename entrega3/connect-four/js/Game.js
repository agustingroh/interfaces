class Game {
actualPlayer = null;
timer = 0;
sec = 0;
minutes = 0;
timerContainer = document.querySelector("#time");
gameStatus = document.querySelector("#game-status");
gameBtnContainer =  document.querySelector("#game-btn-container");
timerId = null;
limitTime = 4;

    constructor(config) {
        this.timerContainer.innerHTML = (this.minutes < 10 ? "0" + this.minutes : this.minutes) + ":" + (this.sec < 10 ? "0" + this.sec : this.sec);
        this.config = config;
        this.board = new Board(config.ctx,config);
        this.player1 = new Player("Jugador 1");
        this.player2 = new Player("Jugador 2");
        this.shifter =  new Shifter(this.player1,this.player2,this);
        this.init();
        this.selectedCoin = null;
    }

    async init() {
        this.timerId = setInterval(this.updateTimer,1000,this);
        await this.board.loadBoard();
        this.board.init();
        let coinsPlayer1 = this.getCoins(this.config.colorCoinPlayer1);
        this.drawCoinsOnBoard(coinsPlayer1,this.board.getPositionX()  -75);
        this.player1.setCoins(coinsPlayer1);
        let coinsPlayer2 =  this.getCoins(this.config.colorCoinPlayer2);
        this.drawCoinsOnBoard(coinsPlayer2,this.board.getPositionX() + this.board.getSize() + 75);
        this.player2.setCoins(coinsPlayer2);
        this.initEvents();
        this.selectedCoin = null;
        this.actualPlayer =   this.shifter.getInitPlayer();

    }

    updateTimer(game){
        game.timer =  game.timer + 1;
        game.sec = game.sec + 1;
        let sec =   game.sec;
        if(game.sec === 60){
            game.sec = 0;
            sec = game.sec;
            game.minutes = game.minutes + 1;
        }

        if(game.minutes === game.limitTime){
            game.stopTimer();
            game.notifyEndTime();
        }

        game.timerContainer.innerHTML = (game.minutes < 10 ? "0" + game.minutes : game.minutes) + ":" + (sec < 10 ? "0" + sec : sec);
    }

    stopTimer(){
        clearInterval(this.timerId);
    }

    notifyEndTime(){
        this.gameStatus.innerHTML = "¡El tiempo ha finalizado!";
        this.showReStartBtn();

    }

    showReStartBtn(){
        this.gameBtnContainer.classList.remove("hide");
    }


    getCoins(color){
        let coinsPlayer = [];
        let coins = (this.config.boardConfig * this.config.boardConfig / 2)
        for(let i=0; i<coins ; i++){
            coinsPlayer.push(new Coin(this.config.ctx,color,this.config.coinSize));
        }
        return coinsPlayer;
    }

      async drawCoinsOnBoard(c,x){
        let posX = x;
        let posY =  this.board.getPositionY() + this.board.getSize() - 20;
        for ( let i = 0 ; i< c.length ; i ++){
        
            c[i].setX(posX);
            c[i].setY(posY);
            c[i].setInitX(posX);
            c[i].setInitY(posY);
            c[i].setIndex(i);
            await  c[i].loadImage();
            c[i].draw();
            posY = posY - 15;
        }
    }

    clean(){
        this.config.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    clear(){
        this.clean();
        clearInterval(this.timerId);
    }


    showEmptyCoinMessage(game){
        game.stopTimer();
        game.gameStatus.innerHTML = "¡Empate!";
        game.showReStartBtn();
    }


    reDraw(){
        this.clean();
        this.board.reDraw();
        this.reDrawCoinsOnBoard(this.player1);
        this.reDrawCoinsOnBoard(this.player2);
    }

    reDrawCoinsOnBoard(player){
        player.getCoins().forEach((c)=>{
            c.returnToInitPosition();
            c.draw();
        });
    }

    getMousePosition(event){
        const transform = this.config.ctx.getTransform();
        let x = event.offsetX - transform.e;
        let y = event.offsetY - transform.f;
        return { x, y};
    }

    mouseDown(event) {
      let pos = this.getMousePosition(event);
      this.selectedCoin = this.actualPlayer.getCoinByPosition(pos.x,pos.y);
    }

    mouseMove(event){
            if (this.selectedCoin) {
            this.reDraw();
            let pos = this.getMousePosition(event);
            this.selectedCoin.setX(pos.x);
            this.selectedCoin.setY(pos.y);
            this.selectedCoin.draw();
        }
    }

    mouseUp(event){
        if(this.selectedCoin) {
            let pos = this.getMousePosition(event);
            let column =   this.board.getColumn(pos.x,pos.y);
            let hasSpace = this.board.hasPlacesInColumn(column);
         if(column !== null && hasSpace){
             //   pos = {row, column }
            const pos = this.board.addCoin(column,Object.assign(this.selectedCoin));
            const winnerPlay =  this.board.isWinnerPlay(pos,this.selectedCoin);
           if(winnerPlay){
               this.reDraw();
               this.selectedCoin = null;
               setTimeout(this.showWinnerPlayer, 100, this);
           }
           else {
               this.reDraw();
               this.selectedCoin = null;
               this.actualPlayer = this.shifter.getNext();
               if (this.actualPlayer.getCoins().length === 0) setTimeout(this.showEmptyCoinMessage, 10,this);
           }
          }else {
              this.returnCoinToInitPosition();
          }
        }
    }

    showWinnerPlayer(game){
        game.stopTimer();
        game.gameStatus.innerHTML = `¡El ${game.actualPlayer.getName()} ha ganado!`;
        game.showReStartBtn();


    }

    mouseOut(event){

        if(this.selectedCoin) {
           this.returnCoinToInitPosition();
        }
    }

    returnCoinToInitPosition(){
        let coins = this.actualPlayer.getCoins();
        coins.splice(this.selectedCoin.getIndex(), 0, this.selectedCoin)
        this.actualPlayer.setCoins(coins);
        this.selectedCoin = null;
        this.reDraw();
    }

    initEvents() {
        this.config.canvas.addEventListener("mousedown", (e) => {
            this.mouseDown(e);
        })
        this.config.canvas.addEventListener("mousemove", (e) => {
            this.mouseMove(e);
        });
        this.config.canvas.addEventListener("mouseup", (e) => {
            this.mouseUp(e);
        });

        this.config.canvas.addEventListener("mouseout", (e)=>{

            this.mouseOut(e)
        });

    }

    finishTurn(){
        console.log("Termino el turno");
        this.returnCoinToInitPosition();
        this.actualPlayer = null;
        this.actualPlayer = this.shifter.getNext();
    }





}
