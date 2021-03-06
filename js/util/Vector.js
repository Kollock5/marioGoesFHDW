export class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(vector) {
        this.x = this.x + vector.x
        this.y = this.y + vector.y
    }

    set(x, y) {
        this.x = x
        this.y = y
    }

    length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y))
    }

    clone() {
        return new Vector(this.x, this.y)
    }

    toJson() {
        return `{ "x": ${this.x}, "y": ${this.y} }`
    }
}