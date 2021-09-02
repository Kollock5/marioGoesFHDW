import { Property } from "../Property.js";

export class BackgroundItem extends Property {
    constructor(animationFrames = 0) {
        super()
        this.animationFrames = animationFrames
    }

    onCreate(entity, level) {
        level.backgroundEntities.push(entity)
    }

    onTick = function(entity, level) {
        if (this.animationFrames != 0) {
            entity.animationState = Math.floor(level.tick / 10) % this.animationFrames
        }
    }

    toJson = function() {
        return `{ "type": "BackgroundItem", "value": "${this.animationFrames}" }`
    }

    clone = function() {
        return new BackgroundItem(this.animationFrames)
    }
}