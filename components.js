

class Tap {
    constructor(x, y, ls, c, n) {
        this.x = x;
        this.y = y;
        this.color = c;
        this.lifeSpan = ls;
        this.number = n;

        this.counter = 0;

        this.started = false;
        this.done = false;
    }

    start() {
        this.started = true;
        this.done = false;
        this.counter = 0;
    }

    drawTimingCircle() {
        this.done = this.counter > this.lifeSpan * 60;
        fill(0,0,0,0);
        stroke(255);
        let diameter = width * tapDiameter * 2 * (1 - this.counter / (this.lifeSpan * 60) / 2);
        circle(this.x * width, this.y * width, diameter);
        this.counter++;
    }


    draw() {
        if (!this.started || this.done) return;

        this.drawTimingCircle();
        fill(this.color);
        stroke(255);
        circle(this.x * width, this.y * width, width * tapDiameter);
        rectMode(CENTER);
        textFont('Courier New', width * 0.02);
        textAlign(CENTER, CENTER);
        text(this.number, this.x * width, this.y * width, tapDiameter * width, tapDiameter * width);
        rectMode(CORNER);
    }
}

class GameCursor {
    constructor(c) {
        this.color = c;
    }

    draw() {
        fill(this.color);
        stroke(255);
        circle(mouseX, mouseY, width * gameCursorDiameter);
        line(mouseX, mouseY + width * gameCursorDiameter / 4, mouseX, mouseY - width * gameCursorDiameter / 4);
        line(mouseX + width * gameCursorDiameter / 4, mouseY, mouseX - width * gameCursorDiameter / 4, mouseY);
    }
}