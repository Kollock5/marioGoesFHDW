import { Property } from "../Property.js";

export class Gravity extends Property {
    constructor() {
        super()
    }

    onTick = function onTick(entity, level) {
        entity.acceleration.add(level.gravity)

    }
}