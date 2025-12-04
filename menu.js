/**
 * menu.js
 * 
 * All objects used to display menu screen and their functionality
 */

class SoundVisualizer {

    constructor(numBars, maxHeight) {
        this.numBars = numBars;
        this.maxHeight = maxHeight;
        this.fft = new p5.FFT(0.8, numBars);
    }

    draw() {
        this.fft.analyze();
        let amp = this.fft.getEnergy(20, 200);

        push();
        if (amp > 230) {
            rotate(random(-PI / 180, PI / 180));
        }
        image(bg, -50, -50, width + 100, height + 100);
        pop();

        // let spectrum = this.fft.analyze();
        // let rw = width / (1.1*this.numBars + 0.1);

        stroke(255);
        //fill(247, 99, 222, 100);
    
        // for (let i = 0; i < this.numBars; i++) {
        //     let x = rw * 0.1 + rw * 1.1 * i;
        //     let rh = height * this.maxHeight * spectrum[i] / 255;
        //     let y = height - rh;
        //     rect(x, y, rw, rh);
        // }

        noFill();
        let wave = this.fft.waveform();

        let cH = height / 20 / 2;

        //Bottom
        for (let j = 1; j < 20; j++) {
            stroke(196, 59 + j * 10, 255);
            beginShape();
            for (let i = 0; i < width; i++) {
                let index = floor(map(i, 0, width, 0, wave.length));
                let x = i;
                let y = wave[index] * cH * j + height;
                vertex(x, y);
            }
            endShape();
        }

        //Top
        for (let j = 1; j < 20; j++) {
            stroke(196, 59 + j * 10, 255);
            beginShape();
            for (let i = 0; i < width; i++) {
                let index = floor(map(i, 0, width, 0, wave.length));
                let x = i;
                let y = wave[index] * cH * j;
                vertex(x, y);
            }
            endShape();
        }
        

    }

}

class MenuButton {
    constructor (x, y, w, h, action, argument, text) {
        this.x = x;
        this.y = y;
        this.w = w; 
        this.h = h;
        this.action = action;
        this.text = text;
        this.hovering = false;
        this.argument = argument;
    }

    mouseCollides() {
        let mX = mouseX / width;
        let mY = mouseY / height;
        let insideX = (mX > this.x - this.w / 2) && (mX < this.x + this.w / 2);
        let insideY = (mY > this.y - this.h / 2) && (mY < this.y + this.h / 2);

        return (insideX && insideY);        
    }

    checkMousePosition() {
        this.hovering = this.mouseCollides();
    }

    checkClick() {
        if (this.hovering) {
            this.action(this.argument);
        }
    }


    draw() {
        rectMode(CENTER);
        fill(126, 33, 166, 150);
        stroke(255);
        if (this.hovering) {
            strokeWeight(3);
        }
        rect(this.x * width, this.y * height, this.w * width, this.h * height);
        strokeWeight(1);

        fill(256);
        textFont(menuFont);
        textSize(width * 0.08);
        textAlign(CENTER, CENTER);
        text(this.text, this.x * width, this.y * height, this.w * width, this.h * height);
        rectMode(CORNER);
    }
}


class GameSimulation {
    constructor() {
        this.tapOne = new Tap(0.1, 0.1, 0, 1, color(188, 49, 247), 1);
        this.tapTwo = new Tap(0.15, 0.7, 0, 1.5, color(188, 49, 247), 2);
        this.tapThree = new Tap(0.3, 0.3, 0, 2, color(188, 49, 247), 3);
        this.tapFour = new Tap(0.5, 0.95, 0, 1.5, color(188, 49, 247), 4);
        this.tapFive = new Tap(0.7, 0.15, 0, 1.5, color(188, 49, 247), 5);
        this.tapSix = new Tap(0.9, 0.9, 0, 1.5, color(188, 49, 247), 6);
        this.tapOne.start();
        this.tapTwo.start();
        this.tapThree.start();
        // this.tapFour.start();
        // this.tapFive.start();
        // this.tapSix.start();

        this.fourStarted = false;
        this.fiveStarted = false;
        this.sixStarted = false;

        this.delay = 90;
        this.counter = 0;
    }

    restartTaps() {
        this.tapOne.start();
        this.tapTwo.start();
        this.tapThree.start();
        // this.tapFour.start();
        // this.tapFive.start();
        // this.tapSix.start();

        this.fourStarted = false;
        this.fiveStarted = false;
        this.sixStarted = false;
        
        this.counter = 0;
    }

    draw() {
        this.tapOne.draw();
        this.tapTwo.draw();
        this.tapThree.draw();
        this.tapFour.draw();
        this.tapFive.draw();
        this.tapSix.draw();

        if (this.tapOne.done && !this.fourStarted) {
            this.fourStarted = true;
            this.tapFour.start();
        }
        if (this.tapTwo.done && !this.fiveStarted) {
            this.fiveStarted = true;
            this.tapFive.start();
        }
        if (this.tapThree.done && !this.sixStarted) {
            this.sixStarted = true;
            this.tapSix.start();
        }


        if (this.tapSix.done && this.tapThree.done) {
            this.counter++;
            if (this.counter > this.delay) {
                this.restartTaps();
            }
        }
    }
}

function authorName() {
    rectMode(CENTER);
    fill(256);
    textFont('Courier New', width * 0.02);
    textAlign(CENTER, CENTER);
    text("Written By Lucas Polanco", 0.16 * width, 0.975 * height, 0.4 * width, 0.08 * height);
    rectMode(CORNER);
}

function title() {
    rectMode(CENTER);
    fill(256);
    let fontSize = width * 0.11;
    textFont(titleFont, fontSize);
    textAlign(CENTER, CENTER);
    text("TAP", 0.3 * width, 0.1 * height,  width * 1, height * 0.2);
    text("TUNES", 0.6 * width, 0.23 * height,  width * 1, height * 0.2);
    rectMode(CORNER);
}

// ----------------------------------
// Menu Scene
// Displays animated title, invaders, and Start button
// ----------------------------------
class MenuScene extends Scene {

    constructor(switchScene) {
        super();
        this.soundVisualizer = new SoundVisualizer(1024, 1);

        let buttonHeight = 0.13

        this.playButton = new MenuButton(0.5, 0.4, 0.4, buttonHeight, switchScene, "Select", "PLAY");
        this.optionsButton = new MenuButton(0.5, 0.55, 0.4, buttonHeight, switchScene, "Options", "OPTIONS");
        this.tutorialButton = new MenuButton(0.5, 0.7, 0.4, buttonHeight, switchScene, "Tutorial", "TUTORIAL");
        this.creditsButton = new MenuButton(0.5, 0.85, 0.4, buttonHeight, switchScene, "Credits", "CREDITS");
        this.GameSimulation = new GameSimulation();
    }

    // Handle mouse clicks
    mouseClicked() {
        this.playButton.checkClick();
        this.optionsButton.checkClick();
        this.tutorialButton.checkClick();
        this.creditsButton.checkClick();
    }

    mouseMoved() {
        this.playButton.checkMousePosition();
        this.optionsButton.checkMousePosition();
        this.tutorialButton.checkMousePosition();
        this.creditsButton.checkMousePosition();
    }

    load() {
        noCursor();
        menuMusic.loop();
    }

    unload() {
        menuMusic.stop();
    }

    /**
     * p5.js draw function.
     * Clears background, moves invaders, and draws everything each frame.
     */
    draw() {
        background(0);
        // image(bg, 0, 0, width, height);
        this.soundVisualizer.draw();
        this.GameSimulation.draw();
        this.playButton.draw();
        this.optionsButton.draw();
        this.tutorialButton.draw();
        this.creditsButton.draw();
        authorName();
        title();

        image(menuCursor, mouseX, mouseY, width / 25, width / 25);
    }
}
