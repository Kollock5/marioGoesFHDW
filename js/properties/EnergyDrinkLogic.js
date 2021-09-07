import { Property } from "../Property.js";


export class EnergyDrinkLogic extends Property {
    constructor() {
        super()
        this.hit = false
        this.audio = new Audio('../sfx/slurp.mp3');

    }

    onCreate(entity, level) {
        level.backgroundEntities.push(entity)
    }

    onTick = function(entity, level) {
        if (this.hit) {
            this.audio.play();
            level.backgroundEntities.splice(level.backgroundEntities.indexOf(entity), 1)
            level.health++
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