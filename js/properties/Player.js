import { keys } from "../util/keys.js"
import { Property } from "../Property.js"
import { Vector } from "../util/Vector.js"
import { collisionDetection } from "../util/collisionDetection.js"

export class Player extends Property {
    constructor() {
        super()
        this.keys = keys
        this.keys.init()
        this.audioJump = new Audio('../sfx/jump.wav')
        this.audioHit = new Audio('../sfx/damage.wav')
        this.hitDelay = 0
    }

    onCreate(entity, level) {
        entity.debugState = 3
        entity.movable = true
        entity.player = true
    }

    onTick = function(entity, level) {
        if (entity.isHit) {
            this.audioHit.play()
            if (this.hitDelay <= 0) {
                level.health = level.health - 1
                this.hitDelay = 60
            }
        }
        this.hitDelay = this.hitDelay - 1
        entity.isHit = false


        if (keys.left == true) {
            entity.acceleration.add(new Vector(-0.5, 0))
        }
        if (keys.right == true) {
            entity.acceleration.add(new Vector(0.5, 0))
        }
        if (keys.up == true) {
            if (entity.collisionSide.bottom == true) {
                this.audioJump.play()
                entity.acceleration.add(new Vector(0, -15))
            }
        }
        if (keys.down == true) {
            entity.acceleration.add(new Vector(0, 0.5))
        }

        if (entity.pos.y > 2000) {
            level.time = 0
            entity.pos.y = -99999
        }

        this.checkForItems(entity, level)
    }

    checkForItems = function(entity, level) {
        let collisions = collisionDetection.allCollision(entity, level.backgroundEntities)
        collisions.forEach(element => {
            element.entity.onCollision(entity)

        });
    }

    toJson = function() {
        return '{ "type": "Player" }'
    }

    clone = function() {
        return new Player()
    }
}