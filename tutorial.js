/**
 * menu.js
 * 
 * All objects used to display menu screen and their functionality
 */

class TapPractice {
    constructor() {
        this.tapOne = new Tap(0.1, 0.1, 2, color(188, 49, 247), 1);
        this.tapTwo = new Tap(0.15, 0.1, 2.5, color(188, 49, 247), 2);
        this.tapThree = new Tap(0.1, 0.2, 3, color(188, 49, 247), 3);

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

    checkTaps() {
        this.tapOne.checkTap();
        this.tapTwo.checkTap();
        this.tapThree.checkTap();
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
        this.slide = new Slide(0.1, 0.5, 0.3, 0.6, 0.5, 0.7, 0.9, 0.5, 5, 2, color(188, 49, 247), 3);
    }

    // Handle mouse clicks
    mouseClicked() {
        this.tapPractice.checkTaps();
    }

    mouseMoved() {
        //console.log("Do Nothing");
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
        this.tapPractice.draw();
        this.cursor.draw();
        this.slide.draw();
    }
}
