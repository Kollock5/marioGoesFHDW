import { Entity } from "../Entity.js"
import { Goal } from "../properties/Goal.js"
import { Vector } from "../util/Vector.js"

export function Flag(pos) { return new Entity(pos, new Vector(32, 160), "../res/flag.png", [new Goal]) }