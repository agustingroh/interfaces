class Board {
board = [];
space = 65;
positionX = 200;
positionY = 120;
coinThrowHeigh = 60;
boundary
    constructor(ctx,boardConfig) {
        this.ctx = ctx;
        this.boardConfig = boardConfig;
        this.boundary =  this.boardConfig;
    }

    init() {
        this.drawBoard();
        this.buildBoard();
    }

    buildBoard(){
        this.board = Array(this.boardConfig).fill(null).map(() => Array(this.boardConfig).fill(null));
    }

    addCoin(column,coin){
        if(column<0 || column> this.boundary) return;
        for (let i = this.boundary-1; i >= 0; i--) {
            if (!this.board[i][column]) {
                let xPos = ((this.space / 2)) + this.positionX + (this.space * column);
                coin.setX(xPos);
                let yPos = (this.positionY + (i + 1) * (this.space) - (this.space / 2));
                coin.setY(yPos);
                this.board[i][column] = coin;
                return
            }

        }
    }

    hasPlacesInColumn(column){
        for (let i = this.boundary-1; i >= 0; i--) {
            if (!this.board[i][column]) {
                return true;
            }
        }
        return  false;
    }


    getCoinFromLocker(x,y){
        return this.board[x,y];
    }



    drawBoard(){
        const size = this.boardConfig * this.space;
        this.ctx.fillStyle = ("#000a34");
        this.ctx.fillRect (this.positionX , this.positionY, size, size);
        let posX = this.positionX + (this.space/2);
        for(let i=0 ; i< this.boardConfig ; i++){
            let posY = this.positionY + (this.space/2);
            for(let j=0; j< this.boardConfig ; j++){
                this.ctx.fillStyle = 'white';
                this.ctx.beginPath();
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'black';
                ctx.shadowOffsetX = 5;
                ctx.shadowOffsetY = 5;
                this.ctx.shadowInset = true;
                this.ctx.arc(posX,posY ,25,0,2*Math.PI,true);
                this.ctx.fill();
                posY = posY + this.space;
            }
            posX = posX + this.space;
        }

    //    this.ctx.globalCompositeOperation = "source-over";
    }

    getPositionX(){
        return this.positionX;
    }

    getSize(){
        return this.boardConfig * this.space;
    }

    getPositionY(){
        return this.positionY;
    }

    reDraw(){
        this.drawBoard();
        this.reDrawCoins();
    }

    reDrawCoins(){
         for(let i=0; i<this.boardConfig ; i++){
             for(let j=0; j<this.boardConfig; j++ ){
                 if(this.board[i][j]){
                      this.board[i][j].draw();
                 }
             }
         }
    }

    getColumn(x,y){
        if(y<this.positionY && y> this.positionY - this.coinThrowHeigh && x > this.positionX &&  x <  this.positionX + this.getSize() ){
            const column = Math.floor((x-this.positionX) / this.space);
            return column;
        }
        return null;
    }

}
