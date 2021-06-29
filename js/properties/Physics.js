import { Property } from "../Property.js";
import { collisonDetection } from "../util/CollisonDetection.js";


export class Physics extends Property {
    constructor() {
        super()
    }

    onTick = function onTick(entity, level) {
        var collisonX = collisonDetection.checkXAxisColliding(level, entity);
        var collisonY = collisonDetection.checkYAxisColliding(level, entity);
        if (collisonX.collider != null) {
            entity.pos.x = collisonX.collisonPos
            entity.vel.x = 0
            entity.onCollision(collisonX.collider)
            collisonX.collider.onCollision(entity)
        } else {
            entity.pos.x = entity.pos.x + entity.vel.x
        }
        if (collisonY.collider != null) {
            entity.pos.y = collisonY.collisonPos
            entity.vel.y = 0
            if (collisonY.collider != collisonY.collider) {
                entity.onCollision(collisonY.collider)
                collisonY.onCollision.collider(entity)
            }
        } else {
            entity.pos.y = entity.pos.y + entity.vel.y
        }
    }
}