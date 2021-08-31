import { Level } from "./Level.js";
import { levelEditor } from "./levelEditor.js";
import { dev1 } from "../level/dev1.js"
import { jsonConverter } from "./util/jsonConverter.js";


function main() {
    let lvlEditor = false

    if (lvlEditor) {
        new levelEditor()
    } else {
        new Level(
            'Hello',
            jsonConverter.fromJson(dev1)
        ).init()
    }
}

main()