import { Property } from "../Property.js";
import { collisionDetection } from "../util/collisionDetection.js";

var DRAG = 0.15

export class Physics extends Property {
    constructor() {
        super()
    }

    onTick = function(entity, level) {
        entity.velocity.add(entity.acceleration)
        this.applyDrag(entity)

        if (entity.velocity.x < -10) {
            entity.velocity.x = -10
        }
        if (entity.velocity.x > 10) {
            entity.velocity.x = 10
        }
        if (entity.velocity.y < -10) {
            entity.velocity.y = -10
        }
        if (entity.velocity.y > 10) {
            entity.velocity.y = 10
        }

        entity.acceleration.set(0, 0)
    }

    applyDrag = function(entity) {
        entity.velocity.x = this.dragToZero(entity.velocity.x)
        entity.velocity.y = this.dragToZero(entity.velocity.y)
    }

    dragToZero = function(x) {
        if (x > DRAG) {
            x = x - DRAG
        } else if (x < -DRAG) {
            x = x + DRAG
        } else {
            x = 0
        }
        return x
    }

    onStop = function(entity, level) {
        for (let i = 0; i < 2.; i++) {
            this.collision = collisionDetection.nearestCollision(entity, level.entities);
            if (this.collision != null) {
                if (this.collision.collisionTime.x < this.collision.collisionTime.y) {
                    entity.velocity.x = entity.velocity.x * this.collision.collisionTime.x
                } else {
                    entity.velocity.y = entity.velocity.y * this.collision.collisionTime.y
                }
                entity.onCollision(entity, this.collision.entity)
                this.collision.entity.onCollision(this.collision.entity, entity)
            } else {
                break
            }
        }
        entity.pos.add(entity.velocity)
    }

    toJson = function() {
        return '{ "type": "Physics" }'
    }

    clone = function() {
        return new Physics()
    }
}