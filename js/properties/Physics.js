import { Property } from "../Property.js";
import { collisionDetection } from "../util/collisionDetection.js";


export class Physics extends Property {
    constructor() {
        super()
    }

    onTick = function onFinalTick(entity, level) {
        entity.velocity.add(entity.acceleration)
        entity.acceleration.set(0, 0)
    }

    onStop = function(entity, level) {
        for (let i = 0; i < 2.; i++) {
            this.collision = collisionDetection.collisionDetection(entity, level);
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
}