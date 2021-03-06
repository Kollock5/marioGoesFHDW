export var keys = {
    alt: false,
    shift: false,
    left: false,
    up: false,
    right: false,
    down: false,
    esc: false,

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
            case "Alt":
                keys.alt = status
                break;
            case "Shift":
                keys.shift = status
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
            case "Escape":
                keys.esc = status
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
    }
}