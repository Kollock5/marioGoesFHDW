import { Property } from "../Property.js";
import { Vector } from "../util/Vector.js";

export class MonkeyBallAi extends Property {
    constructor(ballDirection = new Vector(-5, 5)) {
        super()
        this.stateTimer = 0
        this.hit = false
        this.ballDirection = ballDirection
    }

    onCreate(entity, level) {
        entity.movable = true
    }

    onTick = function(entity, level) {
        if (this.stateTimer == 0) {
            entity.acceleration.add(this.ballDirection)
        }

        this.stateTimer = this.stateTimer + 1

        if (this.stateTimer > 100 || this.hit) {
            level.entities.splice(level.entities.indexOf(entity), 1)
        }
    }

    onCollision = function onCollision(us, them) {
        if (this.stateTimer == 0) {
            if (them.movable) {
                them.velocity.set(this.ballDirection.x * 4, this.ballDirection.y * 4)
            }
        } else {
            them.acceleration.add(new Vector(us.velocity.x * 4, us.velocity.y * 4))
            this.hit = true
        }
        if (them.player) {
            them.isHit = true
        }
    }

    toJson = function() {
        return '{ "type": "MonkeyBallAi" }'
    }

    clone = function() {
        return new MonkeyBallAi()
    }
}