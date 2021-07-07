import { Property } from "../Property.js";
import { collisionDetection } from "../util/collisionDetection.js";

export const VERTICAL = 0
export const HORIZONTAL = 1

export class AlternatingMovement extends Property {
    constructor(entity, extendingDistance, speed) {
        super()
        this.extendingDistance = extendingDistance
        this.speed = speed
        this.interval = Math.abs(this.extendingDistance / this.speed.length())
    }

    onTick = function onTick(entity, level) {
        if (this.interval <= 0) {
            this.interval = Math.abs(this.extendingDistance / this.speed.length())
            this.speed.set(-this.speed.x, -this.speed.y)
        }
        entity.velocity.set(this.speed.x, this.speed.y)
        this.interval = this.interval - 1
    }

    onStop = function(entity, level) {
        this.collisions = collisionDetection.allCollision(entity, level);
        this.collisions.forEach(collision => {
            if (collision.collisionTime.x < collision.collisionTime.y) {
                collision.entity.velocity.x = (entity.velocity.x)

            } else {
                collision.entity.velocity.y = (entity.velocity.y)
            }
            entity.onCollision(entity, collision.entity)
            collision.entity.onCollision(collision.entity, entity)
        })
        entity.pos.add(entity.velocity)
    }

    onCollision = function onCollision(us, them) {

    }

}