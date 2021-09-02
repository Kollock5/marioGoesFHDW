import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { BackgroundItem } from "../properties/BackgroundItem.js"

export function FlowerRed(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(32, 32), "../res/flower.png", [new BackgroundItem(2)]) }