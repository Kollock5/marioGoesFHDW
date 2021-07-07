import { Level } from "./Level.js";
import { Entity } from "./Entity.js";
import { MovingBlock } from "./entities/MovingBlock.js";
import { Gravity } from "./properties/Gravity.js";
import { Physics } from "./properties/Physics.js";
import { Vector } from "./util/Vector.js";
import { Player } from "./properties/Player.js"

function main() {
    var level = new Level(
        'Hello', [
            new MovingBlock(new Vector(50, 350), new Vector(455, 25)),
            new Entity(new Vector(132, 212), new Vector(56, 56), [new Gravity(), new Physics, new Player]),
            new Entity(new Vector(400, 50), new Vector(56, 56), [new Gravity(), new Physics]),
            new Entity(new Vector(0, 0), new Vector(10, 1000)),
            new Entity(new Vector(0, 0), new Vector(1500, 10)),
            new Entity(new Vector(1270, 0), new Vector(10, 1000)),
            new Entity(new Vector(0, 750), new Vector(1500, 10)),

            new MovingBlock(new Vector(900, 120), new Vector(25, 400)),
            new Entity(new Vector(50, 450), new Vector(500, 100)),

        ]).init()
}

main()