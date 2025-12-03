/**
 * menu.js
 * 
 * All objects used to display menu screen and their functionality
 */



// ----------------------------------
// Menu Scene
// Displays animated title, invaders, and Start button
// ----------------------------------
class CreditsScene extends Scene {

    constructor(switchScene) {
        super();
        this.backButton = new ImageButton(0.01, 0.01, 0.05, 0.08, switchScene, "Menu", backButton);
    }

    // Handle mouse clicks
    mouseClicked() {
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
        this.backButton.draw();

        image(menuCursor, mouseX, mouseY, width / 25, width / 25);
    }
}
