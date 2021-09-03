import { levelEditor } from "./levelEditor.js";
import { keys } from "./util/keys.js";
import { Vector } from "./util/Vector.js";

export class Level {
    constructor(name, entities) {
        this.active = true
        this.name = name;
        this.entities = entities;
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
        this.init()
        this.winTicks = 0
    }

    init() {
        this.entities.forEach(element => {
            element.onCreate(this)
        });
        this.backgroundEntities.forEach(element => {
            this.entities.splice(this.entities.indexOf(element), 1)
        })
        this.interval = setInterval(() => this.gameTick(), this.gameSpeed);
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
        if (this.tick % 60 == 0 && !this.gameWon)
            this.time--;

        if (this.health > 3)
            this.health = 3;

        if (this.health <= 0 && this.time > 0)
            this.time = 0

        if (this.time < -3 || this.winTicks >= 180) {
            this.active = false
            this.gameWon = false
            clearInterval(this.interval)
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
        var scoreTxt = "SCORE: " + this.score
        var timeTxt = "TIME: " + this.time

        context.fillText(scoreTxt, game.width - 100, 30, 120)
        context.fillText(timeTxt, game.width - 100, 60, 120)

        var image = new Image()
        image.src = "../res/energy_drink.png"
        switch (this.health) {
            case 1:
                context.drawImage(image, 80, 10, 40, 40)
                break
            case 2:
                context.drawImage(image, 80, 10, 40, 40)
                context.drawImage(image, 130, 10, 40, 40)
                break
            case 3:
                context.drawImage(image, 80, 10, 40, 40)
                context.drawImage(image, 130, 10, 40, 40)
                context.drawImage(image, 180, 10, 40, 40)
                break
        }

        image.src = "../res/player_head.png"
        context.drawImage(image, 6, 6, 48, 48)
        context.fillStyle = "#FFFFFF"
        context.moveTo(5, 5);
        context.lineTo(55, 5);
        context.lineTo(55, 55);
        context.lineTo(5, 55);
        context.lineTo(5, 5);
        context.stroke();

        //gameover
        if (this.time <= 0 || this.health <= 0) {
            context.fillStyle = "#000000"
            context.fillRect(0, 0, game.width, game.height)
            context.fillStyle = "#F0F0FF"
            context.font = "92px Tahoma"
            context.textAlign = "center"
            context.fillText("GAME OVER", game.width / 2, game.height / 2);
        } else if (this.gameWon) {
            context.fillStyle = "#F0F0FF"
            context.font = "92px Tahoma"
            context.textAlign = "center"
            context.fillText("GAME CLEAR", game.width / 2, game.height / 2);
            context.font = "60px Tahoma"
            scoreTxt = "SCORE:" + (this.time + this.score)
            context.fillText(scoreTxt, game.width / 2, game.height / 2 + 100);

            this.winTicks++
        }
    }
}