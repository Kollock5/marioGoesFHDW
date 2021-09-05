import { Property } from "../Property.js";

export class BreakingStoneLogic extends Property {
    constructor() {
        super()
        this.state = 0
        this.delay = 15
    }

    onTick = function(entity, level) {
        if (this.state != 0) {
            this.delay = this.delay - 1
            if (this.delay <= 0) {
                entity.animationState = this.state
                this.state = this.state + 1
                this.delay = 15
            }
            if (this.state == 5) {
                level.entities.splice(level.entities.indexOf(entity), 1)
            }
        }
    }

    onCollision = function onCollision(us, them) {
        if (them.player && this.state == 0) {
            this.state = 1
            us.animationState = this.state
        }
    }

    toJson = function() {
        return '{ "type": "BreakingStoneLogic" }'
    }

    clone = function() {
        return new BreakingStoneLogic()
    }
}