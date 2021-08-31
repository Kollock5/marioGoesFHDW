import { Vector } from "./util/Vector.js";

export class Entity {
    constructor(pos, size, imgSrc = "../res/missingTexture.png", properties = [], velocity = new Vector(0, 0), acceleration = new Vector(0, 0), movable = false) {
        this.pos = pos;
        this.size = size;
        this.properties = properties
        this.velocity = velocity
        this.acceleration = acceleration
        this.movable = movable
        this.animationState = 0

        this.image = new Image()
        this.imgSrc = imgSrc
        this.image.src = imgSrc
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

    draw(context, offset) {
        context.drawImage(this.image, this.animationState * this.size.y, 0, this.size.x, this.size.y, (this.pos.x + offset.x), (this.pos.y + offset.y), this.size.x, this.size.y)
    }

    clone() {
        let clonedProperties = []
        this.properties.forEach(property => {
            clonedProperties.push(property.clone())
        });
        return new Entity(this.pos.clone(), this.size.clone(), this.imgSrc, clonedProperties, this.velocity.clone(), this.acceleration.clone(), this.movable)
    }

    toJson() {
        console.log(this.imgSrc)
        let json = `{ "pos": ${this.pos.toJson()}, "size": ${this.size.toJson()}, "imgSrc": "${this.imgSrc}", "velocity": ${this.velocity.toJson()}, "acceleration": ${this.acceleration.toJson()}, "movable": ${this.movable}, "properties": [ `
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