export default class Meteorite {
    constructor(game, x, y, playerDead) {
        this.game = game;
        this.x = x - 30;
        this.y = y + 100;
        this.width = 178;
        this.height = 194;
        this.image = document.getElementById('meteorite');
        this.alpha = 1;

        this.frameCount = 0;
        this.frames = 3;
        this.framesSpeed = 15;
        this.currentFrame = 0;

        this.playerDead = playerDead;

        this.landingSound = new Audio('../assets/audio/landing.wav');
        this.landingSound.volume = 0.3;
        this.landingSound.play();

    }

    update(){
        this.alpha -= 0.005;

        if(this.playerDead){
            this.alpha = 1;
            this.image = document.getElementById('meteoriteWithBody');
        }

        this.frameCount ++;
        if(this.frameCount >= this.framesSpeed){
            this.frameCount = 0;
        
            this.currentFrame ++;
            if(this.currentFrame >= this.frames) {
                this.currentFrame = 0;
            }
        }
        
    }   

    draw(context){

        const sx = this.currentFrame * this.width;
        const sy = 0;
        const sw = this.width;
        const sh = this.height;
        context.globalAlpha = this.alpha;
        context.drawImage(this.image , sx, sy, sw, sh, this.x, this.y, this.width, this.height);
        context.globalAlpha = 1;
    }
}