import { Vector } from "./util/Vector.js";

export class Entity {
    constructor(pos, size, properties = []) {
        this.pos = pos;
        this.velocity = new Vector(0, 0)
        this.acceleration = new Vector(0, 0)

        this.size = size;
        this.properties = properties
    }

    addProperties(property, level) {
        this.properties.push(property)
        property.onCreate(level)
    }

    onCreate(level) {
        this.properties.forEach(property => {
            property.onCreate(this, level)
        });
    }

    onStart(level) {}

    onTick(level) {
        this.properties.forEach(property => {
            property.onTick(this, level)
        });
    }

    onCollision(them) {
        this.properties.forEach(property => {
            property.onCollision(this, them)
        });
    }

    onStop(level) {
        this.properties.forEach(property => {
            property.onStop(this, level)
        });
    }
}