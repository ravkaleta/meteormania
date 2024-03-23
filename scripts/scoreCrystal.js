export default class ScoreCrystal {
    constructor(game){

        this.game = game;
        this.width = 30;
        this.height = 82;
        this.y = game.height - this.height - 50;
        this.x = Math.random() *  (game.width - this.width);
        this.liveFramesLeft = 1000;
        this.image = document.getElementById('scoreCrystal');
        this.image2 = game.crystalImage;
        this.pickupSound = new Audio('../assets/audio/pickup.wav')
        this.pickupSound.volume = 0.2;
        this.frameCount = 0;
        this.frames = 3;
        this.framesSpeed = 30;
        this.currentFrame = 0;
        this.crystalAlpha = 1;
        this.interval = 0;
        this.flying = false;
        this.currentFlyingFrame = 0;
        this.flyingFrames = 20;


        this.initialX = this.x;
        this.initialY = this.y;

    }

    update() {

        if(this.liveFramesLeft < 500){
            this.framesSpeed = 20;
        }
        if(this.liveFramesLeft < 250){
            this.framesSpeed = 10;
        }
        if(!this.flying){
            this.liveFramesLeft --;
        
            this.frameCount ++;
            if(this.frameCount >= this.framesSpeed){
                this.frameCount = 0;
            
                this.currentFrame ++;
                if(this.currentFrame >= this.frames) {
                    this.currentFrame = 0;
                }
            }
        }

        if(this.flying){
            this.pickupSound.play();
        }
        

    }

    draw(context) {
        const sx = this.currentFrame * this.width;
        const sy = 0;
        const sw = this.width;
        const sh = this.height;
        
        if(!this.flying){
            context.drawImage(this.image, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
        }else{
            context.drawImage(this.image2, this.x, this.y, this.width, this.height - 24);
        }
    }
}