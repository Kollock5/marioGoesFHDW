import { keys } from "./keys.js";

export class Level {
    constructor(name, Entities) {
        this.name = name;
        this.Entities = Entities;
        this.keys = keys.init()
        this.gameSpeed = 10
    }

    init() {
        document.getElementById("title").innerHTML = this.name

        setInterval(() => this.gameTick(), this.gameSpeed);
    }

    gameTick() {
        this.Entities.forEach(element => {
            element.onTick(1)
        });
        this.buildLvl()
    }

    buildLvl() {
        var game = document.getElementById("game")
        while (game.hasChildNodes()) {
            game.removeChild(game.firstChild);
        }

        this.Entities.forEach(element => {
            game.appendChild(element.createHtml())
        });
    }
}