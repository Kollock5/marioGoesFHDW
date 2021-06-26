class Blocks {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }

    onTick(tick) {}

    createHtml() {
        var newElement = document.createElement("div");
        newElement.setAttribute('class', "block")
        newElement.style.bottom = this.pos.x + ".px"
        newElement.style.left = this.pos.y + ".px"
        newElement.style.height = this.size.height + ".px"
        newElement.style.width = this.size.width + ".px"

        return newElement
    }
}