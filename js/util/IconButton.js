import { Vector } from "./Vector.js";

export class IconButton {
    constructor(imageSource = "../res/button_small.png", onClick, pos = new Vector(0, 0), size = new Vector(32, 32)) {
        this.pos = pos
        this.size = size
        this.onClick = onClick

        this.image = new Image()
        this.image.src = imageSource
    }

    draw(context) {
        context.drawImage(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y)
    }

    isHit(vecPos) {
        if (vecPos.x > this.pos.x &&
            vecPos.x < this.pos.x + this.size.x &&
            vecPos.y > this.pos.y &&
            vecPos.y < this.pos.y + this.size.y)
            this.onClick()
    }
}