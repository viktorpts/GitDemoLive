(function init() {
    // Init canvas
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    // Constants
    let constants = {
        acceleration: 1,
        maxSpeed: 5,
        gravity: 1,
        friction: 0.5,
        jump: 20
    };


    // Definitions
    let person = {
        x: 400,
        y: 300,
        velx: 0,
        vely: 0,
        onGround: false
    };

    // Controller
    let keysDown = {};
    window.addEventListener('keydown', kbdHandler);
    window.addEventListener('keyup', kbdHandler);
    function kbdHandler(event) {
        if (event.type === 'keydown') {
            keysDown[event.code] = true;
        } else if (event.type === 'keyup') {
            delete keysDown[event.code];
        }
    }


    // Execution
    main();

    function update() {
        // Apply friction
        if (person.onGround) {
            if (person.velx > 0) {
                if (person.velx > constants.friction) {
                    person.velx -= constants.friction;
                } else {
                    person.velx = 0;
                }
            } else if (person.velx < 0) {
                if (person.velx < -constants.friction) {
                    person.velx += constants.friction;
                } else {
                    person.velx = 0;
                }
            }
        }

        // Apply gravity
        if (!person.onGround) {
            person.vely += constants.gravity;
        }

        // Player controls
        if (keysDown["ArrowLeft"]) {
            person.velx -= constants.acceleration;
            if (person.velx < -constants.maxSpeed) {
                person.velx = -constants.maxSpeed;
            }
        }
        if (keysDown["ArrowRight"]) {
            person.velx += constants.acceleration;
            if (person.velx > constants.maxSpeed) {
                person.velx = constants.maxSpeed;
            }
        }
        if (keysDown["Space"]) {
            if (person.onGround) {
                person.onGround = false;
                person.vely -= constants.jump;
            }
        }

        // Apply movement
        person.x += person.velx;
        person.y += person.vely;

        // Check bounding
        if (person.y > 500) {
            person.onGround = true;
            person.y = 500;
            person.vely = 0;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, 800, 600);

        ctx.save();

        ctx.translate(person.x, person.y);
        ctx.fillRect(-25, -100, 50, 100);

        ctx.restore();
    }

    function main() {
        update();
        draw();

        requestAnimationFrame(main);
    }
})();