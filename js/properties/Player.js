import { keys } from "../util/keys.js"
import { Property } from "../Property.js"
import { Vector } from "../util/Vector.js"
import { collisionDetection } from "../util/collisionDetection.js"

export class Player extends Property {
    constructor() {
        super()
        this.keys = keys
        this.keys.init()
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
                entity.acceleration.add(new Vector(0, -15))
            }
        }
        if (keys.down == true) {
            entity.acceleration.add(new Vector(0, 0.5))
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