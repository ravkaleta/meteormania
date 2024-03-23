export default class Player {

    

    constructor(game) {
        this.game = game
        this.width = 44 * 2;
        this.height = 69 * 2;
        this.x = this.game.width / 2  - this.width / 2;
        this.y = this.game.height - this.height - this.game.height * 0.1;
        this.image = document.getElementById('character');
        this.shadowImage = document.getElementById('characterShadow');
        this.frameCount = 0;
        this.charaterFramesLength = 15;
        this.characterCurrentFrame = 0;
        this.characterFrames = 6;
        this.animationRow = 0;

        this.footstepsSound = document.getElementById('footsteps');
        this.footstepsSoundPlaying = false;
    }


    update(input) {
        this.animationRow = 0;
        this.frameCount ++ ;
        if(this.frameCount >= this.charaterFramesLength){
            this.frameCount = 0;

            this.characterCurrentFrame ++;

            if(this.characterCurrentFrame >= this.characterFrames) {
                this.characterCurrentFrame = 0;
            }
        }

        if(input.includes('ArrowRight') || input.includes('ArrowLeft')){
            if(input.includes('ArrowRight') && this.x + this.width < this.game.width) 
            {
                this.animationRow = 1;
                this.x +=2;
            }
            if (input.includes('ArrowLeft') && this.x > 0) 
            {
                this.animationRow = 2;
                this.x -= 2;
            }
            if(!this.footstepsSoundPlaying){
                this.footstepsSoundPlaying = true;
                this.footstepsSound.currentTime = 0;
                this.footstepsSound.play();
            }

        }else {
            if(this.footstepsSoundPlaying){
                this.footstepsSound.pause();
                this.footstepsSoundPlaying = false;
            }
        }

        

    }
    
    draw(context) {
        context.fillStyle = 'red';
        //context.fillRect(this.x, this.y, this.width, this.height);

        const character_sx = this.width * this.characterCurrentFrame;
        const character_sy = this.animationRow * this.height;
        const character_sw = this.width;
        const character_sh = this.height;
        context.drawImage(this.shadowImage, this.x, this.y, 88, 156);
        context.drawImage(this.image, character_sx, character_sy, character_sw, character_sh, this.x, this.y, this.width, this.height );
        
    }
}
