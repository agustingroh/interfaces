class Game {
actualPlayer = null;
timer = 0;
sec = 0;
minutes = 0;
timerContainer = document.querySelector("#time");
    constructor(config) {
        this.timerContainer.innerHTML = (this.minutes < 10 ? "0" + this.minutes : this.minutes) + ":" + (this.sec < 10 ? "0" + this.sec : this.sec);
        this.config = config;
        this.board = new Board(config.ctx,config);
        this.player1 = new Player(this.config.namePlayer1,this);
        this.player2 = new Player(this.config.namePlayer2,this);
        this.shifter =  new Shifter(this.player1,this.player2,this);
        this.init();
        this.selectedCoin = null;
    }

    init() {
        this.timer = setInterval(this.updateTimer,1000,this);
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
        game.timerContainer.innerHTML = (game.minutes < 10 ? "0" + game.minutes : game.minutes) + ":" + (sec < 10 ? "0" + sec : sec);
    }


    getCoins(color){
        let coinsPlayer = [];
        let coins = (this.config.boardConfig * this.config.boardConfig / 2)
        for(let i=0; i<coins ; i++){
            coinsPlayer.push(new Coin(this.config.ctx,color,this.config.coinSize));
        }
        return coinsPlayer;
    }

    drawCoinsOnBoard(coins,x){
        let posX = x;
        let posY =  this.board.getPositionY() + this.board.getSize() - 20;
        coins.forEach((c,index)=>{
            c.setX(posX);
            c.setInitX(posX);
            c.setInitY(posY);
            c.setIndex(index);
            c.setY(posY);
            c.draw(true);
            posY = posY - 15;
        });
    }

    clean(){
        this.config.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    notify(){
        let text = "Desea jugar una nueva partida?";
        if (confirm(text) == true){
            location.reload();
        }
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
            c.draw(true);
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
             this.board.addCoin(column,Object.assign(this.selectedCoin));
              this.reDraw();
              this.selectedCoin = null;
              this.actualPlayer=this.shifter.getNext();
             if(this.actualPlayer.getCoins().length ===0) setTimeout(this.notify,10);
          }else {
              this.returnCoinToInitPosition();
          }
        }
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
