import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { MoldyBreadLogic } from "../properties/MoldyBreadLogic.js"

export function MoldyBread(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(32, 32), "../res/bread.png", [new MoldyBreadLogic()]) }