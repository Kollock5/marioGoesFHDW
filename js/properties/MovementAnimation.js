import { Property } from "../Property.js";

export class MovementAnimation extends Property {
    constructor() {
        super()
        this.step = 0
    }

    onTick = function(entity, level) {
        if (entity.velocity.x > 0) {
            entity.animationFacingSide = 0
        } else if (entity.velocity.x < 0) {
            entity.animationFacingSide = 1
        }

        if (entity.velocity.y < 0) {
            entity.animationState = 3
        } else {
            if (entity.velocity.x != 0) {
                entity.animationState = Math.floor(level.tick / 9) % 3
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