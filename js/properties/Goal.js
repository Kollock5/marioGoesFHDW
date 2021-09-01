import { Property } from "../Property.js";

export class Goal extends Property {
    constructor() {
        super()
        this.won = false
    }

    onTick = function(entity, level) {
        if (this.won) {
            level.gameWon = true
        }
    }

    onStop = function(entity, level) {

    }

    onCollision = function onCollision(us, them) {
        this.won = true
    }

    toJson = function() {
        return '{ "type": "Goal" }'
    }

    clone = function() {
        return new Goal()
    }

}