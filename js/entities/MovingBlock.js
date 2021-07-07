import { Entity } from "../Entity.js"
import { AlternatingMovement } from "../properties/AlternatingMovement.js"
import { Vector } from "../util/Vector.js"

//TODO: Remove example class 
export class MovingBlock extends Entity {
    constructor(pos, size) {
        super(pos, size)
        super.properties = [new AlternatingMovement(this, 150, new Vector(0, 0.5))]
    }

}