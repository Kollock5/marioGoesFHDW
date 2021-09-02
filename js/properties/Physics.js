import { Property } from "../Property.js";
import { collisionDetection } from "../util/collisionDetection.js";

var DRAG = 0.30

export class Physics extends Property {
    constructor() {
        super()
    }

    onTick = function(entity, level) {
        entity.velocity.add(entity.acceleration)

        if (entity.velocity.x < -18) {
            entity.velocity.x = -18
        }
        if (entity.velocity.x > 18) {
            entity.velocity.x = 18
        }
        if (entity.velocity.y < -18) {
            entity.velocity.y = -18
        }
        if (entity.velocity.y > 18) {
            entity.velocity.y = 18
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
        entity.collisionSide = { bottom: false, left: false, top: false, right: false }
        for (let i = 0; i < 2.; i++) {
            this.collision = collisionDetection.nearestCollision(entity, level.entities);
            if (this.collision != null) {
                if (this.collision.collisionTime.x < this.collision.collisionTime.y) {
                    entity.velocity.x = entity.velocity.x * this.collision.collisionTime.x
                } else {
                    entity.velocity.y = entity.velocity.y * this.collision.collisionTime.y
                }

                entity.collisionSide = {
                    bottom: (entity.collisionSide.bottom || this.collision.collisionSide.bottom),
                    left: (entity.collisionSide.left || this.collision.collisionSide.left),
                    top: (entity.collisionSide.top || this.collision.collisionSide.top),
                    right: (entity.collisionSide.right || this.collision.collisionSide.right)
                }

                entity.onCollision(this.collision.entity)
                this.collision.entity.onCollision(entity)
            } else {
                break
            }
        }
        entity.pos.add(entity.velocity)
        this.applyDrag(entity)

    }

    toJson = function() {
        return '{ "type": "Physics" }'
    }

    clone = function() {
        return new Physics()
    }
}