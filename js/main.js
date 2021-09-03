import { Level } from "./Level.js";
import { levelEditor } from "./levelEditor.js";
import { jsonConverter } from "./util/jsonConverter.js";
import { Vector } from "./util/Vector.js";
import { IconButton } from "./util/IconButton.js";
import { LvlButton } from "./util/LvlButton.js";
import { Help } from "./util/Help.js";
import { lvl1_1 } from "../level/lvl1-1.js";
import { lvl1_2 } from "../level/lvl1-2.js";
import { lvl1_3 } from "../level/lvl1-3.js";
import { lvl1_4 } from "../level/lvl1-4.js";
import { lvl2_1 } from "../level/lvl2-1.js";

var activeLvl = null

var lvlButtons = []
var customLvl = [
    { name: "Custom 1", data: 'marioGoesFHDW1' },
    { name: "Custom 2", data: 'marioGoesFHDW2' },
    { name: "Custom 3", data: 'marioGoesFHDW3' },
    { name: "Custom 4", data: 'marioGoesFHDW4' }
]
var preMadeLvl = [
    { name: "World 1-1", data: lvl1_1 },
    { name: "World 1-2", data: lvl1_2 },
    { name: "World 1-3", data: lvl1_3 },
    { name: "World 1-4", data: lvl1_4 },
    { name: "World 2-1", data: lvl2_1 },
]

var lvlEditorButton = new IconButton("./res/button_editor.png",
    function() {
        activeLvl = new levelEditor()
    })

var helpOpen = false
var helpButton = new IconButton("./res/help.png",
    function() {
        helpOpen = true
    })
var manualWindow = new Help(function() { helpOpen = false })

function main() {
    reloadLvlButtons()
    resizeWindow()
    window.addEventListener('resize', resizeWindow);

    document.getElementById("game").addEventListener('click', (event) => {
        if (activeLvl == null) {
            if (helpOpen) {
                manualWindow.isHit(new Vector(event.clientX, event.clientY))
            } else {
                lvlButtons.forEach(button => {
                    button.isHit(new Vector(event.clientX, event.clientY))
                });
                lvlEditorButton.isHit(new Vector(event.clientX, event.clientY))
                helpButton.isHit(new Vector(event.clientX, event.clientY))
            }
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
        lvlButtons.forEach(button => {
            button.draw(context)
        });
        lvlEditorButton.draw(context)
        helpButton.draw(context)
        if (helpOpen) {
            manualWindow.draw(context)
        }
    } else {
        if (activeLvl.active == false) {
            activeLvl = null
            reloadLvlButtons()
            resizeWindow()
        }
    }
}

function resizeWindow() {
    var game = document.getElementById("game")
    var context = game.getContext("2d")
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    lvlButtons.forEach((button, i) => {
        button.pos = new Vector((game.width / 2) - (button.size.x / 2) + (-250 + (i % 4) * 165), game.height / 2 + (Math.floor(i / 4) * 80))
    })
    lvlEditorButton.pos = new Vector((game.width / 2) + 330, game.height / 2)
    helpButton.pos = new Vector((game.width / 2) - 330 - 32, game.height / 2)
}


function reloadLvlButtons(params) {
    lvlButtons = []
    customLvl.forEach(lvl => {
        let data = localStorage.getItem(lvl.data)
        if (data != null) {
            let score = 0
            let time = 0
            let lvlScore = localStorage.getItem(`marioGoesFHDW_score_${lvl.name}`)
            if (lvlScore != null) {
                score = lvlScore
            }
            let lvlTime = localStorage.getItem(`marioGoesFHDW_time_${lvl.name}`)
            if (lvlTime != null) {
                time = lvlTime
            }
            lvlButtons.push(
                new LvlButton(new Vector(0, 0),
                    lvl.name,
                    function() {
                        activeLvl = new Level(lvl.name, jsonConverter.fromJson(data), score, time)
                    },
                    score,
                    time),
            )
        } else {
            lvlButtons.push(
                new LvlButton(new Vector(0, 0),
                    lvl.name,
                    function() {
                        activeLvl = new levelEditor()
                    },
                    0,
                    0),
            )
        }

    });

    preMadeLvl.forEach(lvl => {
        let score = 0
        let time = 0
        let lvlScore = localStorage.getItem(`marioGoesFHDW_score_${lvl.name}`)
        if (lvlScore != null) {
            score = lvlScore
        }
        let lvlTime = localStorage.getItem(`marioGoesFHDW_time_${lvl.name}`)
        if (lvlTime != null) {
            time = lvlTime
        }
        lvlButtons.push(
            new LvlButton(new Vector(0, 0),
                lvl.name,
                function() {
                    activeLvl = new Level(lvl.name, jsonConverter.fromJson(lvl.data), score, time)
                },
                score,
                time),
        )
    });
}

main()