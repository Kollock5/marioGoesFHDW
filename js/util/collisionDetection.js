export var collisionDetection = {
    checkXAxisColliding: function(level, entity) {
        var collider = null
        var movement = null;
        level.entities.forEach(them => {
            var newMovement = collisionDetection.collidingOnX(entity, them);
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
        var collisionPos = ((movement != null) ? (entity.pos.x + movement) : null)
        return { collider: collider, collisionPos: collisionPos }
    },

    collidingOnX: function(us, them) {
        if (
            us.pos.y < (them.pos.y + them.size.width) &&
            (us.pos.y + us.size.width) > them.pos.y &&
            us != them
        ) {
            //Check for collision in negative direction
            if (us.pos.x >= (them.pos.x + them.size.height) && (us.pos.x + us.vel.x) <= (them.pos.x + them.size.height)) {
                return (them.pos.x + them.size.height - us.pos.x)
            }
            //Check for collision in positive direction
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
            var newMovement = collisionDetection.collidingOnY(entity, them);
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
        var collisionPos = ((movement != null) ? (entity.pos.y + movement) : null)
        return { collider: collider, collisionPos: collisionPos }
    },

    collidingOnY: function(us, them) {
        if (
            us.pos.x < (them.pos.x + them.size.height) &&
            (us.pos.x + us.size.height) > them.pos.x &&
            us != them
        ) {
            //Check for collision in negative direction
            if (us.pos.y >= (them.pos.y + them.size.width) && (us.pos.y + us.vel.y) <= (them.pos.y + them.size.width)) {
                return (them.pos.y + them.size.width - us.pos.y)
            }
            //Check for collision in positive direction
            if ((us.pos.y + us.size.width) <= them.pos.y && ((us.pos.y + us.size.width) + us.vel.y) >= them.pos.y) {
                return (them.pos.y - us.size.width - us.pos.y)
            }
        }
        return null
    }
}