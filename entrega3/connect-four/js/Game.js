class Game {

    constructor(config) {
        this.config = config;
        this.board = new Board(config.ctx,config);
        this.player1 = new Player(this.config.namePlayer1,this);
        this.player2 = new Player(this.config.namePlayer2,this);
        this.init();
        this.selectedCoin = null;
    }

    init() {
        this.board.init();
        let coinsPlayer1 = this.getCoins(this.config.colorCoinPlayer1);
        this.drawCoinsOnBoard(coinsPlayer1,this.board.getPositionX() -  50);
        this.player1.setCoins(coinsPlayer1);
        let coinsPlayer2 =  this.getCoins(this.config.colorCoinPlayer2);
        this.drawCoinsOnBoard(coinsPlayer2,this.board.getPositionX() + this.board.getSize() + 50);
        this.player2.setCoins(coinsPlayer2);
        this.initEvents();
        this.selectedCoin = null;
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
      this.selectedCoin = this.player1.getCoinByPosition(pos.x,pos.y);
    }

    mouseMove(event){
            if (this.selectedCoin) {
                let rect = this.config.canvas.getBoundingClientRect();
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
             if(this.player1.getCoins().length ===0) setTimeout(this.notify,10);
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
        let coins = this.player1.getCoins();
        coins.splice(this.selectedCoin.getIndex(), 0, this.selectedCoin)
        this.player1.setCoins(coins);
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





}
