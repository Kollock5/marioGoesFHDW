import { Vector } from "./Vector.js";


export class LvlButton {
    constructor(pos, text, onClick, score = '111', time = '', imageSource = "../res/buttonbig.png", size = new Vector(128, 64)) {
        this.pos = pos
        this.size = size
        this.onClick = onClick
        this.text = text
        this.score = score
        this.time = time
        this.image = new Image()
        this.image.src = imageSource
    }

    draw(context) {
        console.log(this.image.width)
        context.drawImage(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y)
        context.fillStyle = "#F0F0FF";
        context.font = "17px Tahoma";
        context.textAlign = "center";
        context.fillText(this.text, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2 - 12);
        context.font = "14px Tahoma";
        context.textAlign = "left";
        context.fillText("High Score:", this.pos.x + 10, this.pos.y + this.size.y / 2 + 6);
        context.textAlign = "right";
        context.fillText(this.score, this.pos.x + this.size.x - 10, this.pos.y + this.size.y / 2 + 6);
        context.textAlign = "left";
        context.fillText("Best Time:", this.pos.x + 10, this.pos.y + this.size.y / 2 + 24);
        context.textAlign = "right";
        context.fillText(this.time, this.pos.x + this.size.x - 10, this.pos.y + this.size.y / 2 + 24);
    }

    isHit(vecPos) {
        if (vecPos.x > this.pos.x &&
            vecPos.x < this.pos.x + this.size.x &&
            vecPos.y > this.pos.y &&
            vecPos.y < this.pos.y + this.size.y)
            this.onClick()
    }
}