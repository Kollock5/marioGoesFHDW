import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { CanonAi } from "../properties/CanonAi.js"

export function Canon(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(32, 32), "../res/canon.png", [new CanonAi()]) }