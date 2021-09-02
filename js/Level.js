import { keys } from "./util/keys.js";
import { Vector } from "./util/Vector.js";

export class Level {
    constructor(name, entities) {
        this.name = name;
        this.gameWon = false
        this.entities = entities;
        this.backgroundEntities = []
        this.keys = keys.init()
        this.tick = 0
        this.offset = new Vector(0, 0)
        this.gameSpeed = 1000 / 60
            // this.gravity = new Vector(0.5, 0.4)
        this.gravity = new Vector(0, 0.9)
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
        // console.log(this.backgroundEntities)
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

    }
}