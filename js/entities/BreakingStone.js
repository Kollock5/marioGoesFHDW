import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { BreakingStoneLogic } from "../properties/BreakingStoneLogic.js"

export function BreakingStone(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(32, 32), "../res/breakingStone.png", [new BreakingStoneLogic()]) }