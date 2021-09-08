import { Property } from "../Property.js";
import { Vector } from "../util/Vector.js";
import { collisionDetection } from "../util/collisionDetection.js";
import { Entity } from "../Entity.js";

export class SlimeAi extends Property {
    constructor() {
        super()
        this.won = false
        this.state = 0
        this.stateTimer = 0
        this.audio = new Audio('../sfx/ghost_slime.wav');
    }

    onCreate(entity, level) {
        entity.movable = true
    }

    onTick = function(entity, level) {
        this.stateTimer = this.stateTimer + 1
        this.animation(entity, level)
        switch (this.state) {
            case 0:
                entity.acceleration.add(new Vector(-0.45, 0))
                break;
            case 1:
                entity.acceleration.add(new Vector(0, -1.3))

                this.distance = collisionDetection.calculateDistance(entity,
                    new Entity(new Vector((window.innerWidth / 2) - level.offset.x, (window.innerHeight / 2) - level.offset.y),
                        new Vector(1, 1)))

                if (this.distance.total < 500) {
                    this.audio.volume = (500 - this.distance.total) / 500
                    this.audio.play()
                }

                break;
            case 2:
                entity.acceleration.add(new Vector(0.45, 0))
                break;
            case 3:
                entity.acceleration.add(new Vector(0, -1.3))
                break;
            default:
                break;
        }
        if (this.stateTimer > 50) {
            this.stateTimer = 0
            this.state = this.state + 1
            if (this.state >= 4) {
                this.state = 0
            }
        }
    }

    onStop = function(entity, level) {

    }

    onCollision = function onCollision(us, them) {
        them.acceleration.add(new Vector(us.velocity.x * 4, us.velocity.y * 4))
        if (them.player) {
            them.isHit = true
        }
    }

    toJson = function() {
        return '{ "type": "SlimeAi" }'
    }

    clone = function() {
        return new SlimeAi()
    }

    animation = function(entity, level) {
        if (entity.velocity.y < 0) {
            entity.animationState = 3
        } else {
            if (entity.velocity.x != 0) {
                entity.animationState = Math.floor(level.tick / 9) % 3
            } else {
                entity.animationState = 0
            }
        }
    }

}