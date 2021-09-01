import { Property } from "../Property.js";

export class Gravity extends Property {
    constructor() {
        super()
    }

    onTick = function(entity, level) {
        entity.acceleration.add(level.gravity)

    }

    toJson = function() {
        return '{ "type": "Gravity" }'
    }

    clone = function() {
        return new Gravity()
    }
}