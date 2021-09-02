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
        this.health = 3
        this.time = 22
        this.offset = new Vector(0, 0)
        this.gameSpeed = 1000 / 60
            // this.gravity = new Vector(0.5, 0.4)
        this.gravity = new Vector(0, 0.9)

        this.init()
    }

    init() {
        this.entities.forEach(element => {
            element.onCreate(this)
        });
        this.backgroundEntities.forEach(element => {
            this.entities.splice(this.entities.indexOf(element), 1)
        })
        setInterval(() => this.gameTick(), this.gameSpeed);
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



        this.buildLvl();
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


        // context.fillText(player.pos, game.width - 450, 20, 120);

        context.strokeText(scoreTxt, game.width - 150, 20, 120);
        context.strokeText(timeTxt, game.width - 150, 40, 120);

        if (this.time <= 0 || this.health <= 0) {
            if (this.time < -3) {
                context.fillStyle = "#FFFFFF";
                context.fillRect(0, 0, game.width, game.height);
            } else {
                context.fillStyle = "#F0F0FF";
                context.font = "92px Tahoma";
                context.textAlign = "center";
                context.fillText("GAME OVER", game.width / 2, game.height / 2);
            }


            return;
        }
    }
}