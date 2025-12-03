/**
 * menu.js
 * 
 * All objects used to display menu screen and their functionality
 */

class TapPractice {
    constructor() {
        this.tapOne = new Tap(0.2, 0.15, 2, color(188, 49, 247), 1);
        this.tapTwo = new Tap(0.25, 0.15, 2.5, color(188, 49, 247), 2);
        this.tapThree = new Tap(0.2, 0.25, 3, color(188, 49, 247), 3);

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

function blurb1() {
    rectMode(CENTER);
    strokeWeight(1);
    fill(256);
    let fontSize = width * 0.02;
    textFont('Courier New', fontSize);
    textAlign(CENTER, CENTER);
    text("Try It Out!!!", 0.5 * width, 0.05 * height,  width * 1, height * 0.2);
    rectMode(CORNER);
}

function blurb2() {
    rectMode(CENTER);
    strokeWeight(1);
    fill(256);
    let fontSize = width * 0.02;
    textFont('Courier New', fontSize);
    textAlign(CENTER, CENTER);
    text("Click the notes when the notes \nwhen their circles close.", 0.5 * width, 0.2 * height,  width * 1, height * 0.2);
    rectMode(CORNER);
}

function blurb3() {
    rectMode(CENTER);
    strokeWeight(1);
    fill(256);
    let fontSize = width * 0.02;
    textFont('Courier New', fontSize);
    textAlign(CENTER, CENTER);
    text("Click the note when the circle closes" +
        " \nthen hold and follow the note \n" +
        "until it ends.", 0.5 * width, 0.5 * height,  width * 1, height * 0.2);
    rectMode(CORNER);
}

function blurb4() {
    rectMode(CENTER);
    strokeWeight(1);
    fill(256);
    let fontSize = width * 0.02;
    textFont('Courier New', fontSize);
    textAlign(CENTER, CENTER);
    text("Spin the spinner as many times as possible" +
        " \n before the given time elapses \n", 
        0.5 * width, 0.8 * height,  width * 1, height * 0.2);
    rectMode(CORNER);
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
        this.backButton = new ImageButton(0.01, 0.01, 0.05, 0.08, switchScene, "Menu", backButton);
        this.slide = new Slide(0.1, 0.5, 0.3, 0.6, 0.5, 0.7, 0.9, 0.5, 5, 2, color(188, 49, 247), 3);
    }

    // Handle mouse clicks
    mouseClicked() {
        this.tapPractice.checkTaps();
        this.backButton.checkClick();
    }

    mouseMoved() {
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
        image(bg, -50, -50, width + 100, height + 100);
        this.tapPractice.draw();
        
        this.slide.draw();

        blurb1();
        blurb2();
        blurb3();
        blurb4();

        this.backButton.draw();
        this.cursor.draw();
    }
}
