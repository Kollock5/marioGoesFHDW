import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { RocketAi } from "../properties/RocketAi.js"
import { Physics } from "../properties/Physics.js"

export function Rocket(pos = new Vector(0, 0), rocketDirection = new Vector(-0.5, 0)) { return new Entity(pos, new Vector(32, 32), "../res/rocket.png", [new RocketAi(rocketDirection), new Physics()]) }