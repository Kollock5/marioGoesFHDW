export class Entity {
    constructor(pos, size, properties = []) {
        this.pos = pos;
        this.vel = { x: 0, y: 0 };
        this.size = size;
        this.properties = properties
        this.previousCollisons = []
    }

    //TODO: replace with something more modular/smarter maybe as a Property
    createHtml() {
        var newElement = document.createElement("div");
        newElement.setAttribute('class', "Entity")
        newElement.style.bottom = this.pos.x + ".px"
        newElement.style.left = this.pos.y + ".px"
        newElement.style.height = this.size.height + ".px"
        newElement.style.width = this.size.width + ".px"

        return newElement
    }

    addProperties(property) {
        this.properties.push(property)
    }

    onStart(level) {
        this.previousCollisons = []
    }

    onTick(level) {
        this.properties.forEach(property => {
            property.onTick(this, level)
        });
    }

    onCollision(them) {
        if (!this.previousCollisons.includes(them)) {
            this.properties.forEach(property => {
                property.onCollision(this, them)
            });
        }
    }
}