import { keys } from "./util/keys.js";
import { Vector } from "./util/Vector.js";

export class Level {
    constructor(name, entities) {
        this.name = name;
        this.entities = entities;
        this.keys = keys.init()
        this.tick = 0
        this.gameSpeed = 1000 / 30
        this.gravity = new Vector(-0.1, 0.4)
            // this.gravity = new Vector(0, 0.1)

    }

    init() {
        document.getElementById("title").innerHTML = this.name

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
        this.buildLvl()
    }

    buildLvl() {
        var game = document.getElementById("game")
        var context = game.getContext("2d")
        context.fillStyle = "#FF0000";
        context.clearRect(0, 0, game.width, game.height);
        this.entities.forEach(element => {
            context.fillRect(element.pos.x, element.pos.y, element.size.x, element.size.y);
        });
    }
}