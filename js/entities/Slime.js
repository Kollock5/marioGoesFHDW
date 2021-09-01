import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { Gravity } from "../properties/Gravity.js"
import { Physics } from "../properties/Physics.js"
import { SlimeAi } from "../properties/SlimeAi.js"
import { MovementAnimation } from "../properties/MovementAnimation.js"


export function Slime(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(32, 32), "../res/enemy_slime.png", [new Gravity, new Physics, new SlimeAi]) }