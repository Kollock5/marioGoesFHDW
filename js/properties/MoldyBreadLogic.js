import { Property } from "../Property.js";

export class MoldyBreadLogic extends Property {
    constructor() {
        super()
        this.hit = false
        this.audio = new Audio('../sfx/coins.wav');
    }

    onCreate(entity, level) {
        level.backgroundEntities.push(entity)
    }

    onTick = function(entity, level) {
        if (this.hit) {
            this.audio.play()
            level.backgroundEntities.splice(level.backgroundEntities.indexOf(entity), 1)
            level.time = level.time + 30;
        }
    }

    onStop = function(entity, level) {

    }

    onCollision = function onCollision(us, them) {
        this.hit = true
    }

    toJson = function() {
        return '{ "type": "MoldyBreadLogic" }'
    }

    clone = function() {
        return new MoldyBreadLogic()
    }

}