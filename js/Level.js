import { levelEditor } from "./levelEditor.js";
import { keys } from "./util/keys.js";
import { Vector } from "./util/Vector.js";

export class Level {
    constructor(name, entities, highScore, bestTime) {
        this.active = true
        this.name = name;
        this.entities = entities;
        this.highScore = highScore
        this.bestTime = bestTime
        this.backgroundEntities = []
        this.keys = keys.init()
        this.tick = 0
        this.score = 0
        this.health = 2
        this.time = 60
        this.offset = new Vector(0, 0)
        this.gameSpeed = 1000 / 60
        this.gravity = new Vector(0, 0.9)
        this.interval = 0
        this.gameWon = false
        this.gameLost = false
        this.endSoundPlayed = false
        this.delay = 200

        this.init()
    }

    init() {
        this.entities.forEach(element => {
            element.onCreate(this)
        });
        this.backgroundEntities.forEach(element => {
            this.entities.splice(this.entities.indexOf(element), 1)
        })
        this.interval = setInterval(() => this.gameTick(), this.gameSpeed);

        this.audio = new Audio('./sfx/theme.wav')
        this.audio.volume = 0.3
        this.audio.play()
        this.audio.loop = true
    }

    gameTick() {
        this.tick++;
        this.entities.forEach(element => {
            element.onStart(this)
        });
        this.backgroundEntities.forEach(element => {
            element.onStart(this)
        });
        this.entities.forEach(element => {
            element.onTick(this)
        });
        this.backgroundEntities.forEach(element => {
            element.onTick(this)
        });
        this.entities.forEach(element => {
            element.onStop(this)
        });
        if (this.tick % 60 == 0 && !(this.gameLost || this.gameWon))
            this.time--;

        if (this.health > 3)
            this.health = 3;

        if (this.health <= 0 || this.time <= 0) {
            this.gameLost = true
        }

        if (this.gameWon || this.gameLost) {
            this.delay = this.delay - 1
            if (this.delay < 0) {
                this.active = false
                clearInterval(this.interval)
                this.audio.pause()
            }
        }

        if (this.gameWon && !this.endSoundPlayed) {
            this.endSoundPlayed = true
            this.audioWon = new Audio('./sfx/win.wav')
            this.audio.pause()
            this.audioWon.play()

            if (this.time > this.bestTime) {
                localStorage.setItem(`marioGoesFHDW_time_${this.name}`, this.time);
            }
            if (this.score > this.highScore) {
                localStorage.setItem(`marioGoesFHDW_score_${this.name}`, this.score);
            }
        }

        if (this.gameLost && !this.endSoundPlayed) {
            this.endSoundPlayed = true
            this.audioLost = new Audio('./sfx/die.wav')
            this.audio.pause()

            this.audioLost.play()
        }

        this.backgroundEntities.forEach(element => {
            element.onStop(this)
        });
        this.buildLvl()
    }

    buildLvl() {
        var game = document.getElementById("game")
        var context = game.getContext("2d")
        context.fillStyle = "#FF0000";
        context.clearRect(0, 0, game.width, game.height);
        var image = new Image()
        image.src = "../res/background.png"
        context.drawImage(image, 0, 0, game.width, game.height)
        this.backgroundEntities.forEach(element => {
            element.draw(context, this.offset)
        });
        this.entities.forEach(element => {
            element.draw(context, this.offset)
        });
        this.drawOverlay(game, context);
    }

    drawOverlay(game, context) {
        //avatar life
        context.fillStyle = "#FFFFFF"
        context.font = "18px Tahoma"
        var scoreTxt = this.score
        var timeTxt = this.time

        var coinImg = new Image()
        coinImg.src = "../res/coin.png"
        context.drawImage(coinImg, game.width - 35, 10, 24, 24)
        context.fillText(scoreTxt, game.width - 40, 30, 120)

        var clockImg = new Image()
        clockImg.src = "../res/clock.png"
        context.drawImage(clockImg, game.width - 35, 40, 24, 24)
        context.fillText(timeTxt, game.width - 40, 60, 120)

        var hearthImg = new Image()
        hearthImg.src = "../res/hearth.png"
        switch (this.health) {
            case 1:
                context.drawImage(hearthImg, 80, 10, 40, 40)
                break
            case 2:
                context.drawImage(hearthImg, 80, 10, 40, 40)
                context.drawImage(hearthImg, 130, 10, 40, 40)
                break
            case 3:
                context.drawImage(hearthImg, 80, 10, 40, 40)
                context.drawImage(hearthImg, 130, 10, 40, 40)
                context.drawImage(hearthImg, 180, 10, 40, 40)
                break
        }

        var image4 = new Image()
        image4.src = "../res/player_head.png"
        context.drawImage(image4, 6, 6, 48, 48)
        context.fillStyle = "#FFFFFF"
        context.moveTo(5, 5);
        context.lineTo(55, 5);
        context.lineTo(55, 55);
        context.lineTo(5, 55);
        context.lineTo(5, 5);
        context.stroke();

        //gameover
        if (this.gameLost) {
            context.fillStyle = "#000000"
            context.fillRect(0, 0, game.width, game.height)
            context.fillStyle = "#F0F0FF"
            context.font = "92px Tahoma"
            context.textAlign = "center"
            context.fillText("GAME OVER", game.width / 2, game.height / 2)
        } else if (this.gameWon) {
            context.fillStyle = "#F0F0FF"
            context.font = "92px Tahoma"
            context.textAlign = "center"
            context.fillText("GAME CLEAR", game.width / 2, game.height / 2)
            context.font = "60px Tahoma"
            scoreTxt = "SCORE: " + (this.score * 10 + this.time + this.health * 50)
            context.fillText(scoreTxt, game.width / 2, game.height / 2 + 100)
        }
    }
}