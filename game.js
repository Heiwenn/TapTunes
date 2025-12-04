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
        this.gameCursor = new GameCursor(color(49, 247, 188, 100));
        this.playing = false;
        this.notes = [];
    }

    keyPressed() {
    }

    // Check if a key is released
    keyReleased() {
    }

    mouseClicked() {
        this.backButton.checkClick();
    }

    load() {
        currentScore = 0;
        currentCombo = 0;

        for (let note of currentMap.info.notes) {
            if (note.type == "tap") {
                this.notes.push(new Tap(note.x, note.y, note.startTime, note.lifespan, color(note.r, note.g, note.b), note.n));
            }
        }

        setTimeout(() => {
            this.start();
        }, 1000);

    }

    start() {
        this.playing = true;
        currentMap.audio.play();
    }

    pause() {

    }

    continue() {

    }

    unload() {
        currentMap.audio.stop();
    }

    draw() {
        image(currentMap.bgImage, 0, 0, width, height);

        this.backButton.draw();

        let timeElapsed = currentMap.audio.currentTime() * 1000;
        if (this.playing) {
            this.notes.forEach(note => {
                if (note.started) {
                    if (timeElapsed >= note.startTime + note.lifeSpan) note.done = true;
                    note.setTime(timeElapsed);
                    note.draw();
                } else {
                    if (timeElapsed >= note.startTime) note.start();
                }
            });
        }

        
        this.gameCursor.draw();
    }
}