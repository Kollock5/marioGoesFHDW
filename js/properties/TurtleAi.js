import { Property } from "../Property.js";
import { Vector } from "../util/Vector.js";
import { collisionDetection } from "../util/collisionDetection.js";
import { Entity } from "../Entity.js";

export class TurtleAi extends Property {
    constructor() {
        super()
        this.won = false
        this.state = 0
        this.stateTimer = 0
        this.audio = new Audio('../sfx/burp_schildkroete.wav')
    }

    onCreate(entity, level) {
        entity.movable = true
    }

    onTick = function(entity, level) {
        this.stateTimer = this.stateTimer + 1
        this.animation(entity, level)
        switch (this.state) {
            case 0:
                entity.acceleration.set(-0.33, 0)


                this.distance = collisionDetection.calculateDistance(entity,
                    new Entity(new Vector((window.innerWidth / 2) - level.offset.x, (window.innerHeight / 2) - level.offset.y),
                        new Vector(1, 1)))

                if (this.distance.total < 500) {
                    this.audio.volume = (500 - this.distance.total) / 500
                    this.audio.play()
                }

                break;
            case 1:
                // entity.acceleration.add(new Vector(0, 1))
                entity.acceleration.set(0.33, 0)

                break;
            default:
                break;
        }
        if (this.stateTimer > 100) {
            this.stateTimer = 0
            this.state = this.state + 1
            if (this.state >= 2) {
                this.state = 0
            }
        }
    }

    onStop = function(entity, level) {

    }

    onCollision = function onCollision(us, them) {
        them.acceleration.add(new Vector(us.velocity.x * 8, us.velocity.y * 8))
        if (them.player) {
            them.isHit = true
        }
    }

    toJson = function() {
        return '{ "type": "TurtleAi" }'
    }

    clone = function() {
        return new TurtleAi()
    }

    animation = function(entity, level) {
        if (entity.velocity.x > 0) {
            entity.animationFacingSide = 1
        } else if (entity.velocity.x < 0) {
            entity.animationFacingSide = 0
        }

        if (entity.velocity.x != 0) {
            entity.animationState = Math.floor(level.tick / 9) % 3
        } else {
            entity.animationState = 0
        }
    }

}