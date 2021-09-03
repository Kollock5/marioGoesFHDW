import { keys } from "../util/keys.js"
import { Property } from "../Property.js"
import { Vector } from "../util/Vector.js"
import { collisionDetection } from "../util/collisionDetection.js"

export class Player extends Property {
    constructor() {
        super()
        this.keys = keys
        this.keys.init()
        this.audio = new Audio('../sfx/jump.wav')
    }

    onCreate(entity, level) {
        entity.movable = true
        entity.player = true
    }

    onTick = function(entity, level) {
        if (keys.left == true) {
            entity.acceleration.add(new Vector(-0.5, 0))
        }
        if (keys.right == true) {
            entity.acceleration.add(new Vector(0.5, 0))
        }
        if (keys.up == true) {
            if (entity.collisionSide.bottom == true) {
                this.audio.play()
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