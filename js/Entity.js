import { Vector } from "./util/Vector.js";

export class Entity {
    constructor(pos, size, properties = [], velocity = new Vector(0, 0), acceleration = new Vector(0, 0), movable = false) {
        this.pos = pos;
        this.size = size;
        this.properties = properties
        this.velocity = velocity
        this.acceleration = acceleration
        this.movable = movable
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

    clone() {
        let clonedProperties = []
        this.properties.forEach(property => {
            clonedProperties.push(property.clone())
        });
        return new Entity(this.pos.clone(), this.size.clone(), clonedProperties, this.velocity.clone(), this.acceleration.clone(), this.movable)
    }

    toJson() {
        let json = `{ "pos": ${this.pos.toJson()}, "size": ${this.size.toJson()}, "velocity": ${this.velocity.toJson()}, "acceleration": ${this.acceleration.toJson()}, "movable": ${this.movable}, "properties": [ `
        this.properties.forEach(function(property, i, arr) {
            json = json + property.toJson()
            if (i < arr.length - 1) {
                json = json + `, `
            } else {
                json = json + ` `
            }
        })
        json = json + `] }`
        return json
    }
}