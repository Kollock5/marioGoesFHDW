export var keys = {
    accelerate: false,
    left: false,
    up: false,
    right: false,
    down: false,

    init: function() {
        document.addEventListener('keydown', function(event) {
            keys.handler(event, true)
        })
        document.addEventListener('keyup', function(event) {
            keys.handler(event, false)
        })
    },
    handler: function(event, status) {
        switch (event.key) {
            case "Ctrl":
                keys.accelerate = status
                break;
            case "ArrowDown":
                keys.down = status
                break;
            case "ArrowUp":
                keys.up = status
                break;
            case "ArrowLeft":
                keys.left = status
                break;
            case "ArrowRight":
                keys.right = status
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
    }
}