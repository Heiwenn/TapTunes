

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
        this.mapInfo = [];

        //this.exampleInfo = loadJSON('assets/maps/Sunshine_Whistle/info.json');
        this.exampleImage = loadImage('assets/maps/Sunshine_Whistle/bg.png');
        for (let i = 0; i < 10; i++) {
            let y = 0.5 - i * 0.11;
            let x = 2.78 - Math.sqrt((4 - (y - 0.5) * (y - 0.5)));
            let card = new SelectCard(x, y, this.exampleImage, exampleInfo.title, exampleInfo.credits);
            this.cards.push(card);
        }

        this.selection = null;

        //this.exampleCard = new SelectCard(0.79, 0.5, this.exampleImage, exampleInfo.title, exampleInfo.credits);
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
        this.cards.forEach(card => {
            card.checkClick();
        });
    }

    mouseMoved() {
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

    }

    // ----------------------------------
    // Draw loop (main game logic per frame)
    // ----------------------------------
    draw() {
        image(bg, -50, -50, width + 100, height + 100);
        this.backButton.draw();
        //this.exampleCard.draw();
        this.cards.forEach(card => {
            card.draw();
        });

        fill(0,0,0, 150);
        noStroke();
        rect(0, 0, width * 0.5, height);

        image(menuCursor, mouseX, mouseY, width / 25, width / 25);
        if (this.selection != null) {
            image(this.selection.img, width * 0.05, height * 0.05, width * 0.4, height * 0.4);
        }
    }
}