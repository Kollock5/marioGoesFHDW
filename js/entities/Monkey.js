import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { Gravity } from "../properties/Gravity.js"
import { Physics } from "../properties/Physics.js"
import { MonkeyAi } from "../properties/MonkeyAi.js"

export function Monkey(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(32, 32), "../res/enemy_monkey.png", [new Gravity, new Physics, new MonkeyAi]) }