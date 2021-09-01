import { Rocket } from "../entities/Rocket.js";
import { Property } from "../Property.js";
import { Vector } from "../util/Vector.js";
import { collisionDetection } from "../util/collisionDetection.js";

export class CanonAi extends Property {
    constructor() {
        super()
        this.state = 0
        this.stateTimer = 0
    }

    onCreate(entity, level) {
        entity.velocity.set(-1, 0)
        if (collisionDetection.nearestCollision(entity, level.entities) != null) {
            entity.animationFacingSide = 1
        }
    }

    onTick = function(entity, level) {
        this.stateTimer = this.stateTimer + 1
        switch (this.state) {
            case 0:
                if (this.stateTimer >= 150) {
                    this.stateTimer = 0
                    this.state = 1
                    entity.animationState = 1

                    if (entity.animationFacingSide == 0) {
                        level.entities.push(new Rocket(new Vector(entity.pos.x - 32, entity.pos.y), new Vector(-0.5, 0)))
                    } else {
                        level.entities.push(new Rocket(new Vector(entity.pos.x + 32, entity.pos.y), new Vector(0.5, 0)))
                    }
                }
                break;
            case 1:
                if (this.stateTimer >= 3) {
                    this.stateTimer = 0
                    this.state = 2
                    entity.animationState = 2
                }
                break;
            case 2:
                if (this.stateTimer >= 3) {
                    this.stateTimer = 0
                    this.state = 0
                    entity.animationState = 0
                }
                break;
            default:
                break;
        }
    }

    onCollision = function onCollision(us, them) {}

    toJson = function() {
        return '{ "type": "CanonAi" }'
    }

    clone = function() {
        return new CanonAi()
    }
}