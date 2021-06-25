function levelController() {
    var level = new Level(
        'Hello', [
            new MovingBlock({ x: 50, y: 50 }, { height: 455, width: 12 }, 50, 0.4),
            new Blocks({ x: 232, y: 112 }, { height: 23, width: 56 }),
            new MovingBlock({ x: 50, y: 500 }, { height: 16, width: 500 }, 250, 2.4, MovingBlock.VERTICAL),
        ])
    document.getElementById("title").innerHTML = level.name

    console.log(JSON.stringify(level))

    setInterval(
        () => {
            level.blocks.forEach(element => {
                element.onTick(1)
            });
            buildLvl(level)
        },
        10
    );
}

function buildLvl(level) {
    var game = document.getElementById("game")
    while (game.hasChildNodes()) {
        game.removeChild(game.firstChild);
    }

    level.blocks.forEach(element => {
        var newElement = document.createElement("div");
        newElement.setAttribute('id', element.id)
        newElement.setAttribute('class', "block")
        newElement.style.bottom = element.pos.x + ".px"
        newElement.style.left = element.pos.y + ".px"
        newElement.style.height = element.size.height + ".px"
        newElement.style.width = element.size.width + ".px"

        game.appendChild(newElement)
    });

}


/*
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case "ArrowDown":
            console.log("down")
            break;
        case "ArrowUp":
            // code for "up arrow" key press.
            break;
        case "ArrowLeft":
            // code for "left arrow" key press.
            break;
        case "ArrowRight":
            // code for "right arrow" key press.
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
});
*/