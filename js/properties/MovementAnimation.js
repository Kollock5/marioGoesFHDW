import { Property } from "../Property.js";

export class MovementAnimation extends Property {
    constructor() {
        super()
        this.step = 0
    }

    onTick = function(entity, level) {
        if (entity.velocity.y < 0) {
            entity.animationState = 3
        } else {
            if (entity.velocity.x != 0) {
                console.log(Math.floor(level.tick / 1) % 3)
                entity.animationState = Math.floor(level.tick / 8) % 3
            } else {
                entity.animationState = 0
            }
        }
    }

    onStop = function(entity, level) {

    }

    onCollision = function onCollision(us, them) {

    }

    toJson = function() {
        return '{ "type": "MovementAnimation" }'
    }

    clone = function() {
        return new MovementAnimation()
    }

}