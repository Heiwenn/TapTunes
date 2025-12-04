

class SelectCard {
    constructor(x, y, img, title, credits, action, argument) {
        this.x = x;
        this.y = y;
        this.w = 0.4;
        this.h = 0.1;
        this.img = img;
        this.title = title;
        this.credits = credits;
        this.action = action;
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
        let fontSize = width * this.w * 0.04;
        textFont('Courier New', fontSize);
        textAlign(LEFT, CENTER);
        text(this.title, (this.x + this.w * 0.16) * width, (this.y - this.h * 0.35) * height, this.w * 0.7 * width, this.h * height);
        fontSize = width * this.w * 0.03;
        textFont('Courier New', fontSize);
        text(this.credits, (this.x + this.w * 0.16) * width, (this.y + this.h * 0.35) * height, this.w * 0.7 * width, this.h * height);

        rectMode(CORNER);

        image(this.img, (this.x - this.w / 2) * width, (this.y - this.h / 2) * height, this.w * 0.3 * width, this.h * height);
    }
}




// Controls the viewport of the game and interaction
class SelectScene extends Scene {
    constructor(switchScene) {
        super();
        this.backButton = new ImageButton(0.01, 0.01, 0.05, 0.08, switchScene, "Menu", backButton);
        this.exampleImage = loadImage('assets/maps/Sunshine_Whistle/bg.png');
        this.cards = [];

        for (let map in mapData) {
            this.cards.push(
                new SelectCard(2.78 - Math.sqrt((4 - (this.cards.length * 0.11) * (this.cards.length * 0.11 - 0.5))), 
                0.5 - this.cards.length * 0.11, 
                mapData[map].bgImage, 
                mapData[map].info.title, 
                mapData[map].info.credits, 
                this.changeSelection.bind(this), 
                mapData[map]
            ));
        }

        this.selection = null;
        this.playButton = new TextButton(0.25, 0.85, 0.2, 0.1, this.startGame.bind(this), null, "Play");
    }

    startGame() {
        if (this.selection != null) {
            currentMap = this.selection;
            switchScene("Game");
        }
    }


    changeSelection(newSelection) {
        this.selection?.audio.stop();
        this.selection = newSelection;
        this.selection.audio.loop();
    }


    keyPressed() {
    }


    mouseClicked() {
        this.backButton.checkClick();
        this.playButton.checkClick();
        this.cards.forEach(card => {
            card.checkClick();
        });
    }

    mouseMoved() {
        this.playButton.checkMousePosition();
        this.cards.forEach(card => {
            card.checkMousePosition();
        });
    }

    mouseWheel(event) {
        if (event.delta > 0) {
            this.cards.forEach(card => {
                card.y -= 0.01;
                card.x = 2.78 - Math.sqrt((4 - (card.y - 0.5) * (card.y - 0.5)));
                card.checkMousePosition();
            });
        } else {
            this.cards.forEach(card => {
                card.y += 0.01;
                card.x = 2.78 - Math.sqrt((4 - (card.y - 0.5) * (card.y - 0.5)));
                card.checkMousePosition();
            });
        }
    }

    load() {

    }

    unload() {
        if (this.selection != null) {
            this.selection.audio.stop();
            this.selection = null;
        }
    }

    // ----------------------------------
    // Draw loop (main game logic per frame)
    // ----------------------------------
    draw() {
        image(bg, -50, -50, width + 100, height + 100);
        
        //this.exampleCard.draw();
        this.cards.forEach(card => {
            card.draw();
        });

        fill(0, 0, 0, 150);
        noStroke();
        rect(0, 0, width * 0.5, height);

        if(this.selection != null) {
            image(this.selection.bgImage, width * 0.05, height * 0.05, width * 0.4, height * 0.4);
            
            let titleText = `Title: ${this.selection.info.title}`;
            let creditsText = `Music By: ${this.selection.info.credits}`;
            let difficultyText = `Difficulty: ${this.selection.info.difficulty}`;
            rectMode(CORNER);

            fill(255);
            stroke(255);
            let fontSize = width * 0.02;
            textFont('Courier New', fontSize);
            textAlign(LEFT, CENTER);
            text(titleText, (0.05) * width, (0.46) * height, 0.5 * width, 0.1 * height);
            text(creditsText, (0.05) * width, (0.52) * height, 0.5 * width, 0.1 * height);
            text(difficultyText, (0.05) * width, (0.58) * height, 0.5 * width, 0.1 * height);
            
        }

        this.backButton.draw();
        this.playButton.draw();
        
        image(menuCursor, mouseX, mouseY, width / 25, width / 25);
    }
}