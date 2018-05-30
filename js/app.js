// Enemies our player must avoid
class Enemy {
    constructor() {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.reset();
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        for (const enemy of allEnemies) {
            enemy.x += enemy.speed * dt;

            // Respawn enemy if out of bounds
            if (enemy.x >= 503)
                enemy.reset();

            // Detect enemy collision
            if (Math.abs(enemy.x - player.x) <= 67 && enemy.y === player.y) {
                if (score > hi_score) {
                    hi_score = score;
                    sessionStorage.setItem('score', hi_score);
                    document.querySelector('.hi-score').textContent = `High Score: ${hi_score}`;
                }

                score = 0;
                document.querySelector('.score').textContent = `Score: 0`;
                player.reset();
            }
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Reset the enemy speed and position
    reset() {
        this.x = -103;
        this.y = (() => {
            const row = Math.floor(Math.random() * 3); // y position is an integer

            switch(row) {
                case 0:
                    return 68;
                case 1:
                    return 151;
                case 2:
                    return 234;
            }
        })(); // execute function immediately and assign this.y to return value
        this.speed = Math.random() * 100 + 50; // speed is a double
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.reset();
    }

    update() {} // unused

    // Draw the player on screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Move player based on input
    // Parameter: dir, the player's direction
    handleInput(dir) {
        switch (dir) {
            // Note: px increases right and down
            case 'left':
                if (this.x !== -2) // left boundary
                    this.x -= 101; // block width = 101px
                break;
            case 'up':
                // no upper boundary
                this.y -= 83; // block height = 83px
                break;
            case 'right':
                if (this.x !== 402) // right boundary
                    this.x += 101;
                break;
            case 'down':
                if (this.y !== 400) // lower boundary
                    this.y += 83;
                break;
        }

        if (this.y === -15) { // -15px = water (player won)
            document.querySelector('.score').textContent = `Score: ${++score}`;
            this.reset();
        }
    }

    // Reset player position
    reset() {
        this.x = 200;
        this.y = 400; // bottom center of canvas
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [new Enemy(), new Enemy(), new Enemy()];
const player = new Player();
let score = 0;
let hi_score = sessionStorage.getItem('score') || 0; // short-circuits to 0 if sessionStorage is null
document.querySelector('.hi-score').textContent = `High Score: ${hi_score}`;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Note: 'keydown' used instead 'keyup' for immediate button response
document.addEventListener('keydown', e => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
