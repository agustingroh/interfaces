class Coin {
    x
    y
    index
    boardX
    boardY
    ctx
    color
    image

    constructor(ctx,color,radio) {
        this.ctx =  ctx;
        this.color = color;
        this.x =  null;
        this.y =  null;
        this.radio = radio;
        this.image = null;
        this.isImgLoaded = false;
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

   async loadImage(){
    console.log(this.index);
    return new Promise((resolve,reject)=>{
        this.image.onload = () => {
            this.ctx.drawImage(this.image,this.x,this.y,this.getRadio(),this.getRadio());
            console.log(this.index);
            resolve(true);
        }
    });
      
       
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

     loadImage() {        
        return new  Promise(resolve => {
             this.image = new Image();
            this.image.addEventListener('load', () => {                
                resolve(true);
            });
           this.image.src =  'C:/Users/Lara/Desktop/Lara/Interfaces/entrega3/img/coin2.png';
           
        });
}


    draw(stroke){        
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y ,this.getRadio(),0,2*Math.PI); 
        this.ctx.fill();
        this.ctx.closePath();


     

            this.ctx.drawImage(this.image,this.x,this.y,this.getRadio(),this.getRadio());
            this.image.src = 'C:/Users/Lara/Desktop/Lara/Interfaces/entrega3/img/coin2.png';

          
           
   
         
         
           
        

       /*  if(stroke) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.getRadio(), 0, 2 * Math.PI);
            ctx.strokeStyle = "#000b23";
            ctx.stroke();
        }
       
        ctx.fillStyle = this.color;
        console.log("value",this.color);
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y ,this.getRadio(),0,2*Math.PI);  */  
        // this.ctx.fill();
   
         //this.image.src = 'C:/Users/Lara/Desktop/Lara/Interfaces/entrega3/img/coin2.png';
       
    
    }

  
    
   
    isSelected(x,y){
        let aux = (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
        let dist = Math.sqrt(aux);
        let r = this.getRadio();
        if(dist < r) return true;
        return false;
    }


}
