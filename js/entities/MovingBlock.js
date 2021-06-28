import { Entity } from "../Entity.js"
import { AlternatingMovement } from "../properties/AlternatingMovement.js"


//TODO: Remove example class 
export class MovingBlock extends Entity {
    constructor(pos, size) {
        super(pos, size)
        super.addProperties(new AlternatingMovement(this, 250, 2.4, AlternatingMovement.VERTICAL))
    }

}