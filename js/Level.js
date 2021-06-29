import { keys } from "./util/keys.js";

export class Level {
    constructor(name, entities) {
        this.name = name;
        this.entities = entities;
        this.keys = keys.init()
        this.tick = 0
        this.gameSpeed = 1000 / 30
        this.gravity = 1
    }

    init() {
        document.getElementById("title").innerHTML = this.name

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
        this.buildLvl()
    }

    buildLvl() {
        var game = document.getElementById("game")
        while (game.hasChildNodes()) {
            game.removeChild(game.firstChild);
        }

        this.entities.forEach(element => {
            game.appendChild(element.createHtml())
        });
    }
}