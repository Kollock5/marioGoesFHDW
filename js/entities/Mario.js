import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { Gravity } from "../properties/Gravity.js"
import { Physics } from "../properties/Physics.js"
import { Player } from "../properties/Player.js"
import { Camera } from "../properties/Camera.js"
import { MovementAnimation } from "../properties/MovementAnimation.js"


export function Mario(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(32, 63), "../res/player.png", [new Gravity, new Physics, new Player, new Camera, new MovementAnimation]) }