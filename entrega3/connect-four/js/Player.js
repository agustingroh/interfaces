class Player {
    game;
    coinsCount = 0;


    constructor(name) {
        this.name= name;
        this.init();
        this.coins =[];
    }

    init(){
        const coinsPlayer = [];
        for(let i=0; i<10; i++) {
             coinsPlayer.push(new Coin());
        }
        this.setCoins(coinsPlayer);
    }



    setCoins(coins){
        this.coins = coins;
        this.coinsCount = this.coins.length;
    }

    hasCoins(){
        return this.coinsCount > 0;
    }

    getCoin(){
        if(!this.hasCoins()){
            this.game.notify();
            return ;
        }
        this.coinsCount = this.coinsCount -1;
        return Object.assign(this.coins.pop());
    }


    getCoinQuantity(){
        return this.coinsCount;
    }

    getName(){
        return this.name;
    }

    getCoins(){
        return Array.from(this.coins);
    }

    getSelectedCoin(x,y){
        let coin = null;
        this.coins.forEach((c)=>{
            if(c.isSelected(x ,y)){
                coin = c;
            }
     });
        let noSelectedCoins = this.coins.filter(c=> c.getY()!== coin.getY());
        this.coins = noSelectedCoins;
        return coin;
    }

    getCoinByPosition(x,y){
        let coin = null;
        this.coins.forEach((c)=>{
            if(c.isSelected(x,y))
                coin = c;
        });
        if(coin){
            this.coins = this.coins.filter((c)=> coin!==c);
        }
        return coin;
    }



}
