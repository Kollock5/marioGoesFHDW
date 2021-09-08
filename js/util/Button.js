import { activeSound } from "../main.js";
import { Vector } from "./Vector.js";


export class Button {
    constructor(pos, text, onClick, imageSource = "../res/button.png", size = new Vector(128, 32)) {
        this.pos = pos
        this.size = size
        this.onClick = onClick
        this.text = text

        this.image = new Image()
        this.image.src = imageSource
    }

    draw(context) {
        context.drawImage(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y)
        context.fillStyle = "#F0F0FF";
        context.font = "17px Tahoma";
        context.textAlign = "center";
        context.fillText(this.text, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2 + 6);
    }

    isHit(vecPos) {
        if (vecPos.x > this.pos.x &&
            vecPos.x < this.pos.x + this.size.x &&
            vecPos.y > this.pos.y &&
            vecPos.y < this.pos.y + this.size.y) {
            if (activeSound) {
                this.audio = new Audio('../sfx/menu_select.wav')
                this.audio.play()
                this.onClick()
            }

        }
    }
}