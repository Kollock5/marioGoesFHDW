import { Property } from "../Property.js";

export class EnergyDrinkLogic extends Property {
    constructor() {
        super()
        this.hit = false
    }

    onTick = function(entity, level) {
        if (this.hit) {
            level.entities.splice(level.entities.indexOf(entity), 1)
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