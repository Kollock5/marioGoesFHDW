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
}