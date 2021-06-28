import { Level } from "./Level.js";
import { Entity } from "./Entity.js";
import { MovingBlock } from "./entities/MovingBlock.js";
import { Gravity } from "./properties/Gravity.js";

function main() {
    var level = new Level(
        'Hello', [
            new MovingBlock({ x: 50, y: 50 }, { height: 455, width: 12 }),
            new Entity({ x: 232, y: 112 }, { height: 23, width: 56 }),
            new Entity({ x: 532, y: 512 }, { height: 56, width: 56 }, [new Gravity()]),
            new MovingBlock({ x: 50, y: 500 }, { height: 16, width: 500 }),
        ]).init()

}

main()