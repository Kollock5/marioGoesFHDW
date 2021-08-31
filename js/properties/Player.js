import { keys } from "../util/keys.js"
import { Property } from "../Property.js"
import { Vector } from "../util/Vector.js"

export class Player extends Property {
    constructor() {
        super()
        this.keys = keys
        this.keys.init()
    }

    onCreate(entity, level) {
        entity.movable = true
    }

    onTick = function(entity, level) {
        if (keys.left == true) {
            entity.acceleration.add(new Vector(-0.5, 0))
        }
        if (keys.right == true) {
            entity.acceleration.add(new Vector(0.5, 0))
        }
        if (keys.up == true) {
            entity.acceleration.add(new Vector(0, -1.5))
        }
        if (keys.down == true) {
            entity.acceleration.add(new Vector(0, 0.5))
        }
        // entity.velocity.add(entity.acceleration)
        // entity.acceleration.set(0, 0)
    }

    toJson = function() {
        return '{ "type": "Player" }'
    }

    clone = function() {
        return new Player()
    }
}