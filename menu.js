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
    }

    collides() {

    }

    draw() {
        fill(126, 33, 166, 150);
        stroke(255);
        rect(this.x * width - this.w * width / 2, this.y * height - this.h * height / 2, this.w * width, this.h * height);
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
        this.playButton = new MenuButton(0.5, 0.5, 0.4, 0.2);
    }

    // Handle mouse clicks
    mouseClicked() {
        
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
        this.soundVisualizer.draw();
        this.playButton.draw();
    }
}
