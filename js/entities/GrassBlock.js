import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"

export function GrassBlock(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(32, 32), "../res/grass_block.png") }