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
        this.time = 22
        this.offset = new Vector(0, 0)
        this.gameSpeed = 1000 / 60
        this.gravity = new Vector(0, 0.9)
        this.interval = 0
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
        if (this.tick % 60 == 0)
            this.time--;

        if (this.health > 3)
            this.health = 3;

        if (this.time < -3) {
            this.active = false;
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
        context.fillStyle = "#BEBEBE";
        context.fillRect(5, 5, 50, 50);
        context.fillStyle = "#FFFFFF";
        context.moveTo(5, 5);
        context.lineTo(55, 5);
        context.lineTo(55, 55);
        context.lineTo(5, 55);
        context.lineTo(5, 5);
        context.stroke();
        context.fillStyle = "#000000";
        context.font = "12px Tahoma";
        var scoreTxt = "Score: " + this.score;
        var timeTxt = "Time: " + this.time;

        context.strokeText(scoreTxt, game.width - 150, 20, 120);
        context.strokeText(timeTxt, game.width - 150, 40, 120);

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


        if (this.time <= 0 || this.health <= 0) {
            context.fillStyle = "#000000";
            context.fillRect(0, 0, game.width, game.height)
            context.fillStyle = "#F0F0FF";
            context.font = "92px Tahoma";
            context.textAlign = "center";
            context.fillText("GAME OVER", game.width / 2, game.height / 2);
        }
    }
}