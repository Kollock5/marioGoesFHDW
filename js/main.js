import { Level } from "./Level.js";
import { levelEditor } from "./levelEditor.js";

import { jsonConverter } from "./util/jsonConverter.js";
import { Button } from "./util/Button.js";
import { Vector } from "./util/Vector.js";
import { lvl2_1 } from "../level/lvl2-1.js";
import { IconButton } from "./util/IconButton.js";
import { lvl1_1 } from "../level/lvl1-1.js";
import { lvl1_2 } from "../level/lvl1-2.js";
import { lvl1_4 } from "../level/lvl1-4.js";
import { lvl1_3 } from "../level/lvl1-3.js";

var activeLvl = null

var buttons = [
    new Button(new Vector(0, 0),
        "Custom 1",
        function() {
            let lvl = localStorage.getItem('marioGoesFHDW1')
            if (lvl != null) {
                activeLvl = new Level('Custom 1', jsonConverter.fromJson(lvl))
            } else {
                activeLvl = new levelEditor()
            }
        }),
    new Button(new Vector(0, 0),
        "Custom 2",
        function() {
            let lvl = localStorage.getItem('marioGoesFHDW2')
            if (lvl != null) {
                activeLvl = new Level('Custom 2', jsonConverter.fromJson(lvl))
            } else {
                activeLvl = new levelEditor()
            }
        }),
    new Button(new Vector(0, 0),
        "Custom 3",
        function() {
            let lvl = localStorage.getItem('marioGoesFHDW3')
            if (lvl != null) {
                activeLvl = new Level('Custom 3', jsonConverter.fromJson(lvl))
            } else {
                activeLvl = new levelEditor()
            }
        }),
    new Button(new Vector(0, 0),
        "Custom 4",
        function() {
            let lvl = localStorage.getItem('marioGoesFHDW4')
            if (lvl != null) {
                activeLvl = new Level('Custom 4', jsonConverter.fromJson(lvl))
            } else {
                activeLvl = new levelEditor()
            }
        }),
    new Button(new Vector(0, 0),
        "World 1-1",
        function() {
            activeLvl = new Level('World 1-1', jsonConverter.fromJson(lvl1_1))
        }),
    new Button(new Vector(0, 0),
        "World 1-2",
        function() {
            activeLvl = new Level('World 1-2', jsonConverter.fromJson(lvl1_2))
        }),
    new Button(new Vector(0, 0),
        "World 1-3",
        function() {
            activeLvl = new Level('World 1-3', jsonConverter.fromJson(lvl1_3))
        }),
    new Button(new Vector(0, 0),
        "World 1-4",
        function() {
            activeLvl = new Level('World 1-4', jsonConverter.fromJson(lvl1_4))
        }),
    new Button(new Vector(0, 0),
        "World 2-1",
        function() {
            activeLvl = new Level('World 2-1', jsonConverter.fromJson(lvl2_1))
        })
]

var lvlEditorButton = new IconButton("./res/button_editor.png",
    function() {
        activeLvl = new levelEditor()
    })

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
        lvlEditorButton.isHit(new Vector(event.clientX, event.clientY))
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
        lvlEditorButton.draw(context)
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
    buttons.forEach((button, i) => {
        button.pos = new Vector((game.width / 2) - (button.size.x / 2) + (-250 + (i % 4) * 165), game.height / 2 + (Math.floor(i / 4) * 60))
    })
    lvlEditorButton.pos = new Vector((game.width / 2) + 330, game.height / 2)
}

main()