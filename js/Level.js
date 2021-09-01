import { keys } from "./util/keys.js";
import { Vector } from "./util/Vector.js";

export class Level {
    constructor(name, entities) {
        this.name = name;
        this.entities = entities;
        this.keys = keys.init()
        this.tick = 0
        this.score = 0
        this.health
        this.time = 300
        this.offset = new Vector(0, 0)
        this.gameSpeed = 1000 / 60
            // this.gravity = new Vector(0.5, 0.4)
        this.gravity = new Vector(0, 0.9)
    }
    init() {
        this.entities.forEach(element => {
            element.onCreate(this)
        });
        setInterval(() => this.gameTick(), this.gameSpeed);
    }
    gameTick() {
        this.tick++;
        this.entities.forEach(element => {
            element.onStart(this)
        });
        this.entities.forEach(element => {
            element.onTick(this)
        });
        this.entities.forEach(element => {
            element.onStop(this)
        });
        if (this.tick % 60 == 0)
            this.time--;
        //if (this.time <= 0 || Player hearts <= 0 )
        //Player entity flag game LOST -> close level (endscreen)
        this.buildLvl()
    }
    buildLvl() {
        var game = document.getElementById("game")
        var context = game.getContext("2d")
        context.fillStyle = "#FF0000";
        context.clearRect(0, 0, game.width, game.height);
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
        var img = document.getElementById("mario")
        context.drawImage(img, 5, 5);
    }
}