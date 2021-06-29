/* 
Dont ask why... it just works...

i have to touch and redo mutch of this code later at some point again but my brain hurts way to mutch...

x and y axis and collidingOnX and Y do the same thing but i cant find a more clever way to put them togther
for now... also the Axis part is way to mutch spaghetti but i cant find a smarter way at the moment...
*/
export var collisonDetection = {
    checkXAxisColliding: function(level, entity) {
        var collider = null
        var movement = null;
        level.entities.forEach(them => {
            var newMovement = collisonDetection.collidingOnX(entity, them);
            if (newMovement != null) {
                if (movement == null) {
                    movement = newMovement;
                    collider = them
                } else if (Math.abs(movement) > Math.abs(newMovement)) {
                    movement = newMovement;
                    collider = them
                }
            }
        });
        var collisonPos = ((movement != null) ? (entity.pos.x + movement) : null)
        return { collider: collider, collisonPos: collisonPos }
    },

    collidingOnX: function(us, them) {
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
    },

    checkYAxisColliding: function(level, entity) {
        var collider = null
        var movement = null;
        level.entities.forEach(them => {
            var newMovement = collisonDetection.collidingOnY(entity, them);
            if (newMovement != null) {
                if (movement == null) {
                    movement = newMovement;
                    collider = them
                } else if (Math.abs(movement) > Math.abs(newMovement)) {
                    movement = newMovement;
                    collider = them
                }
            }
        });
        var collisonPos = ((movement != null) ? (entity.pos.y + movement) : null)
        return { collider: collider, collisonPos: collisonPos }
    },

    collidingOnY: function(us, them) {
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