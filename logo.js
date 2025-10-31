
class Upper_L {
    /**
     * @param {Position} position - Top-left corner of the letter
     * @param {number} scale - Scaling factor for the letter size
     */
    constructor(position, scale) {
        this.position = position;
        this.scale = scale;
    }

    /**
     * Draws the uppercase "L" to the canvas.
     */
    display() {
        noStroke();
        fill(0, 95, 115);
        // Vertical part of "L"
        rect(this.position.x, this.position.y, this.scale * 20, this.scale * 80);
        // Horizontal base of "L"
        rect(this.position.x, this.position.y + (this.scale * 80), this.scale * 70, this.scale * 20);
    }
}

/**
 * Class: Lower_L
 * Purpose: Displays a lowercase "l" as a vertical rectangle.
 */
class Lower_L {
    constructor(position, scale) {
        this.position = position;
        this.scale = scale;
    }

    /**
     * Draws the lowercase "l" to the canvas.
     */
    display() {
        noStroke();
        fill(187, 62, 3);
        rect(this.position.x, this.position.y, this.scale * 20, this.scale * 100);
    }
}

/**
     * Class: Lower_O
     * Purpose: Displays a lowercase "o" as a filled circle with a hollow center.
     */
class Lower_O {
    constructor(position, scale) {
        this.position = position;
        this.scale = scale;
    }

    /**
     * Draws the lowercase "o" with an outline effect.
     */
    display() {
        noStroke();
        fill(238, 155, 0);
        // Outer circle
        circle(this.position.x, this.position.y + (this.scale * 65), this.scale * 70);
        // Inner circle (background-colored to create hollow effect)
        fill(0, 18, 25);
        circle(this.position.x, this.position.y + (this.scale * 65), this.scale * 35);
    }
}


/**
 * Class: Upper_P
 * Purpose: Displays an uppercase "P" using rectangles and ellipses.
 */
class Upper_P {
    constructor(position, scale) {
        this.position = position;
        this.scale = scale;
    }

    /**
     * Draws the uppercase "P".
     */
    display() {
        noStroke();
        fill(148, 210, 189);
        // Vertical stem
        rect(this.position.x, this.position.y, this.scale * 20, this.scale * 100);
        // Horizontal bar into circular head
        rect(this.position.x + (this.scale * 20), this.position.y, this.scale * 20, this.scale * 60);
        ellipse(this.position.x + (this.scale * 40), this.position.y + this.scale * 30, this.scale * 60, this.scale * 60);

        // Inner cutout
        fill(0, 18, 25);
        rect(this.position.x + (this.scale * 20), this.position.y + (this.scale * 20), this.scale * 20, this.scale * 20);
        ellipse(this.position.x + (this.scale * 40), this.position.y + this.scale * 30, this.scale * 20, this.scale * 20);
    }
}

/**
     * Class: Dot
     * Purpose: Displays a small circular dot, representing punctuation.
     */
class Dot {
    constructor(position, scale) {
        this.position = position;
        this.scale = scale;
    }

    /**
     * Draws the dot.
     */
    display() {
        noStroke();
        fill(155, 34, 38);
        circle(this.position.x, this.position.y + (this.scale * 90), this.scale * 20);
    }
}


/**
     * Class: Sliding_Animation
     * Purpose: Moves a set of positions smoothly across the canvas over time.
     */
class Sliding_Animation {
    /**
     * @param {Array<Position>} positions - Array of positions to move
     * @param {number} time - Time (seconds) for the animation
     * @param {number} x_move - Distance to move horizontally
     * @param {number} y_move - Distance to move vertically
     */
    constructor(positions, time, x_move, y_move) {
        this.positions = positions;
        this.step_counter = 0;
        this.max_steps = time * 60; // frames at 60 FPS
        this.step_size_x = (x_move / time) / 60;
        this.step_size_y = (y_move / time) / 60;
    }

    /**
     * Updates positions each frame to create sliding effect.
     */
    animate() {
        if (this.step_counter < this.max_steps) {
            this.step_counter++;
            for (let position of this.positions) {
                position.x += this.step_size_x;
                position.y += this.step_size_y;
            }
        }
    }
}


/**
 * Class: Bouncing_Animation
 * Purpose: Moves a position in a bouncing arc pattern.
 */
class Bouncing_Animation {
    /**
     * @param {Position} position - The object’s position reference
     * @param {number} time - Duration of bounce in seconds
     * @param {number} x_move - Horizontal travel distance
     * @param {number} max_height - Maximum vertical height of bounce
     */
    constructor(position, time, x_move, max_height) {
        this.position = position;
        this.finalX = position.x;
        this.finalY = position.y;

        this.x_move = x_move;
        this.max_height = max_height;
        this.time = time;

        this.step_counter = 0;
        this.max_steps = time * 60; // frames at 60 FPS
    }

    /**
     * Updates the position each frame to simulate bounce motion.
     */
    animate() {
        if (this.step_counter < this.max_steps) {
            this.step_counter++;

            // Move horizontally
            this.position.x = this.finalX + this.x_move * (this.max_steps - this.step_counter) / this.max_steps;

            // Simulated bounce path
            let currentTime = this.time * (this.max_steps - this.step_counter) / this.max_steps;
            this.position.y = this.finalY - Math.abs(this.max_height * currentTime * Math.cos(currentTime * 5));
        }
    }
}


/**
 * Class: Position
 * Purpose: Stores x and y coordinates for reuse in letters and animations.
 */
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function logoScreenText() {
    rectMode(CENTER);
    fill(256);
    textFont('Courier New', width * 0.03);
    textAlign(CENTER, CENTER);
    text("PRESS ANYWHERE TO CONTINUE...", 0.5 * width, 0.8 * height, 1 * width, 0.1 * height);
    rectMode(CORNER);
}

var continueToMenu = 60 * 4.5;

class LogoScene extends Scene {

    constructor(switchScene) {
        super();

        this.switchScene = switchScene;

        var centeredX = 150;
        var centeredY = 150;

        // Define Letters
        this.upperL = new Upper_L(new Position(centeredX - 1400, centeredY), 1);
        this.upperP = new Upper_P(new Position(centeredX, centeredY - 500), 1);
        this.lowerO = new Lower_O(new Position(centeredX + 105, centeredY - 500), 1);
        this.lowerL = new Lower_L(new Position(centeredX + 150, centeredY - 500), 1);
        this.dot = new Dot(new Position(centeredX + 190, centeredY), 1);

        // Define Animations
        this.downAnimation = new Sliding_Animation([this.upperP.position, this.lowerO.position, this.lowerL.position], 0.2, 0, 500);
        this.rightAnimation = new Sliding_Animation([this.upperL.position], 0.8, 1300, 0);
        this.bounceAnimation = new Bouncing_Animation(this.dot.position, 3, 600, 300);
    }


    mouseClicked() {
        this.switchScene("Menu");
    }



    /**
     * p5.js draw function.
     * Clears background, displays letters, and runs animations each frame.
     */
    draw() {
        background(0, 18, 25);

        // Draw letters
        this.upperL.display();
        this.lowerL.display();
        this.lowerO.display();
        this.upperP.display();
        this.dot.display();

        // Run animations
        this.downAnimation.animate();
        this.rightAnimation.animate();
        this.bounceAnimation.animate();

        logoScreenText();

        // if (frameCount > continueToMenu) {
        //     this.switchScene("Menu");
        // }
    }
}