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

const SELECTION_SIZE = 128
const GRID_SIZE = 32

export class levelEditor {
    constructor() {
        this.mouse = new Vector(0, 0)
        this.blueprints = [Mario(new Vector(0, 0)), StoneBlock(new Vector(0, 0)), DirtBlock(new Vector(0, 0)), GrassBlock(new Vector(0, 0)), RockBlock(new Vector(0, 0)), Flag(new Vector(0, 0))]
        this.entities = []
        this.activeEntity = null
        this.posY = GRID_SIZE
        this.offset = new Vector(0, 0)
        this.inputText = document.getElementById('lvlJson')

        this.blueprints.forEach(item => {
            item.pos.set((SELECTION_SIZE - item.size.x) / 2, this.posY);
            this.posY = this.posY + item.size.y + GRID_SIZE
        });

        this.mouseListeners()
        setInterval(() => this.gameTick(), 1000 / 60);

        this.keys = keys
        this.keys.init()
    }

    mouseListeners() {
        document.getElementById("game").addEventListener('mousemove', (event) => {
            this.mouse.set(event.clientX, event.clientY)
        });

        document.getElementById("game").addEventListener('click', (event) => {
            //if no entity is selected try to find a new one
            if (this.activeEntity == null) {

                //check for click on blueprint
                this.collision = collisionDetection.nearestCollision(new Entity(new Vector(event.clientX, event.clientY), new Vector(0, 0)), this.blueprints)
                if (this.collision != null) {
                    this.activeEntity = this.collision.entity.clone()
                    this.entities.push(this.activeEntity)
                }

                //check for click on game element
                this.collision = collisionDetection.nearestCollision(new Entity(new Vector(event.clientX - this.offset.x, event.clientY - this.offset.y), new Vector(0, 0)), this.entities)
                if (this.collision != null) {
                    this.activeEntity = this.collision.entity
                    if (keys.alt == true) {
                        this.entities.splice(this.entities.indexOf(this.activeEntity), 1)
                        this.activeEntity = null
                    }
                }

            } else {
                //delete active entity if ctrl is pressed
                if (keys.alt == true) {
                    this.entities.splice(this.entities.indexOf(this.activeEntity), 1)
                    this.activeEntity = null
                }
                //try placing active entity
                else {
                    if (this.mouse.x > SELECTION_SIZE) {
                        this.collision = collisionDetection.allCollision(this.activeEntity, this.entities)
                        if (this.collision.length < 1) {
                            if (keys.shift == true) {
                                this.entities.push(this.activeEntity.clone())
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

        this.inputText.value = jsonConverter.toJson(this.entities)
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
    }

    moveOverMouse() {
        if (this.activeEntity != null) {
            this.activeEntity.pos.set((Math.floor((this.mouse.x) / GRID_SIZE) * GRID_SIZE) - this.offset.x, (Math.floor((this.mouse.y) / GRID_SIZE) * GRID_SIZE) - this.offset.y)
        }
    }

    buildLvl() {
        var game = document.getElementById("game")
        var context = game.getContext("2d")
        context.clearRect(0, 0, game.width, game.height);
        context.fillStyle = "#FF0000";

        this.entities.forEach(element => {
            element.draw(context, this.offset)
        });

        for (let i = 0; i < 60; i++) {
            context.fillRect(SELECTION_SIZE + (GRID_SIZE * i), 1, 1, 2000)
        }

        for (let i = 0; i < 35; i++) {
            context.fillRect(SELECTION_SIZE + 1, (GRID_SIZE * i), 2000, 1)
        }

        if (this.activeEntity != null) {
            this.activeEntity.draw(context, this.offset)
        }

        context.fillStyle = "#00FF00";
        context.fillRect(0, 0, SELECTION_SIZE, game.height);
        this.blueprints.forEach(element => {
            element.draw(context)
        });
    }
}