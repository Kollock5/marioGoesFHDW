import { Level } from "./Level.js";
import { levelEditor } from "./levelEditor.js";
import { dev1 } from "../level/dev1.js"
import { dev2 } from "../level/dev2.js"
import { dev3 } from "../level/dev3.js"

import { jsonConverter } from "./util/jsonConverter.js";
import { Button } from "./util/Button.js";
import { Vector } from "./util/Vector.js";

var activeLvl = null

var buttons = [new Button(new Vector(1920 / 2 - 250, 1080 / 2),
        "World 1-1",
        function() {
            activeLvl = new Level('World 1-1', jsonConverter.fromJson(dev1))
        }),
    new Button(new Vector(1920 / 2 - 86, 1080 / 2),
        "World 1-2",
        function() {
            activeLvl = new Level('World 1-2', jsonConverter.fromJson(dev2))
        }),
    new Button(new Vector(1920 / 2 + 86, 1080 / 2),
        "World 1-3",
        function() {
            activeLvl = new Level('World 1-3', jsonConverter.fromJson(dev3))
        }),
    new Button(new Vector(1920 / 2 + 250, 1080 / 2),
        "Level Editor",
        function() {
            activeLvl = new levelEditor()
        }),
]

function main() {
    //use full screen
    resizeWindow()
    window.addEventListener('resize', resizeWindow);

    document.getElementById("game").addEventListener('click', (event) => {
        if (activeLvl == null) {
            buttons.forEach(button => {
                button.isHit(new Vector(event.clientX, event.clientY))
            });
        }
    })
    setInterval(() => menuTick(), 1000 / 60);

}

function menuTick() {
    if (activeLvl == null) {
        var game = document.getElementById("game")
        var context = game.getContext("2d")
        var image = new Image()
        image.src = "../res/background2.png"
        context.drawImage(image, 0, 0, game.width, game.height)
        buttons.forEach(button => {
            button.draw(context)
        });
    } else {
        if (activeLvl.active == false) {
            activeLvl = null
        }
    }
}

function resizeWindow() {
    var game = document.getElementById("game")
    var context = game.getContext("2d")
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
}

main()