/**
 * game.js
 * 
 * Defines all the objects displayed in the game and their functionality.
 */



// Controls the viewport of the game and interaction
class GameScene extends Scene {
    constructor(switchScene) {
        super();
        this.backButton = new ImageButton(0.01, 0.01, 0.05, 0.08, switchScene, "Menu", backButton);
    }

    /**
     * w:87, a:65, s:83, d:68
     * Check if a key of importance is pressed.
     * Because of issues with multiple key pressed on any keypress we check
     * if a key of importanec is down.
     */
    keyPressed() {
    }

    // Check if a key is released
    keyReleased() {
    }

    mouseClicked() {
        this.backButton.checkClick();
    }

    load() {

    } 

    unload() {
        
    }


    // ----------------------------------
    // Draw loop (main game logic per frame)
    // ----------------------------------
    draw() {
        
        background(51, 71, 44);
        this.backButton.draw();

        image(menuCursor, mouseX, mouseY, width / 25, width / 25);
    }
}