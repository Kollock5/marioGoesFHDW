import { Property } from "../Property.js";
import { collisionDetection } from "../util/collisionDetection.js";


export class Physics extends Property {
    constructor() {
        super()
    }

    onTick = function onTick(entity, level) {
        var collisionX = collisionDetection.checkXAxisColliding(level, entity);
        var collisionY = collisionDetection.checkYAxisColliding(level, entity);
        if (collisionX.collider != null) {
            entity.pos.x = collisionX.collisionPos
            entity.vel.x = 0
            entity.onCollision(collisionX.collider)
            collisionX.collider.onCollision(entity)
        } else {
            entity.pos.x = entity.pos.x + entity.vel.x
        }
        if (collisionY.collider != null) {
            entity.pos.y = collisionY.collisionPos
            entity.vel.y = 0
            if (collisionY.collider != collisionY.collider) {
                entity.onCollision(collisionY.collider)
                collisionY.onCollision.collider(entity)
            }
        } else {
            entity.pos.y = entity.pos.y + entity.vel.y
        }
    }
}