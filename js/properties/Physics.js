import { Property } from "../Property.js";

/* 
Dont ask why... it just works...

i have to touch and redo mutch of this code later at some point again but my brain hurts way to mutch...

x and y axis and checkXCollision and Y do the same thing but i cant find a more clever way to put them togther
for now... also the Axis part is way to mutch spaghetti but i cant find a smarter way at the moment...
*/

export class Physics extends Property {
    constructor() {
        super()
    }

    onTick = function onTick(entity, level) {
        this.xAxis(level, entity);
        this.yAxis(level, entity);
    }

    xAxis(level, entity) {
        var movement = null;
        level.entities.forEach(them => {
            var newMovement = this.checkXCollision(entity, them);
            if (newMovement != null) {
                if (movement == null) {
                    movement = newMovement;
                } else if (Math.abs(movement) > Math.abs(newMovement)) {
                    movement = newMovement;
                }
            }
        });
        if (movement != null) {
            entity.pos.x = entity.pos.x + movement;
            entity.vel.x = 0;
        } else {
            entity.pos.x = entity.pos.x + entity.vel.x;
        }
    }

    checkXCollision(us, them) {
        if (
            us.pos.y < (them.pos.y + them.size.width) &&
            (us.pos.y + us.size.width) > them.pos.y &&
            us != them
        ) {
            //Check for collison in negativ direction
            if (us.pos.x >= (them.pos.x + them.size.height) && (us.pos.x + us.vel.x) <= (them.pos.x + them.size.height)) {
                return (them.pos.x + them.size.height - us.pos.x)
            }
            //Check for collison in positiv direction
            if ((us.pos.x + us.size.height) <= them.pos.x && ((us.pos.x + us.size.height) + us.vel.x) >= them.pos.x) {
                return (them.pos.x - us.size.height - us.pos.x)
            }
        }
        return null
    }

    yAxis(level, entity) {
        var movement = null;
        level.entities.forEach(them => {
            var newMovement = this.checkYCollision(entity, them);
            if (newMovement != null) {
                if (movement == null) {
                    movement = newMovement;
                } else if (Math.abs(movement) > Math.abs(newMovement)) {
                    movement = newMovement;
                }
            }
        });
        if (movement != null) {
            entity.pos.y = entity.pos.y + movement;
            entity.vel.y = 0;
        } else {
            entity.pos.y = entity.pos.y + entity.vel.y;
        }
    }

    checkYCollision(us, them) {
        if (
            us.pos.x < (them.pos.x + them.size.height) &&
            (us.pos.x + us.size.height) > them.pos.x &&
            us != them
        ) {
            //Check for collison in negativ direction
            if (us.pos.y >= (them.pos.y + them.size.width) && (us.pos.y + us.vel.y) <= (them.pos.y + them.size.width)) {
                return (them.pos.y + them.size.width - us.pos.y)
            }
            //Check for collison in positiv direction
            if ((us.pos.y + us.size.width) <= them.pos.y && ((us.pos.y + us.size.width) + us.vel.y) >= them.pos.y) {
                return (them.pos.y - us.size.width - us.pos.y)
            }
        }
        return null
    }
}