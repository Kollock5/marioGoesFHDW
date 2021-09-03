import { Button } from "./Button.js";
import { Vector } from "./Vector.js";

export class Help {
    constructor(onClick) {
        this.size = new Vector(448, 768)
        console.log(game.width)

        console.log(this.pos)
        this.accept = new Button(new Vector(0, 0), "Thats easy", onClick)

        this.image = new Image()
        this.image.src = "../res/manual.png"
    }

    draw(context) {
        var game = document.getElementById("game")
        this.pos = new Vector((game.width / 2) - this.size.x / 2, (game.height / 2) - this.size.y / 2)
        this.accept.pos = new Vector(game.width / 2 - 64, game.height / 2 + 320)
        context.drawImage(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y)
        this.accept.draw(context)
    }

    isHit(vecPos) {
        this.accept.isHit(vecPos)
    }
}