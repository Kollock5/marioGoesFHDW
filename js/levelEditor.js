import { Mario } from "./entities/Mario.js";
import { StoneBlock } from "./entities/StoneBlock.js";
import { Vector } from "./util/Vector.js";
import { collisionDetection } from "./util/collisionDetection.js";
import { Entity } from "./Entity.js";
import { jsonConverter } from "./util/jsonConverter.js";

const SELECTION_SIZE = 128
const GRID_SIZE = 32

export class levelEditor {
    constructor() {
        this.mouse = new Vector(0, 0)
        this.blueprints = [Mario(new Vector(0, 0)), StoneBlock(new Vector(0, 0)), StoneBlock(new Vector(0, 0))]
        this.entities = []
        this.activeEntity = null
        this.posY = GRID_SIZE
        this.offset = new Vector(0, 0)

        this.blueprints.forEach(item => {
            item.pos.set((SELECTION_SIZE - item.size.x) / 2, this.posY);
            this.posY = this.posY + item.size.y + GRID_SIZE
        });

        this.mouseListeners()
        setInterval(() => this.gameTick(), 1000 / 60);
    }

    mouseListeners() {
        document.getElementById("game").addEventListener('mousemove', (event) => {
            this.mouse.set(event.clientX, event.clientY)
        });

        document.getElementById("game").addEventListener('click', (event) => {
            if (this.activeEntity == null) {
                this.collision = collisionDetection.nearestCollision(new Entity(new Vector(event.clientX, event.clientY), new Vector(0, 0)), this.blueprints)
                if (this.collision != null) {
                    this.activeEntity = this.collision.entity.clone()
                    this.entities.push(this.activeEntity)
                }
                this.collision = collisionDetection.nearestCollision(new Entity(new Vector(event.clientX, event.clientY), new Vector(0, 0)), this.entities)
                if (this.collision != null) {
                    this.activeEntity = this.collision.entity
                }
            } else {
                if (this.mouse.x > SELECTION_SIZE) {
                    this.collision = collisionDetection.allCollision(this.activeEntity, this.entities)
                    if (this.collision.length < 1) {
                        this.activeEntity = null
                    }
                }
            }
            console.log(jsonConverter.toJson(this.entities))
        });
    }

    gameTick() {
        this.tick++;
        this.moveOverMouse()
        this.buildLvl()
    }

    moveOverMouse() {
        if (this.activeEntity != null) {
            this.activeEntity.pos.set((Math.floor((this.mouse.x) / GRID_SIZE) * GRID_SIZE), (Math.floor((this.mouse.y) / GRID_SIZE) * GRID_SIZE))
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
            element.draw(context, this.offset)
        });
    }
}