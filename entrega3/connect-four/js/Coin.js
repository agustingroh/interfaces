class Coin {
    x
    y
    index
    boardX
    boardY
    ctx
    color

    constructor(ctx,color,radio) {
        this.ctx =  ctx;
        this.color = color;
        this.x =  null;
        this.y =  null;
        this.radio = radio;

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

    getRadio(){
        return this.radio;
    }

    getY(){
        return this.y;
    }

    returnToBoard(){
        ctx.beginPath();
        ctx.arc(this.boardX, this.boardY, this.getRadio(), 0, 2 * Math.PI, true);
        ctx.strokeStyle = "#000b23";
        ctx.stroke();
        ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.boardX,this.boardY ,this.getRadio(),0,2*Math.PI,true);
        this.ctx.fill();
    }

   async draw(stroke){
        if(stroke) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.getRadio(), 0, 2 * Math.PI);
            ctx.strokeStyle = "#000b23";
            ctx.stroke();
        }
       
        ctx.fillStyle = this.color;
        console.log("value",this.color);
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y ,this.getRadio(),0,2*Math.PI);   
         this.ctx.fill();
     // const image = new Image();
     // image.onload = () => {this.ctx.drawImage(image,0,0,image.naturalWidth,image.naturalHeight);}
    // image.src =`${this.color}`;
    
    }

  
    
   
    isSelected(x,y){
        let aux = (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
        let dist = Math.sqrt(aux);
        let r = this.getRadio();
        if(dist < r) return true;
        return false;
    }


}
