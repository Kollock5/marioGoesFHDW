import { Property } from "../Property.js";

export class CoinLogic extends Property {
    constructor() {
        super()
        this.hit = false
    }

    onCreate(entity, level) {
        level.backgroundEntities.push(entity)
    }

    onTick = function(entity, level) {
        if (this.hit) {
            level.backgroundEntities.splice(level.backgroundEntities.indexOf(entity), 1)
            level.score++;
        }
    }

    onStop = function(entity, level) {

    }

    onCollision = function onCollision(us, them) {
        this.hit = true
    }

    toJson = function() {
        return '{ "type": "CoinLogic" }'
    }

    clone = function() {
        return new CoinLogic()
    }

}