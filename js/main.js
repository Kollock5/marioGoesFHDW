import { Level } from "./Level.js";
import { Entity } from "./Entity.js";
import { MovingBlock } from "./entities/MovingBlock.js";
import { Gravity } from "./properties/Gravity.js";
import { Physics } from "./properties/Physics.js";
import { Vector } from "./util/Vector.js";

function main() {
    var level = new Level(
        'Hello', [
            new MovingBlock(new Vector(50, 350), new Vector(455, 12)),
            new Entity(new Vector(0, 0), new Vector(1, 1)),
            new Entity(new Vector(10, 0), new Vector(5, 15)),
            new Entity(new Vector(132, 212), new Vector(56, 56), [new Gravity(), new Physics]),
            new Entity(new Vector(400, 50), new Vector(56, 56), [new Gravity(), new Physics]),
            new Entity(new Vector(10, 0), new Vector(5, 1000)),
            new Entity(new Vector(10, 0), new Vector(500, 10)),
            new MovingBlock(new Vector(550, 20), new Vector(16, 500)),
            new Entity(new Vector(50, 700), new Vector(500, 10)),

        ]).init()
}

main()