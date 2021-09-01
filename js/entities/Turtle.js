import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { Gravity } from "../properties/Gravity.js"
import { Physics } from "../properties/Physics.js"
import { TurtleAi } from "../properties/TurtleAi.js"

export function Turtle(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(32, 32), "../res/enemy_turtle.png", [new Gravity, new Physics, new TurtleAi]) }