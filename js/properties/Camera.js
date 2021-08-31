import { Property } from "../Property.js";

export class Camera extends Property {
    constructor() {
        super()
    }

    onTick = function(entity, level) {
        let xPos = (window.innerWidth / 2) - (entity.pos.x + (entity.size.x / 2))
        let yPos = (window.innerHeight / 2) - (entity.pos.y + (entity.size.y / 2))
        level.offset.set(xPos, yPos)
        console.log(entity.size.y)
    }

    toJson = function() {
        return '{ "type": "Camera" }'
    }

    clone = function() {
        return new Camera()
    }
}