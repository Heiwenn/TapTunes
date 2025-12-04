/**
 * menu.js
 * 
 * All objects used to display menu screen and their functionality
 */

function options() {
    rectMode(CENTER);
    fill(256);
    let fontSize = width * 0.11;
    textFont(titleFont, fontSize);
    textAlign(CENTER, CENTER);
    text("Options", 0.5 * width, 0.1 * height, width * 1, height * 0.2);
    rectMode(CORNER);
}

function getCanvasOffset() {
    const rect = canvas.elt.getBoundingClientRect();
    return { x: rect.left, y: rect.top };
}

// ----------------------------------
// Menu Scene
// Displays animated title, invaders, and Start button
// ----------------------------------
class OptionsScene extends Scene {

    constructor(switchScene) {
        super();

        this.backButton = new ImageButton(0.01, 0.01, 0.05, 0.08, switchScene, "Menu", backButton);

        this.sfx_slider = createSlider(0, 1, sfxVolume, 0);
        this.sfx_slider.parent("game-container");
        this.sfx_slider.position(0.4 * width, 0.4 * height);
        this.sfx_slider.size(0.2 * width);
        this.sfx_slider.hide();

        this.master_slider = createSlider(0, 1, masterVolume, 0);
        this.master_slider.parent("game-container");
        this.master_slider.position(0.4 * width, 0.6 * height);
        this.master_slider.size(0.2 * width);
        this.master_slider.hide();

        this.buttonOneSelect = new TextButton(0.475, 0.68, 0.05, 0.05, this.buttonClicked.bind(this), 1, buttonOneString, 0.03);
        this.buttonTwoSelect = new TextButton(0.525, 0.68, 0.05, 0.05, this.buttonClicked.bind(this), 2, buttonTwoString, 0.03);

        this.buttonOneChange = false;
        this.buttonTwoChange = false;
    }

    buttonClicked(button) {
        if (button === 1) {
            this.buttonOneChange = true;
            this.buttonOneSelect.setText("-");
        } else if (button === 2) {
            this.buttonTwoChange = true;
            this.buttonTwoSelect.setText("-");
        }
    }

    keyPressed() {
        if (this.buttonOneChange) {
            buttonOne = keyCode;
            buttonOneString = key;
            this.buttonOneSelect.setText(buttonOneString);
            this.buttonOneChange = false;
        } else if (this.buttonTwoChange) {
            buttonTwo = keyCode;
            buttonTwoString = key;
            this.buttonTwoSelect.setText(buttonTwoString);
            this.buttonTwoChange = false;
        }
    }

    // Handle mouse clicks
    mouseClicked() {
        outputVolume(this.master_slider.value());
        masterVolume = this.master_slider.value();
        sfxVolume = this.sfx_slider.value();
        clickSound.setVolume(sfxVolume);

        if (this.buttonOneChange) {
            this.buttonOneSelect.setText(buttonOneString);
            this.buttonOneChange = false;
        } else if (this.buttonTwoChange) {
            this.buttonTwoSelect.setText(buttonTwoString);
            this.buttonTwoChange = false;
        }

        this.backButton.checkClick();
        this.buttonOneSelect.checkClick();
        this.buttonTwoSelect.checkClick();
    }

    mouseMoved() {
        this.buttonOneSelect.checkMousePosition();
        this.buttonTwoSelect.checkMousePosition();
    }

    load() {
        this.sfx_slider.show();
        this.master_slider.show();
        cursor(HAND);
        let offset = getCanvasOffset();

        this.master_slider.position(offset.x + 0.3 * width, offset.y + 0.35 * height);
        this.master_slider.size(0.4 * width);
        this.sfx_slider.position(offset.x + 0.3 * width, offset.y + 0.525 * height);
        this.sfx_slider.size(0.4 * width);
        menuMusic.loop();
    }

    unload() {
        this.sfx_slider.hide();
        this.master_slider.hide();
        noCursor();
        menuMusic.stop();
    }

    /**
     * p5.js draw function.
     * Clears background, moves invaders, and draws everything each frame.
     */
    draw() {
        image(bg, -50, -50, width + 100, height + 100);
        this.backButton.draw();
        this.buttonOneSelect.draw();
        this.buttonTwoSelect.draw();

        rectMode(CENTER);
        fill(255);
        stroke(255);
        let fontSize = width * 0.02;
        textFont('Courier New', fontSize);
        textAlign(CENTER, CENTER);
        text("Master Volume", (0.5) * width, (0.3) * height, width, 0.1 * height);
        text("SFX Volume", (0.5) * width, (0.45) * height, width, 0.1 * height);
        text("Key-Binds", (0.5) * width, (0.6) * height, width, 0.1 * height);
        rectMode(CORNER);

        options();

        //image(menuCursor, mouseX, mouseY, width / 25, width / 25);
    }
}
