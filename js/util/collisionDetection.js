import { Vector } from "./Vector.js";
//collision Detection Version: 4

export var collisionDetection = {

    allCollision: function(entity, entities) {
        this.collisions = []
        entities.forEach(them => {
            if (entity != them) {
                if (this.checkColliding(entity, them)) {
                    this.distance = this.calculateDistance(entity, them)
                    this.collisionTime = new Vector(
                        entity.velocity.x != 0 ? Math.abs(this.distance.vec.x / entity.velocity.x) : Infinity,
                        entity.velocity.y != 0 ? Math.abs(this.distance.vec.y / entity.velocity.y) : Infinity
                    )
                    this.collisionSide = this.checkCollisionSide(entity.velocity, this.distance.vec)
                    this.distance.total = this.collisionTime.x != Infinity ? Math.pow(this.collisionTime.x, 2) : 0
                    this.distance.total = this.distance.total + (this.collisionTime.y != Infinity ? Math.pow(this.collisionTime.y, 2) : 0)
                    this.distance.total = Math.sqrt(this.distance.total)

                    this.collisions.push({ entity: them, collisionTime: this.collisionTime, collisionSide: this.collisionSide, collisionDistance: this.distance.total })
                }
            }
        });
        return this.collisions
    },

    nearestCollision: function(entity, entities) {
        this.collisions = []
        entities.forEach(them => {
            if (entity != them) {
                if (this.checkColliding(entity, them)) {
                    this.distance = this.calculateDistance(entity, them)
                    this.collisionTime = new Vector(
                        entity.velocity.x != 0 ? Math.abs(this.distance.vec.x / entity.velocity.x) : Infinity,
                        entity.velocity.y != 0 ? Math.abs(this.distance.vec.y / entity.velocity.y) : Infinity
                    )
                    this.collisionSide = this.checkCollisionSide(entity.velocity, this.distance.vec)
                    this.distance.total = this.collisionTime.x != Infinity ? Math.pow(this.collisionTime.x, 2) : 0
                    this.distance.total = this.distance.total + (this.collisionTime.y != Infinity ? Math.pow(this.collisionTime.y, 2) : 0)
                    this.distance.total = Math.sqrt(this.distance.total)

                    this.collisions.push({ entity: them, collisionTime: this.collisionTime, collisionSide: this.collisionSide, collisionDistance: this.distance.total })
                }
            }
        });

        //finding the closest collision
        if (this.collisions.length > 0) {
            this.closedCollision = this.collisions[0]
            this.collisions.forEach(collision => {
                if (this.closedCollision.collisionDistance > collision.collisionDistance) {
                    this.closedCollision = collision
                }
            });
            return this.closedCollision
        } else {
            return null
        }
    },

    //AABB Collision Detection returns true if colliding
    checkColliding: function(us, them) {
        return (
            us.pos.x + us.velocity.x < them.pos.x + them.size.x &&
            us.pos.x + us.velocity.x + us.size.x > them.pos.x &&
            us.pos.y + us.velocity.y < them.pos.y + them.size.y &&
            us.pos.y + us.velocity.y + us.size.y > them.pos.y
        )
    },

    checkCollisionSide: function(velocity, distance) {
        let collisionSide = { bottom: false, left: false, top: false, right: false }
        if (velocity.y > 0 && distance.y == 0) {
            collisionSide.bottom = true
        }
        if (velocity.x > 0 && distance.x == 0) {
            collisionSide.left = true
        }
        if (velocity.y < 0 && distance.y == 0) {
            collisionSide.top = true
        }
        if (velocity.x < 0 && distance.x == 0) {
            collisionSide.right = true
        }
        return collisionSide
    },

    calculateDistance: function(us, them) {
        this.distance = new Vector(Infinity, Infinity)

        if (us.pos.x + us.size.x <= them.pos.x) {
            this.distance.x = them.pos.x - (us.pos.x + us.size.x)
        } else if (us.pos.x >= them.pos.x + them.size.x) {
            this.distance.x = us.pos.x - (them.pos.x + them.size.x)
        }

        if (us.pos.y + us.size.y <= them.pos.y) {
            this.distance.y = them.pos.y - (us.pos.y + us.size.y)
        } else if (us.pos.y >= them.pos.y + them.size.y) {
            this.distance.y = us.pos.y - (them.pos.y + them.size.y)
        }
        this.totalDistance = this.distance.x != Infinity ? Math.pow(this.distance.x, 2) : 0
        this.totalDistance = this.totalDistance + (this.distance.y != Infinity ? Math.pow(this.distance.y, 2) : 0)
        this.totalDistance = Math.sqrt(this.totalDistance)

        return { vec: this.distance, total: this.totalDistance }
    }

}