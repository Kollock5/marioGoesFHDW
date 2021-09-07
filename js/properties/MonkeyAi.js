import { Property } from "../Property.js";
import { Vector } from "../util/Vector.js";
import { MonkeyBall } from "../entities/MonkeyBall.js";
import { collisionDetection } from "../util/collisionDetection.js";
import { Entity } from "../Entity.js";

export class MonkeyAi extends Property {
    constructor() {
        super()
        this.state = 0
        this.stateTimer = 0
        this.movement = new Vector(0.37, 0)
        this.audio = new Audio('../sfx/monkey.ogg');
    }

    onTick = function(entity, level) {

        this.audio.pause;

        this.stateTimer = this.stateTimer + 1
        switch (this.state) {
            case 0:
                entity.acceleration.add(this.movement)
                this.animation(entity, level)

                if (this.stateTimer >= 60) {
                    this.stateTimer = 0
                    this.state = 1

                    entity.animationState = 4
                }
                break;
            case 1:
                if (this.stateTimer >= 50) {
                    this.stateTimer = 0
                    this.state = 2

                    entity.animationState = 5
                }
                break;
            case 2:
                if (this.stateTimer >= 10) {
                    this.stateTimer = 0
                    this.state = 3

                    entity.animationState = 3


                    if (entity.animationFacingSide == 0) {

                        this.distance = collisionDetection.calculateDistance(entity,
                            new Entity(new Vector((window.innerWidth / 2) - level.offset.x, (window.innerHeight / 2) - level.offset.y),
                                new Vector(1, 1)))

                        if (this.distance.total < 500) {
                            this.audio.volume = (500 - this.distance.total) / 500
                            this.audio.play()
                        }


                        level.entities.push(new MonkeyBall(new Vector(entity.pos.x - 32, entity.pos.y), new Vector(-16, -16)))
                    } else {

                        this.distance = collisionDetection.calculateDistance(entity,
                            new Entity(new Vector((window.innerWidth / 2) - level.offset.x, (window.innerHeight / 2) - level.offset.y),
                                new Vector(1, 1)))

                        if (this.distance.total < 500) {
                            this.audio.volume = (500 - this.distance.total) / 500
                            this.audio.play()
                        }


                        level.entities.push(new MonkeyBall(new Vector(entity.pos.x + 32, entity.pos.y), new Vector(16, -16)))
                    }

                    this.movement = new Vector(-this.movement.x, -this.movement.y)
                }
                break;
            case 3:
                if (this.stateTimer >= 40) {
                    this.stateTimer = 0
                    this.state = 0
                }
                this.animation(entity, level)
                break;
            default:
                break;
        }
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

    onCollision = function onCollision(us, them) {
        if (them.player) {
            them.isHit = true
        }
    }

    toJson = function() {
        return '{ "type": "MonkeyAi" }'
    }

    clone = function() {
        return new MonkeyAi()
    }
}