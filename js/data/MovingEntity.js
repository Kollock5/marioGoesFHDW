import { Entity } from "./Entity.js"

export const VERTICAL = 0
export const HORIZONTAL = 1

export class MovingEntity extends Entity {
    constructor(pos, size, extendingDistance, speed, direction = HORIZONTAL) {
        super(pos, size)
        this.extendingDistance = extendingDistance
        this.speed = speed
        this.turnPoint = true
        this.direction = direction
        if (direction == HORIZONTAL) {
            this.startPos = pos.y
            this.internalPos = pos.y
        } else {
            this.startPos = pos.x
            this.internalPos = pos.x
        }
    }

    onTick = function onTick(tick) {
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
            this.pos.y = Math.round(this.internalPos)
        } else {
            this.pos.x = Math.round(this.internalPos)
        }
    }
}