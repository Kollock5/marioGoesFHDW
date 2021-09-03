import { Mario } from "./entities/Mario.js";
import { StoneBlock } from "./entities/StoneBlock.js";
import { Vector } from "./util/Vector.js";
import { collisionDetection } from "./util/collisionDetection.js";
import { Entity } from "./Entity.js";
import { jsonConverter } from "./util/jsonConverter.js";
import { keys } from "./util/keys.js";
import { Flag } from "./entities/Flag.js";
import { DirtBlock } from "./entities/DirtBlock.js";
import { GrassBlock } from "./entities/GrassBlock.js";
import { RockBlock } from "./entities/RockBlock.js";
import { Slime } from "./entities/Slime.js";
import { Turtle } from "./entities/Turtle.js";
import { Canon } from "./entities/Canon.js";
import { Monkey } from "./entities/Monkey.js";
import { Coin } from "./entities/Coin.js";
import { EnergyDrink } from "./entities/EnergyDrink.js";
import { Tree } from "./entities/Tree.js";
import { Bush } from "./entities/Bush.js";
import { FlowerBlue } from "./entities/FlowerBlue.js";
import { FlowerRed } from "./entities/FlowerRed.js";
import { Rock } from "./entities/Rock.js";
import { Button } from "./util/Button.js";
import { IconButton } from "./util/IconButton.js";

const GRID_SIZE = 32
var loadMenuOpen = false
var saveMenuOpen = false
var lvlEditorEntities = []


export class levelEditor {
    constructor() {
        this.active = true
        this.mouse = new Vector(0, 0)
        this.blueprints = [Mario(), StoneBlock(), DirtBlock(), GrassBlock(), RockBlock(), Slime(), Turtle(), Monkey(), Canon(), Coin(), EnergyDrink(), Flag(), Tree(), Bush(), FlowerBlue(), FlowerRed(), Rock()]
        this.activeEntity = null
        this.offset = new Vector(0, 0)
        this.inputText = document.getElementById('lvlJson')
        this.game = document.getElementById("game")
        this.blueprintsSelectionSize = 240
        this.interval
        this.interval = setInterval(() => this.gameTick(), 1000 / 60);
        this.loadButton = new IconButton("./res/load.png", function() {
            saveMenuOpen = false
            loadMenuOpen = true
        })
        this.saveButton = new IconButton("./res/save.png", function() {
            loadMenuOpen = false
            saveMenuOpen = true
        })
        this.loadMenu = [
            new Button(new Vector(0, 0),
                "Load Custom 1",
                function() {
                    let lvl = localStorage.getItem('marioGoesFHDW1')
                    if (lvl != null) {
                        lvlEditorEntities = jsonConverter.fromJson(lvl)
                    }
                    loadMenuOpen = false
                }),
            new Button(new Vector(0, 0),
                "Load Custom 2",
                function() {
                    let lvl = localStorage.getItem('marioGoesFHDW2')
                    if (lvl != null) {
                        lvlEditorEntities = jsonConverter.fromJson(lvl)
                    }
                    loadMenuOpen = false
                }),
            new Button(new Vector(0, 0),
                "Load Custom 3",
                function() {
                    let lvl = localStorage.getItem('marioGoesFHDW3')
                    if (lvl != null) {
                        lvlEditorEntities = jsonConverter.fromJson(lvl)
                    }
                    loadMenuOpen = false
                }),
            new Button(new Vector(0, 0),
                "Load Custom 4",
                function() {
                    let lvl = localStorage.getItem('marioGoesFHDW4')
                    if (lvl != null) {
                        lvlEditorEntities = jsonConverter.fromJson(lvl)
                    }
                    loadMenuOpen = false
                }),
            new Button(
                new Vector(250, 5),
                "Import Json",
                function() {
                    let input = window.prompt("Load Level from Json", "place Json here");
                    try {
                        lvlEditorEntities = jsonConverter.fromJson(input)
                    } catch (error) {}
                    loadMenuOpen = false
                }),
            new Button(
                new Vector(250, 5),
                "Exit",
                function() {
                    loadMenuOpen = false
                    saveMenuOpen = false
                })
        ]
        this.saveMenu = [
            new Button(new Vector(0, 0),
                "Save Custom 1",
                function() {
                    console.log('hello world ddd')
                    localStorage.setItem('marioGoesFHDW1', jsonConverter.toJson(lvlEditorEntities));
                    saveMenuOpen = false
                }),
            new Button(new Vector(0, 0),
                "Save Custom 2",
                function() {
                    localStorage.setItem('marioGoesFHDW2', jsonConverter.toJson(lvlEditorEntities));
                    saveMenuOpen = false
                }),
            new Button(new Vector(0, 0),
                "Save Custom 3",
                function() {
                    localStorage.setItem('marioGoesFHDW3', jsonConverter.toJson(lvlEditorEntities));
                    saveMenuOpen = false
                }),
            new Button(new Vector(0, 0),
                "Save Custom 4",
                function() {
                    localStorage.setItem('marioGoesFHDW4', jsonConverter.toJson(lvlEditorEntities));
                    saveMenuOpen = false
                }),
            this.copyButton = new Button(
                new Vector(400, 5),
                "Copy Json to CB",
                function() {
                    var copyText = document.getElementById("lvlJson")
                    copyText.select()
                    copyText.setSelectionRange(0, 100000000)
                    document.execCommand("copy")
                    saveMenuOpen = false
                }),
            new Button(
                new Vector(250, 5),
                "Exit",
                function() {
                    loadMenuOpen = false
                    saveMenuOpen = false
                })

        ]

        this.placeButtons()
        this.mouseListeners()


        this.keys = keys
        this.keys.init()
    }

    placeButtons() {
        this.posY = GRID_SIZE
        this.xOffset = GRID_SIZE / 2
        this.maxWidth = 32
        this.blueprints.forEach(item => {
            this.newPos = this.posY + item.size.y + GRID_SIZE
            if (this.newPos > this.game.height) {
                this.xOffset = this.xOffset + this.maxWidth + 16
                this.posY = GRID_SIZE
                this.newPos = this.posY + item.size.y + GRID_SIZE
            }
            item.pos.set(this.xOffset, this.posY);
            this.posY = this.newPos

            if (item.size.x > this.maxWidth) {
                this.maxWidth = item.size.x
            }
        });
        this.blueprintsSelectionSize = this.xOffset + this.maxWidth + 16

        this.loadMenu.forEach((button, i) => {
            button.pos = new Vector((game.width / 2) - (button.size.x / 2), game.height / 2 + (i * 60) - (this.loadMenu.length / 2 * 60))
        })

        this.saveMenu.forEach((button, i) => {
            button.pos = new Vector((game.width / 2) - (button.size.x / 2), game.height / 2 + (i * 60) - (this.saveMenu.length / 2 * 60))
        })

        this.loadButton.pos = new Vector(game.width - 48, 10)
        this.saveButton.pos = new Vector(game.width - 96, 10)

    }

    mouseListeners() {
        document.getElementById("game").addEventListener('mousemove', (event) => {
            this.mouse.set(event.clientX, event.clientY)
        });

        document.getElementById("game").addEventListener('click', (event) => {

            this.loadButton.isHit(new Vector(event.clientX, event.clientY))
            this.saveButton.isHit(new Vector(event.clientX, event.clientY))

            if (loadMenuOpen == true) {
                this.loadMenu.forEach(button => {
                    button.isHit(new Vector(event.clientX, event.clientY))
                });
            }

            if (saveMenuOpen == true) {
                this.saveMenu.forEach(button => {
                    button.isHit(new Vector(event.clientX, event.clientY))
                });
            }

            //if no entity is selected try to find a new one
            if (this.activeEntity == null) {

                //check for click on blueprint
                this.collision = collisionDetection.nearestCollision(new Entity(new Vector(event.clientX, event.clientY), new Vector(0, 0)), this.blueprints)
                if (this.collision != null) {
                    this.activeEntity = this.collision.entity.clone()
                    lvlEditorEntities.push(this.activeEntity)
                }

                //check for click on game element
                this.collision = collisionDetection.nearestCollision(new Entity(new Vector(event.clientX - this.offset.x, event.clientY - this.offset.y), new Vector(0, 0)), lvlEditorEntities)
                if (this.collision != null) {
                    this.activeEntity = this.collision.entity
                    if (keys.alt == true) {
                        lvlEditorEntities.splice(lvlEditorEntities.indexOf(this.activeEntity), 1)
                        this.activeEntity = null
                    }
                }

            } else {
                //delete active entity if ctrl is pressed
                if (keys.alt == true) {
                    lvlEditorEntities.splice(lvlEditorEntities.indexOf(this.activeEntity), 1)
                    this.activeEntity = null
                }
                //try placing active entity
                else {
                    if (this.mouse.x > this.blueprintsSelectionSize) {
                        this.collision = collisionDetection.allCollision(this.activeEntity, lvlEditorEntities)
                        if (this.collision.length < 1) {
                            if (keys.shift == true) {
                                lvlEditorEntities.push(this.activeEntity.clone())
                            } else {
                                this.activeEntity = null
                            }
                        }
                    }
                }
            }
            this.setInputJson()
        });
    }
    setInputJson() {
        this.inputText.value = jsonConverter.toJson(lvlEditorEntities)
    }

    gameTick() {
        this.tick++;
        this.moveOverMouse()
        this.keyboard()
        this.buildLvl()
    }

    keyboard() {
        if (keys.left == true) {
            this.offset.add(new Vector(32, 0))
        }
        if (keys.right == true) {
            this.offset.add(new Vector(-32, 0))
        }
        if (keys.up == true) {
            this.offset.add(new Vector(0, 32))
        }
        if (keys.down == true) {
            this.offset.add(new Vector(0, -32))
        }
        if (keys.esc == true) {
            this.active = false
            clearInterval(this.interval)
        }
    }

    moveOverMouse() {
        if (this.activeEntity != null) {
            this.activeEntity.pos.set((Math.floor((this.mouse.x) / GRID_SIZE) * GRID_SIZE) - this.offset.x, (Math.floor((this.mouse.y) / GRID_SIZE) * GRID_SIZE) - this.offset.y)
        }
    }

    buildLvl() {
        var context = this.game.getContext("2d")
        context.clearRect(0, 0, this.game.width, this.game.height);
        context.fillStyle = "#FF0000";

        lvlEditorEntities.forEach(element => {
            element.draw(context, this.offset)
        });

        for (let i = 0; i < 80; i++) {
            context.fillRect(this.blueprintsSelectionSize + (GRID_SIZE * i) + (this.blueprintsSelectionSize % GRID_SIZE), 1, 1, 3000)
        }

        for (let i = 0; i < 45; i++) {
            context.fillRect(this.blueprintsSelectionSize + 1, (GRID_SIZE * i), 3000, 1)
        }

        if (this.activeEntity != null) {
            this.activeEntity.draw(context, this.offset)
        }

        context.fillStyle = "#00FF00";
        context.fillRect(0, 0, this.blueprintsSelectionSize, this.game.height);
        this.blueprints.forEach(element => {
            element.draw(context)
        });
        this.loadButton.draw(context)
        this.saveButton.draw(context)

        if (loadMenuOpen) {
            this.loadMenu.forEach(button => {
                button.draw(context)
            })
        }

        if (saveMenuOpen) {
            this.saveMenu.forEach(button => {
                button.draw(context)
            })
        }
    }
}