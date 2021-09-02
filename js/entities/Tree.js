import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { BackgroundItem } from "../properties/BackgroundItem.js"

export function Tree(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(128, 128), "../res/tree.png", [new BackgroundItem(7)]) }