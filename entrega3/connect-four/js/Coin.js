class Coin {
    x
    y
    index
    boardX
    boardY
    ctx
    color
    constructor(ctx,color) {
        this.ctx =  ctx;
        this.color = color;
        this.x =  null;
        this.y =  null;
    }


    getColor(){
        return this.color;
    }

    setX(x){
        this.x=x;
    }

    getX(){
        return this.x;
    }

    setIndex(i){
        this.index = i;
    }

    getIndex(){
        return this.index;
    }

    setY(y){
        this.y=y;
    }

    setInitX(x){
        this.boardX = x;
    }

    setInitY(y){
        this.boardY =  y;
    }

    returnToInitPosition(){
        this.x = this.boardX;
        this.y = this.boardY;
    }

    getY(){
        return this.y;
    }

    returnToBoard(){
        ctx.beginPath();
        ctx.arc(this.boardX, this.boardY, 25, 0, 2 * Math.PI, true);
        ctx.strokeStyle = "#000b23";
        ctx.stroke();
        ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.boardX,this.boardY ,25,0,2*Math.PI,true);
        this.ctx.fill();
    }



    draw(stroke){
        if(stroke) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI, true);
            ctx.strokeStyle = "#000b23";
            ctx.stroke();
        }
        ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y ,25,0,2*Math.PI,true);
        this.ctx.fill();
    }

    isSelected(x,y){
        let aux = (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
        let dist = Math.sqrt(aux);
        let r = 25;
        if(dist < r) return true;
        return false;
    }


}
