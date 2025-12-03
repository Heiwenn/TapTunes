/**
 * menu.js
 * 
 * All objects used to display menu screen and their functionality
 */



// ----------------------------------
// Menu Scene
// Displays animated title, invaders, and Start button
// ----------------------------------
class OptionsScene extends Scene {

    constructor(switchScene) {
        super();

        this.backButton = new ImageButton(0.01, 0.01, 0.05, 0.08, switchScene, "Menu", backButton);

        this.sfx_slider = createSlider(0, 100, sfxVolume * 100, 0);
        this.sfx_slider.position(0.4 * width, 0.4 * height);
        this.sfx_slider.size(0.2 * width);
        this.sfx_slider.hide();

        this.master_slider = createSlider(0, 100, masterVolume * 100, 0);
        this.master_slider.position(0.4 * width, 0.6 * height);
        this.master_slider.size(0.2 * width);
        this.master_slider.hide();

        this.buttonOneSelect = new TextButton(0.5, 0.65, 0.05, 0.05, this.buttonClicked.bind(this), 1, buttonOneString, 0.03);
        this.buttonTwoSelect = new TextButton(0.55, 0.65, 0.05, 0.05, this.buttonClicked.bind(this), 2, buttonTwoString, 0.03);

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
    }

    unload() {
        this.sfx_slider.hide();
        this.master_slider.hide();
    }

    /**
     * p5.js draw function.
     * Clears background, moves invaders, and draws everything each frame.
     */
    draw() {
        background(0);
        this.backButton.draw();
        this.buttonOneSelect.draw();
        this.buttonTwoSelect.draw();

        image(menuCursor, mouseX, mouseY, width / 25, width / 25);
    }
}
