import { Property } from "../Property.js";
import { Vector } from "../util/Vector.js";
import { collisionDetection } from "../util/collisionDetection.js";
import { Entity } from "../Entity.js";
import { activeSound } from "../main.js"

export class RocketAi extends Property {
    constructor(rocketDirection = new Vector(-0.5, 0)) {
        super()
        this.stateTimer = 0
        this.hit = false
        this.rocketDirection = rocketDirection
        this.audio = new Audio('../sfx/rocket.wav');
    }

    onCreate(entity, level) {
        entity.movable = true
    }

    onTick = function(entity, level) {
        this.stateTimer = this.stateTimer + 1
        this.animation(entity, level)

        this.distance = collisionDetection.calculateDistance(entity,
            new Entity(new Vector((window.innerWidth / 2) - level.offset.x, (window.innerHeight / 2) - level.offset.y),
                new Vector(1, 1)))

        if (this.distance.total < 500 && activeSound) {
            this.audio.volume = (500 - this.distance.total) / 500
            this.audio.play()
        }

        entity.acceleration.add(this.rocketDirection)

        if (this.stateTimer > 100 || this.hit) {
            level.entities.splice(level.entities.indexOf(entity), 1)
        }
    }

    onStop = function(entity, level) {

    }

    onCollision = function onCollision(us, them) {
        if (this.stateTimer == 0) {
            if (them.movable) {
                them.velocity.set(this.rocketDirection.x * 32, this.rocketDirection.y * 32)
            }
        } else {
            them.acceleration.add(new Vector(us.velocity.x * 8, us.velocity.y * 8))
            this.hit = true
        }
        if (them.player) {
            them.isHit = true
        }
    }

    toJson = function() {
        return '{ "type": "RocketAi" }'
    }

    clone = function() {
        return new RocketAi()
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