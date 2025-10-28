/**
 * menu.js
 * 
 * All objects used to display menu screen and their functionality
 */

class TapPractice {
    constructor() {
        this.tapOne = new Tap(0.1, 0.1, 3, color(188, 49, 247, 100), 1);
        this.tapTwo = new Tap(0.15, 0.1, 4, color(188, 49, 247, 100), 2);
        this.tapThree = new Tap(0.1, 0.2, 5, color(188, 49, 247, 100), 3);

        this.tapOne.start();
        this.tapTwo.start();
        this.tapThree.start();

        this.delay = 90;
        this.counter = 0;
    }

    restartTaps() {
        this.tapOne.start();
        this.tapTwo.start();
        this.tapThree.start();
        this.counter = 0;
    }

    draw() {
        this.tapOne.draw();
        this.tapTwo.draw();
        this.tapThree.draw();


        if (this.tapThree.done) {
            this.counter++;
            if (this.counter > this.delay) {
                this.restartTaps();
            }
        }
    }
}

// ----------------------------------
// Menu Scene
// Displays animated title, invaders, and Start button
// ----------------------------------
class TutorialScene extends Scene {

    constructor(switchScene) {
        super();
        this.cursor = new GameCursor(color(188, 49, 247, 100));
        this.tapPractice = new TapPractice();
    }

    // Handle mouse clicks
    mouseClicked() {
    }

    mouseMoved() {
        console.log("Do Nothing");
    }

    load() {
    }

    unload() {
    }

    /**
     * p5.js draw function.
     * Clears background, moves invaders, and draws everything each frame.
     */
    draw() {
        background(0);
        this.cursor.draw();
        this.tapPractice.draw();
    }
}
