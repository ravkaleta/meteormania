import Player from './player.js';
import { InputHandler } from './input.js';
import Background from './background.js';
import Meteor from './meteor.js';
import Meteorite from './meteorite.js';
import ScoreCrystal from './scoreCrystal.js';
import CrystalCounter from './crystalCounter.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const introMusic = document.getElementById('introMusicLoopable');
    introMusic.volume = 0.5;
    introMusic.loop = true;

    const bgMusic = document.getElementById('loopMusic');
    bgMusic.volume = 0.5;
    bgMusic.loop = true;

    const deathSound = document.getElementById('death');
    deathSound.volume = 0.5;

    canvas.width = 480 * 2;
    canvas.height = 270 * 2;

    const font = new FontFace('gameFont', 'url(../assets/DePixelBreitFett.ttf)');
    font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        

    class Game {
        constructor(width, height ){
            this.width = width;
            this.height = height;
            this.background  = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler();
            this.crystalCounter = new CrystalCounter(this);
            this.meteors = [];
            this.meteorites = [];
            this.scoreCrystals = [];
            this.scoreCrystalsCounter = 0;
            this.maxScoreCrystalsCount = 0;
            this.gameStarted = false;
            
            this.maxMeteors = 0;
            this.meteorsCounter = 0;
            this.meteorScaleIncrease = 0;
            this.maxMeteorDelay = 120;
            this.minMeteorDelay = 240;
            this.meteorRandomFramesDelay = Math.random() * (this.maxMeteorDelay - this.minMeteorDelay) + this.minMeteorDelay;
            this.meteorFrameCounter = 0;
            this.meteorSpeed = 1.2;
            
            this.scoreGainSpeedThreshold = 50;
            this.additionalMeteorThreshold = 200;
            this.meteorSpeedIncreaseThreshold = 150;

            this.playerAlive = true;
            this.playerAlreadyDead = false;
            this.playerDisappear = true;

            this.frameCounter = 0;
            this.score = 0;
            this.scoreGainSpeed = 30;
            this.gameFirstTime = true;
            this.gameOver = false;

            this.crystalSpawnDelay = Math.random() * 60 + 120;
            this.crystalFrameCounter = 0;
            this.crystalImage = document.getElementById('scoreCrystalImage');

            window.addEventListener('keydown', (event) => {
                if (event.key && event.key == 'Enter' && this.playerDisappear) {
                    this.gameStarted = true;
                    this.playerAlive = true;
                    this.playerAlreadyDead = false;
                    this.playerDisappear = false;
                    this.frameCounter = 0;
                    this.score = 0;
                    this.maxMeteors = 2;
                    this.meteorsCounter = 0;
                    this.meteors = [];
                    this.meteorSpeed = 1.2;
                    this.meteorites = [];
                    this.meteorRandomFramesDelay = Math.random() * (this.maxMeteorDelay - this.minMeteorDelay) + this.minMeteorDelay;
                    this.scoreGainSpeed = 30;
                    this.scoreCrystals = [];
                    this.scoreCrystalsCounter = 0;
                    this.maxScoreCrystalsCount = 1;
                    this.gameOver = false;
                    this.crystalCounter.pickedCrystals = 0;

                    this.playBackgroundLoop();


                    this.stopIntroMusic();
                }
              });


        }
        update() {
            //////////////    PROGRES GRY   ///////////////////// 
            if(this.playerAlive && this.gameStarted){
                this.player.update(this.input.keys);

                this.frameCounter ++;
                if(this.frameCounter >= this.scoreGainSpeed){
                    this.score ++;
                    this.frameCounter = 0;
                    if(this.score > this.scoreGainSpeedThreshold) {
                        this.scoreGainSpeed = this.scoreGainSpeed - this.scoreGainSpeed / 5;
                        this.scoreGainSpeedThreshold = this.scoreGainSpeedThreshold * 2 + this.scoreGainSpeedThreshold / 5;
                    }
                    if(this.score > this.additionalMeteorThreshold) {
                        this.maxMeteors ++;
                        this.maxScoreCrystalsCount++;
                        this.additionalMeteorThreshold = this.additionalMeteorThreshold * 2 + this.additionalMeteorThreshold / 5;
                        this.minMeteorDelay = this.minMeteorDelay - this.minMeteorDelay / 5; 
                        this.maxMeteorDelay = this.maxMeteorDelay - this.maxMeteorDelay / 5; 
                    }
                    if(this.score >this.meteorSpeedIncreaseThreshold){
                        this.meteorSpeed += 0.1;
                        this.meteorSpeedIncreaseThreshold = this.meteorSpeedIncreaseThreshold * 2 + this.meteorSpeedIncreaseThreshold / 5;
                    }

                }
            }
            //////////////////////////////////////////////////////   

            this.background.update();   

            if(this.scoreCrystalsCounter < this.maxScoreCrystalsCount){
                this.crystalFrameCounter ++;

                if(this.crystalFrameCounter >= this.crystalSpawnDelay){
                    this.crystalFrameCounter = 0;
                    this.crystalSpawnDelay = Math.random() * 30 + 90;
                    this.scoreCrystals.push(new ScoreCrystal(game)) 
                    this.scoreCrystalsCounter ++;
                }
            }

            this.scoreCrystals = this.scoreCrystals.filter((scoreCrystal) => {
                scoreCrystal.update();
                this.checkCrystalCollision(scoreCrystal);
                if(scoreCrystal.flying){
                    if(scoreCrystal.currentFlyingFrame < scoreCrystal.flyingFrames){
                        const t = scoreCrystal.currentFlyingFrame / scoreCrystal.flyingFrames;
                        scoreCrystal.x = scoreCrystal.initialX + t *((this.crystalCounter.crystalImageX + this.crystalCounter.crystalImageWidth / 3) - scoreCrystal.initialX); 
                        scoreCrystal.y = scoreCrystal.initialY + t *(this.crystalCounter.crystalImageY + this.crystalCounter.crystalImageHeight/ 3 - scoreCrystal.initialY); 
                        scoreCrystal.currentFlyingFrame++;
                    }else{
                        this.crystalCounter.pickedCrystals++;
                        this.crystalCounter.picked = true;
                        scoreCrystal.liveFramesLeft = 0;
                    }

                }
                if(scoreCrystal.liveFramesLeft > 0){             
                    return true;
                }
                this.scoreCrystalsCounter --;
                return false;
            })


            this.crystalCounter.update();
            
            if(this.meteorsCounter < this.maxMeteors){
                this.meteorFrameCounter ++;

                if(this.meteorFrameCounter >= this.meteorRandomFramesDelay){
                    this.meteorFrameCounter = 0;
                    this.meteorRandomFramesDelay = Math.random() * (this.maxMeteorDelay - this.minMeteorDelay) + this.minMeteorDelay;
                    this.meteors.push(new Meteor(this, this.meteorSpeed));
                    this.meteorsCounter ++;
                }
                
            }

            this.meteorites = this.meteorites.filter((meteorite) => {
                meteorite.update();
                return meteorite.alpha > 0;
              });

            this.meteors = this.meteors.filter((meteor) => {
                this.meteorScaleIncrease = Math.min()
                this.checkCollision(meteor);

                meteor.scale = this.convertRange(meteor.y, [ -meteor.height, this.height - meteor.height - 30 ], [ 0.5, 1 ] );
            
                if(meteor.y > this.height - meteor.height - 30){
                    this.meteorsCounter --;
                    if(meteor.playerKilled && !this.playerAlreadyDead){   
                        deathSound.play();            
                        this.meteorites.push(new Meteorite(this, meteor.x, meteor.y, true));
                        this.playerAlreadyDead = true;
                        this.playerDisappear = true;
                    }   else {
                        this.meteorites.push(new Meteorite(this, meteor.x, meteor.y, false));
                    }
                    return false;
                } 
                meteor.update();
                return true;
            });

            if(this.playerDisappear && !this.playerAlive && !this.gameOver){
                this.stopBackgroundLoop();
                this.playIntroMusic();
                this.gameOver = true;
            }


        }
        draw(context) {
            context.fillStyle = '#22224e'
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            this.background.draw(context);       
             
            this.meteorites.forEach((meteorite) => {
                meteorite.draw(context);
            })

            if(!this.playerDisappear){
                this.player.draw(context);
            }
            
            this.meteors.forEach((meteor) => {
                meteor.draw(context);
            })
            this.scoreCrystals.forEach((scoreCrystal) => {
                scoreCrystal.draw(context);
            })
            if(!this.gameStarted){
                context.globalAlpha = 0.3;
                context.fillStyle = 'black'
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.globalAlpha = 1;
                context.font = '32px gameFont';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('Meteor Mania', canvas.width / 2, canvas.height / 2);
                context.font = '14px gameFont';
                ctx.fillText('Press Enter to start', canvas.width / 2, canvas.height / 2 + 50);
            }

            if(this.gameOver){


                context.globalAlpha = 0.3;
                context.fillStyle = 'black'
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.globalAlpha = 1;
                

                
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                context.font = '14px gameFont';
                // ctx.fillText(this.score, canvas.width / 2, canvas.height / 2 - 120)
                // ctx.fillStyle = 'green';
                // ctx.fillText('+   ' + this.pickedCrystals + 'x 10' , canvas.width / 2, canvas.height / 2 - 80)
                // ctx.fillStyle = 'white';
                // ctx.fillText(this.pickedCrystals * 10 + this.score, canvas.width / 2, canvas.height / 2 - 40)
                context.font = '32px gameFont';
                ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
                context.font = '14px gameFont';
                ctx.fillText('Press Enter to start again', canvas.width / 2, canvas.height / 2 + 50);
            }



            
            ctx.textBaseline = 'alphabetic';
            ctx.font = '20px gameFont';;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'start';
            ctx.fillText('Score: ' + this.score, 20, 40);
            if(this.gameOver){
                ctx.fillStyle = '#00f08c';
                ctx.fillText('Crystals: ' + this.crystalCounter.pickedCrystals + ' x 10', 20, 75);
                ctx.strokeStyle = 'white';
                ctx.beginPath();
                ctx.moveTo(10,85);
                ctx.lineTo(450,85);
                ctx.stroke();
                ctx.fillStyle = 'white';
                ctx.fillText('Final score: ' + (this.score + this.crystalCounter.pickedCrystals * 10), 20, 115);
            }
            ctx.textAlign = 'end';
            this.crystalCounter.draw(context);
            

        }


        checkCollision(meteor) {
            if(this.player.y < meteor.y + meteor.height - 30){
                if((this.player.x + this.player.width - this.player.width / 2 > meteor.x)
                    && this.player.x  + this.player.width / 2 < meteor.x + meteor.width){
                    this.playerAlive = false;
                    this.gameFirstTime = false;
                    meteor.playerKilled = true;
                    this.player.footstepsSound.pause();
                    this.maxMeteors = 0;
                    this.maxScoreCrystalsCount = 0;
                    return true;
                } else{
                    return false;
                }
            }
            
        }

        checkCrystalCollision(scoreCrystal){
            if((this.player.x + this.player.width * 0.8 > scoreCrystal.x)
                    && this.player.x + this.player.width * 0.2 < scoreCrystal.x + scoreCrystal.width){
                    if(!scoreCrystal.flying){
                        scoreCrystal.flying = true;
                    }
                } else{
                    return false;
                }
        }

        convertRange( value, r1, r2 ) { 
            return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
        }

        playIntroMusic(){
            introMusic.currentTime = 0;
            introMusic.play();
        }

        stopIntroMusic(){
            introMusic.pause();
        }

        playBackgroundLoop(){
            bgMusic.currentTime = 0;
            bgMusic.play();
        }

        stopBackgroundLoop(){
            bgMusic.pause();
        }

        
        

    }

    const game = new Game(canvas.width, canvas.height);

    

    function animate() {
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
    
})})