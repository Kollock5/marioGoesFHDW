import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { BackgroundItem } from "../properties/BackgroundItem.js"

export function Bush(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(32, 32), "../res/bush_small.png", [new BackgroundItem(6)]) }