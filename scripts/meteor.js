export default class Meteor{
    constructor(game, speed) {
        this.game = game;
        this.width = 136;
        this.height = 264;
        this.x = Math.random() *  (game.width - this.width);
        this.y = -this.height;
        this.meteorImage = document.getElementById('meteor');
        this.meteorShadowImage = document.getElementById('meteorShadow');
        this.shadowWidth = 136;
        this.shadowHeight = 80;
        this.frameCount = 0;
        this.meteorFrames = 3;
        this.meteorFramesLength = 15;
        this.currentFrame = 0;
        this.playerKilled = false;
        this.scale = 0;
        this.speed = speed;
        this.fallingSound = new Audio('../assets/audio/falling.wav');
        this.fallingSound.volume = 0.25;
        this.fallingSound.playbackRate = speed - 0.2;
        this.fallingSound.play();
    }

    update() {
        this.y += this.speed;
        if(this.y >= this.game.height){
            this.y = -this.height;
        }

        this.frameCount ++;
        if(this.frameCount >= this.meteorFramesLength){
            this.frameCount = 0;

            this.currentFrame ++;
            if(this.currentFrame >= this.meteorFrames){
                this.currentFrame = 0;
            }

        }

    }

    draw(context) {
        const sx = this.currentFrame * this.width;
        const sy = 0;
        const sw = this.width;
        const sh = this.height;
        
        context.drawImage(this.meteorImage, sx, sy, sw, sh, this.x, this.y, this.width * this.scale, this.height * this.scale);
        context.drawImage(this.meteorShadowImage, this.x - 27, this.game.height - this.shadowHeight , this.shadowWidth * this.scale, this.shadowHeight * this.scale);
    }
}