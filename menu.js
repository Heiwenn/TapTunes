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
    constructor (x, y, w, h, action, text) {
        this.x = x;
        this.y = y;
        this.w = w; 
        this.h = h;
        this.action = action;
        this.text = text;
        this.hovering = false;
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
            // Clicked
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
        textSize(48);
        textAlign(CENTER, CENTER);
        //rectMode(CENTER);
        text(this.text, this.x * width, this.y * height, this.w * width, this.h * height);
        rectMode(CORNER);
    }
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

        this.playButton = new MenuButton(0.5, 0.4, 0.4, buttonHeight, "action", "PLAY");
        this.optionsButton = new MenuButton(0.5, 0.55, 0.4, buttonHeight, "action", "OPTIONS");
        this.tutorialButton = new MenuButton(0.5, 0.7, 0.4, buttonHeight, "action", "TUTORIAL");
        this.creditsButton = new MenuButton(0.5, 0.85, 0.4, buttonHeight, "action", "CREDITS");
    }

    // Handle mouse clicks
    mouseClicked() {
        // this.playButton.collides();
        // this.optionsButton.collides();
        // this.tutorialButton.collides();
    }

    mouseMoved() {
        this.playButton.checkMousePosition();
        this.optionsButton.checkMousePosition();
        this.tutorialButton.checkMousePosition();
        this.creditsButton.checkMousePosition();
    }

    load() {
        menuMusic.loop();
        bg.filter(BLUR, 20);
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
        //this.soundVisualizer.draw();
        this.playButton.draw();
        this.optionsButton.draw();
        this.tutorialButton.draw();
        this.creditsButton.draw();
    }
}
