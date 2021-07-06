import { Level } from "./Level.js";
import { Entity } from "./Entity.js";
import { MovingBlock } from "./entities/MovingBlock.js";
import { Gravity } from "./properties/Gravity.js";
import { Physics } from "./properties/Physics.js";

function main() {
    var level = new Level(
        'Hello', [
            new MovingBlock({ x: 50, y: 350 }, { height: 455, width: 12 }),
            new Entity({ x: 0, y: 0 }, { height: 1, width: 1 }),
            new Entity({ x: 10, y: 0 }, { height: 5, width: 15 }),
            new Entity({ x: 132, y: 412 }, { height: 56, width: 56 }, [new Gravity(), new Physics]),
            new Entity({ x: 400, y: 10 }, { height: 56, width: 56 }, [new Gravity(), new Physics]),
            new Entity({ x: 10, y: 0 }, { height: 5, width: 1000 }),
            new MovingBlock({ x: 550, y: 20 }, { height: 16, width: 500 }),
            new Entity({ x: 50, y: 700 }, { height: 500, width: 10 }),

        ]).init()
}

main()