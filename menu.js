/**
 * menu.js
 * 
 * All objects used to display menu screen and their functionality
 */



// ----------------------------------
// Menu Scene
// Displays animated title, invaders, and Start button
// ----------------------------------
class MenuScene extends Scene {

    constructor(switchScene) {
        super();
    }

    // Handle mouse clicks
    mouseClicked() {
        // If start button clicked → switch to Game scene
        if (this.startButton.collides(mouseX, mouseY)) {
            this.switchScene("Game");
        }
    }

    /**
     * p5.js draw function.
     * Clears background, moves invaders, and draws everything each frame.
     */
    draw() {
        background(0, 18, 25); // dark background
    }
}
