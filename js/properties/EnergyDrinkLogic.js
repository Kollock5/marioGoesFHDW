import { Property } from "../Property.js";

export class EnergyDrinkLogic extends Property {
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
            level.health++
                this.hit = false
        }
    }

    onStop = function(entity, level) {

    }

    onCollision = function onCollision(us, them) {
        this.hit = true
    }

    toJson = function() {
        return '{ "type": "EnergyDrinkLogic" }'
    }

    clone = function() {
        return new EnergyDrinkLogic()
    }

}