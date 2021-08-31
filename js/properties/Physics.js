import { Property } from "../Property.js";
import { collisionDetection } from "../util/collisionDetection.js";
import { Gravity } from "./Gravity.js";


export class Physics extends Property {
    constructor() {
        super()
    }

    onTick = function(entity, level) {
        entity.velocity.add(entity.acceleration)

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