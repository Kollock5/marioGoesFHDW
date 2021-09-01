import { Property } from "../Property.js";
import { Vector } from "../util/Vector.js";

export class RocketAi extends Property {
    constructor(rocketDirection = new Vector(-0.5, 0)) {
        super()
        this.stateTimer = 0
        this.hit = false
        this.rocketDirection = rocketDirection
    }

    onCreate(entity, level) {
        entity.movable = true
    }

    onTick = function(entity, level) {
        this.stateTimer = this.stateTimer + 1
        this.animation(entity, level)

        entity.acceleration.add(this.rocketDirection)

        if (this.stateTimer > 100 || this.hit) {
            console.log()
            level.entities.splice(level.entities.indexOf(entity), 1)
        }
    }

    onStop = function(entity, level) {

    }

    onCollision = function onCollision(us, them) {
        them.acceleration.add(new Vector(us.velocity.x * 8, us.velocity.y * 8))
        this.hit = true
    }

    toJson = function() {
        return '{ "type": "RocketAi" }'
    }

    clone = function() {
        return new RocketAi()
    }

    animation = function(entity, level) {
        if (entity.velocity.x > 0) {
            entity.animationFacingSide = 1
        } else if (entity.velocity.x < 0) {
            entity.animationFacingSide = 0
        }

        if (entity.velocity.x != 0) {
            entity.animationState = Math.floor(level.tick / 9) % 3
        } else {
            entity.animationState = 0
        }
    }
}