import { Level } from "./data/Level.js";
import { Entity } from "./data/Entity.js";
import { MovingEntity } from "./data/MovingEntity.js";
import { keys } from "./logic/keys.js";

function levelController() {
    var level = new Level(
        'Hello', [
            new MovingEntity({ x: 50, y: 50 }, { height: 455, width: 12 }, 50, 0.4),
            new Entity({ x: 232, y: 112 }, { height: 23, width: 56 }),
            new MovingEntity({ x: 50, y: 500 }, { height: 16, width: 500 }, 250, 2.4, MovingEntity.VERTICAL),
        ])

    keys.init()

    document.getElementById("title").innerHTML = level.name

    setInterval(
        () => {
            level.Entitys.forEach(element => {
                element.onTick(1)
            });
            buildLvl(level)
        },
        10
    );
}

function buildLvl(level) {
    var game = document.getElementById("game")
    while (game.hasChildNodes()) {
        game.removeChild(game.firstChild);
    }

    level.Entitys.forEach(element => {
        game.appendChild(element.createHtml())
    });
}

levelController()