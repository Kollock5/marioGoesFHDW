import { Entity } from "../Entity.js"
import { Goal } from "../properties/Goal.js"
import { Vector } from "../util/Vector.js"

export function Flag(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(32, 160), "../res/flag.png", [new Goal]) }