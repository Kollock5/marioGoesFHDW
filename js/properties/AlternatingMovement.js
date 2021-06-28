import { Property } from "../Property.js";

export const VERTICAL = 0
export const HORIZONTAL = 1

export class AlternatingMovement extends Property {
    constructor(entity, extendingDistance, speed, direction = HORIZONTAL) {
        super()
        this.extendingDistance = extendingDistance
        this.speed = speed
        this.turnPoint = true
        this.direction = direction
        if (direction == HORIZONTAL) {
            this.startPos = entity.pos.y
            this.internalPos = entity.pos.y
        } else {
            this.startPos = entity.pos.x
            this.internalPos = entity.pos.x
        }
    }

    onTick = function onTick(entity, level, tick) {
        if (this.turnPoint) {
            if (this.internalPos >= this.startPos + this.extendingDistance) {
                this.turnPoint = false
            }
            this.internalPos = this.internalPos + this.speed;
        } else {
            if (this.internalPos <= this.startPos) {
                this.turnPoint = true
            }
            this.internalPos = this.internalPos - this.speed;
        }
        if (this.direction == HORIZONTAL) {
            entity.pos.y = Math.round(this.internalPos)
        } else {
            entity.pos.x = Math.round(this.internalPos)
        }
    }
}