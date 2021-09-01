import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"

export function GrassBlock(pos) { return new Entity(pos, new Vector(32, 32), "../res/grass.png") }