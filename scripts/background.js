export default class Background {

    constructor(game) {

        this.game = game;
        this.landscapeImage = document.getElementById('landscape');
        this.starsImage = document.getElementById('stars');
        this.starsWidth = 960;
        this.starsHeight = 438;

        this.frameCount = 0;
        this.starsCurrentFrame = 0;
        this.starsFrames = 6;
        this.starsFramesLength = 25;
        this.starsImageTranslateX = 0;
        this.starsImageTranslateY = 0;


    }
    update() {
        this.starsImageTranslateX += 0.15;
            this.starsImageTranslateY += 0.1;

            if(this.starsImageTranslateY >= this.starsHeight) {
                this.starsImageTranslateY = 0;
            }

            if(this.starsImageTranslateX >= this.starsWidth) {
                this.starsImageTranslateX = 0;
            }

            this.frameCount ++ ;
            if(this.frameCount >= this.starsFramesLength){
                this.frameCount = 0;

                this.starsCurrentFrame ++;

                if(this.starsCurrentFrame >= this.starsFrames) {
                    this.starsCurrentFrame = 0;
                }
            }
    }
    draw(context) {
        const stars_sx = this.starsCurrentFrame * this.starsWidth;
            const stars_sy = 0;
            const stars_sw = this.starsWidth; 
            const stars_sh = this.starsHeight; 

            const starsCopyY_sx = this.starsCurrentFrame * this.starsWidth;
            const starsCopyY_sy = this.starsHeight - this.starsImageTranslateY;
            const starsCopyY_sw = this.starsWidth;
            const starsCopyY_sh = this.starsImageTranslateY;

            const starsCopyX_sx = this.starsCurrentFrame * this.starsWidth + this.starsWidth - this.starsImageTranslateX;
            const starsCopyX_sy = 0;
            const starsCopyX_sw = this.starsImageTranslateX;
            const starsCopyX_sh = this.starsHeight;

            const starsCopyXY_sx = this.starsCurrentFrame * this.starsWidth + this.starsWidth - this.starsImageTranslateX;
            const starsCopyXY_sy = this.starsHeight - this.starsImageTranslateY;
            const starsCopyXY_sw = this.starsImageTranslateX;
            const starsCopyXY_sh = this.starsImageTranslateY;

            context.globalAlpha = 0.33;

            context.drawImage(this.starsImage, stars_sx, stars_sy, stars_sw, stars_sh, this.starsImageTranslateX, this.starsImageTranslateY, stars_sw, stars_sh);


            context.drawImage(this.starsImage, starsCopyY_sx, starsCopyY_sy, starsCopyY_sw, starsCopyY_sh , this.starsImageTranslateX, 0, starsCopyY_sw, starsCopyY_sh);
            context.drawImage(this.starsImage, starsCopyX_sx, starsCopyX_sy, starsCopyX_sw, starsCopyX_sh , 0, this.starsImageTranslateY, starsCopyX_sw, starsCopyX_sh);
            context.drawImage(this.starsImage, starsCopyXY_sx, starsCopyXY_sy, starsCopyXY_sw, starsCopyXY_sh , 0, 0, starsCopyXY_sw, starsCopyXY_sh);


            context.globalAlpha = 1;

            context.drawImage(this.landscapeImage, 0, 0 , this.game.width, this.game.height);

    }
}