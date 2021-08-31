import { Level } from "./Level.js";
import { levelEditor } from "./levelEditor.js";
import { dev1 } from "../level/dev1.js"
import { jsonConverter } from "./util/jsonConverter.js";


function main() {
    //use full screen
    resizeWindow()
    window.addEventListener('resize', resizeWindow);

    let lvlEditor = false

    if (lvlEditor) {
        new levelEditor()
    } else {
        new Level(
            'Hello',
            jsonConverter.fromJson(dev1)
        ).init()
    }
}

function resizeWindow() {
    var game = document.getElementById("game")
    var context = game.getContext("2d")
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
}

main()