class Board {
board = [];
space = 70;
positionX = 0;
positionY = 0;
coinThrowHeigh = 90;
boundary
canvasContainer =  document.querySelector("#canvas-container");
    constructor(ctx,config) {
        this.ctx = ctx;
        this.boardConfig = config.boardConfig;
        this.boundary =  this.boardConfig;
        this.config = config;
        this.image = null;

    }

    async loadBoard(){
            return new  Promise(resolve => {
                this.image = new Image();
                this.image.addEventListener('load', () => {
                    resolve(true);
                });
                this.image.src = "img/game-canvas.jpg";
            });
    }

    init() {
        const size = this.boardConfig * this.config.coinBoardSpace;
        let canvasHeight = this.config.canvas.height;
        let canvasWidth = this.config.canvas.width;
        this.positionY = (   canvasHeight/2) - (size/2) + (this.config.coinSize * 2) - 5;
        this.positionX = (this.canvasContainer.clientWidth / 2) - (size/2);
        console.log(this.canvasContainer.clientWidth);
        this.drawBoard();
        this.buildBoard();
    }



    buildBoard(){
        this.board = Array(this.boardConfig).fill(null).map(() => Array(this.boardConfig).fill(null));
    }

    /**
     * @Brief  insert a coin in the board
     * @Param column the column where the coin should be inserted
     * @Param coin The coin co be inserted in the board
     * @Return The position in the board
     * */
    addCoin(column,coin){
        if(column<0 || column> this.boundary) return;
        for (let i = this.boundary-1; i >= 0; i--) {
            if (!this.board[i][column]) {
                let xPos = ((this.config.coinBoardSpace / 2)) + this.positionX + (this.config.coinBoardSpace * column);
                coin.setX(xPos);
                let yPos = (this.positionY + (i + 1) * (this.config.coinBoardSpace) - (this.config.coinBoardSpace / 2));
                coin.setY(yPos);
                this.board[i][column] = coin;
                return { row:i , column };
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
        const size = this.boardConfig * this.config.coinBoardSpace;
        this.ctx.fillStyle = ("#314455");
        let canvasHeight = this.config.canvas.height;
        let canvasWidth = this.config.canvas.width;
        console.log(canvasWidth);


        let wrh = 800 / 539;
        let newWidth = this.canvasContainer.clientWidth;
        let newHeight = newWidth / wrh;
        if (newHeight > this.canvasContainer.clientHeight) {
            newHeight = this.canvasContainer.clientHeight;
            newWidth = newHeight * wrh;
        }


          this.ctx.drawImage(this.image,0,0,this.canvasContainer.clientWidth,newHeight);

         this.ctx.fillRect (this.positionX ,this.positionY, size, size);

        let posX = this.positionX + (this.config.coinBoardSpace/2);
        for(let i=0 ; i< this.boardConfig ; i++){
            let posY = this.positionY + (this.config.coinBoardSpace/2);
            for(let j=0; j< this.boardConfig ; j++){
                this.ctx.fillStyle = 'white';
                this.ctx.beginPath();
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'black';
                ctx.shadowOffsetX = 5;
                ctx.shadowOffsetY = 5;
                this.ctx.shadowInset = true;
                this.ctx.arc(posX,posY ,this.config.coinSize,0,2*Math.PI,true);
                this.ctx.fill();
                posY = posY + this.config.coinBoardSpace;
            }
            posX = posX + this.config.coinBoardSpace;
        }

    //    this.ctx.globalCompositeOperation = "source-over";
    }

    getPositionX(){
        return this.positionX;
    }

    getSize(){
        return this.boardConfig * this.config.coinBoardSpace;
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
            const column = Math.floor((x-this.positionX) / this.config.coinBoardSpace);
            return column;
        }
        return null;
    }

    isWinnerPlay(pos,coin){
     return   this.isWinnerPlayHorizontally(pos,coin) || this.isWinnerPlayVertically(pos,coin) || this.isWinnerPlayDiagonal(pos,coin);

    }

    isWinnerPlayHorizontally(pos,coin) {
        let count = 0;
        for (let i = 0; i < this.config.boardConfig ; i++) {
            if (this.board[pos.row][i]?.getColor() === coin.getColor()) count++;
        }
        return count === this.config.boardConfig;
    }

    isWinnerPlayVertically(pos,coin){
        let count = 0;
        for (let i = 0; i < this.config.boardConfig; i++) {
            if (this.board[i][pos.column]?.getColor() === coin.getColor()) count++;
        }
        return count === this.config.boardConfig;
    }

    isWinnerPlayDiagonal(pos,coin){
        return this.isWinnerDiagonalUpRight(pos,coin) || this.isWinnerDiagonalUpLeft(pos,coin);
    }

    isWinnerDiagonalUpRight(pos,coin){
        let count = 0;
        let row = this.config.boardConfig -1;
        for(let i =0; i< this.config.boardConfig ; i++){
            if(this.board[row][i]?.getColor() == coin.getColor()) count ++;
            row = row -1;
        }
        return count === this.config.boardConfig;
    }

    isWinnerDiagonalUpLeft(pos,coin){
        let count = 0;
        let row = this.config.boardConfig -1;
        for(let i = this.config.boardConfig - 1; i>=0; i--){
            if(this.board[row][i]?.getColor() == coin.getColor()) count ++;
            row = row -1;
        }
        return count === this.config.boardConfig;
    }



}
