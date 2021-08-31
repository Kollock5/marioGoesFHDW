import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { Gravity } from "../properties/Gravity.js"
import { Physics } from "../properties/Physics.js"
import { Player } from "../properties/Player.js"


export function Mario(pos) { return new Entity(pos, new Vector(32, 64), "../res/missingTexture.png", [new Gravity, new Physics, new Player]) }