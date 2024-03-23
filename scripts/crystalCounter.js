export default class CrystalCounter {
    constructor(game){
        this.game = game;

        this.crystalImageWidth = 40;
        this.crystalImageHeight = 60;

        this.crystalCounterX = game.width - 80;
        this.crystalCounterY = 60;
        this.pickedCrystals = 0;

        this.picked = false;
        this.scale = 1;

        this.crystalImageX = this.crystalCounterX + 15;
        this.crystalImageY = this.crystalCounterY - 40;

    }

    update(){
        if(this.picked){
            if(this.scale <= 1.2){
                this.scale += 0.02;
            }else{
                this.picked = false;
            }
        }else if(this.scale >= 1) {
            this.scale -= 0.02;
        }
    }

    draw(context){
        context.textAlign = 'end';
        context.drawImage(this.game.crystalImage, this.crystalImageX, this.crystalImageY, this.crystalImageWidth * this.scale, this.crystalImageHeight * this.scale);
        context.font = 16 * this.scale + 'px gameFont';
        context.fillText(this.pickedCrystals + ' x' , this.crystalCounterX, this.crystalCounterY);
    }
}