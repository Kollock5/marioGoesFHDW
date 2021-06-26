function levelController() {
    var level = new Level(
        'Hello', [
            new MovingEntity({ x: 50, y: 50 }, { height: 455, width: 12 }, 50, 0.4),
            new Entity({ x: 232, y: 112 }, { height: 23, width: 56 }),
            new MovingEntity({ x: 50, y: 500 }, { height: 16, width: 500 }, 250, 2.4, MovingEntity.VERTICAL),
        ])
    document.getElementById("title").innerHTML = level.name

    console.log(JSON.stringify(level))

    setInterval(
        () => {
            level.Entitys.forEach(element => {
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

    level.Entitys.forEach(element => {
        game.appendChild(element.createHtml())
    });
}

// function keyBoardListner(params) {
//     document.addEventListener('keydown', function(event) {
//         switch (event.key) {
//             case "ArrowDown":
//                 console.log("down")
//                 if (isArrowDown == false) {
//                     isArrowDown = true;
//                     level.Entitys[0].onTick(1)
//                 }
//                 break;
//             case "ArrowUp":
//                 // code for "up arrow" key press.
//                 break;
//             case "ArrowLeft":
//                 // code for "left arrow" key press.
//                 break;
//             case "ArrowRight":
//                 // code for "right arrow" key press.
//                 break;
//             default:
//                 return; // Quit when this doesn't handle the key event.
//         }
//     });

//     document.addEventListener('keyup', function(event) {
//         switch (event.key) {
//             case "ArrowDown":
//                 console.log("up")
//                 this.isArrowDown = true;
//                 break;
//             case "ArrowUp":
//                 // code for "up arrow" key press.
//                 break;
//             case "ArrowLeft":
//                 // code for "left arrow" key press.
//                 break;
//             case "ArrowRight":
//                 // code for "right arrow" key press.
//                 break;
//             default:
//                 return; // Quit when this doesn't handle the key event.
//         }
//     });
// }