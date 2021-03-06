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
import { lvl2_2 } from "../level/lvl2-2.js";
import { lvl2_3 } from "../level/lvl2-3.js";
import { lvl2_4 } from "../level/lvl2-4.js";
import { lvl3_1 } from "../level/lvl3-1.js";
import { lvl3_2 } from "../level/lvl3-2.js";
import { lvl3_3 } from "../level/lvl3-3.js";
import { lvl3_4 } from "../level/lvl3-4.js";


var activeLvl = null
export var activeMusic = true
export var activeSound = true

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
    { name: "World 2-2", data: lvl2_2 },
    { name: "World 2-3", data: lvl2_3 },
    { name: "World 2-4", data: lvl2_4 },
    { name: "World 3-1", data: lvl3_1 },
    { name: "World 3-2", data: lvl3_2 },
    { name: "World 3-3", data: lvl3_3 },
    { name: "World 3-4", data: lvl3_4 },
]

var lvlEditorButton = new IconButton("./res/button_editor.png",
    function() {
        activeLvl = new levelEditor()
    })

var soundButton = new IconButton("./res/sound_on.png",
    function() {
        activeSound = !activeSound
        if (activeSound) {
            soundButton.image.src = "./res/sound_on.png"
        } else {
            soundButton.image.src = "./res/sound_off.png"
        }
    })

var musicButton = new IconButton("./res/music_on.png",
    function() {
        activeMusic = !activeMusic
        if (activeMusic) {
            musicButton.image.src = "./res/music_on.png"
        } else {
            musicButton.image.src = "./res/music_off.png"
        }
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
                soundButton.isHit(new Vector(event.clientX, event.clientY))
                musicButton.isHit(new Vector(event.clientX, event.clientY))
            }
        }
    })
    setInterval(() => menuTick(), 1000 / 60);
}

function menuTick() {
    if (activeLvl == null) {
        draw()
    } else {
        gameActive()
    }
}

function gameActive() {
    if (activeLvl.active == false) {
        // if lost restart
        if (activeLvl.gameLost) {
            lvlButtons.forEach((button, i) => {
                    if (i == activeLvl.id) {
                        activeLvl = null
                        button.onClick()
                    }
                })
                // if won go to next lvl
        } else if (activeLvl.gameWon && activeLvl.id > 3 && activeLvl.id < lvlButtons.length - 1) {
            lvlButtons.forEach((button, i) => {
                    if (i == (activeLvl.id + 1) && activeLvl.active == false) {
                        activeLvl = null
                        button.onClick()
                    }
                })
                // go back to menu
        } else {
            activeLvl = null
        }
        reloadLvlButtons()
        resizeWindow()
    }
}

function draw() {
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
    soundButton.draw(context)
    musicButton.draw(context)
    if (helpOpen) {
        manualWindow.draw(context)
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
    helpButton.pos = new Vector((game.width / 2) + 330, game.height / 2 + 50)
    musicButton.pos = new Vector((game.width / 2) - 330 - 32, game.height / 2)
    soundButton.pos = new Vector((game.width / 2) - 330 - 32, game.height / 2 + 50)
}


function reloadLvlButtons(params) {
    lvlButtons = []

    //build and place Custom lvl Buttons
    customLvl.forEach((lvl, i) => {
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
                        activeLvl = new Level(lvl.name, jsonConverter.fromJson(data), i, score, time)
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

    //build and place Pre build lvl Buttons
    let arrayLength = lvlButtons.length
    preMadeLvl.forEach((lvl, i) => {
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
                    activeLvl = new Level(lvl.name, jsonConverter.fromJson(lvl.data), i + arrayLength, score, time)
                },
                score,
                time),
        )
    });
}

main()