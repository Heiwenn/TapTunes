/**
 * menu.js
 * 
 * All objects used to display menu screen and their functionality
 */

let creditsText = "Credits\n\n" +
"Game Design and Programming:\n\n" +
"Lucas Polanco\n\n" +
"Music and Sound Effects:\n\n" +
"TuneTank\n" +
"Sergio Prosvirini\n" +
"DJARTMUSIC\n" +
"Grand_Project\n\n" +
"Art and Graphics:\n\n" +
"Zeno opengameart.org\n" +
"Kenney.nl\n" +
"https://github.com/petrvanblokland/TYPETR-Bitcount";

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
        let fontSize = width * 0.02;
        textFont('Courier New', fontSize);
        textAlign(CENTER, TOP);
        text(creditsText, (0) * width, (0.05) * height, width, height);

        image(menuCursor, mouseX, mouseY, width / 25, width / 25);
    }
}
