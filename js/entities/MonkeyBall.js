import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { Physics } from "../properties/Physics.js"
import { MonkeyBallAi } from "../properties/MonkeyBallAi.js"
import { Gravity } from "../properties/Gravity.js"

export function MonkeyBall(pos = new Vector(0, 0), ballDirection = new Vector(-0.5, 0)) { return new Entity(pos, new Vector(32, 32), "../res/enemy_monkeyblood.png", [new MonkeyBallAi(ballDirection), new Physics(), new Gravity()]) }