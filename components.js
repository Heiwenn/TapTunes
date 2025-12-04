

class Tap {
    constructor(x, y, et, ls, c, n) {
        this.x = x;
        this.y = y;
        this.color = c;
        this.lifeSpan = ls;
        this.number = n;
        this.endTime = et;

        this.time = 0;

        this.started = false;
        this.done = false;
    }

    start() {
        this.started = true;
        this.done = false;
        this.counter = 0;
    }

    drawTimingCircle() {
        this.done = this.time >= this.endTime;
        fill(0, 0, 0, 0);
        stroke(255);
        strokeWeight(3);
        let diameter = width * tapDiameter + 2 * width * tapDiameter * ((this.endTime - this.time) / this.lifeSpan);
        circle(this.x * width, this.y * height, diameter);
        this.counter++;
        strokeWeight(1);
    }

    setTime(time) {
        this.time = time;
    }

    checkTap() {
        if (dist(this.x * width, this.y * height, mouseX, mouseY) <= tapDiameter * width / 2) {
            this.hit();
            console.log("Tapped");
        }
    }

    hit() {
        let counterPercentage = this.counter / (60 * this.lifeSpan);
        if (counterPercentage >= perfect) {
            this.perfect();
        } else if (counterPercentage >= great) {
            this.great();
        } else if (counterPercentage >= good) {
            this.good();
        } else if (counterPercentage >= ok) {
            this.ok();
        } else {
            this.fail();
        }

        if (counterPercentage >= ok) {
            this.started = false;
            this.done = true;
        }

    }

    draw() {
        if (!this.started || this.done) return;

        this.drawTimingCircle();
        fill(this.color);
        stroke(255);
        strokeWeight(3);
        circle(this.x * width, this.y * height, width * tapDiameter);
        rectMode(CENTER);
        fill(255);
        noStroke();
        textFont('Courier New', width * 0.03);
        textAlign(CENTER, CENTER);
        text(this.number, this.x * width, this.y * height, tapDiameter * width, tapDiameter * width);
        strokeWeight(1);
        rectMode(CORNER);
    }
}

class Slide {
    constructor(x1, y1, x2, y2, x3, y3, x4, y4, et, ls, st, c, n) {
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
        this.x4 = x4;
        this.y1 = y1;
        this.y2 = y2;
        this.y3 = y3;
        this.y4 = y4;
        this.endTime = et;
        this.lifeSpan = ls;
        this.slideTime = st;
        this.timingCircleTime = ls - st;
        this.color = c;
        this.number = n;
        this.counter = 0;
        this.time = 0;
        this.started = false;
    }

    start() {
        this.started = true;
        this.done = false;
        this.counter = 0;
    }

    drawTimingCircle() {
        if (this.time >= this.endTime - this.slideTime) return;
        fill(0, 0, 0, 0);
        stroke(255);
        strokeWeight(3);
        let diameter = width * tapDiameter + 2 * width * tapDiameter * ((this.endTime - this.time - this.slideTime) / this.timingCircleTime);
        circle(this.x1 * width, this.y1 * height, diameter);
        this.counter++;
    }

    moveBall() {
        if (this.time < this.endTime - this.slideTime) return;
        let xp05 = bezierPoint(this.x1 * width, this.x2 * width, this.x3 * width, this.x4 * width, 1 - (this.endTime - this.time) / this.slideTime);
        let yp05 = bezierPoint(this.y1 * height, this.y2 * height, this.y3 * height, this.y4 * height, 1 - (this.endTime - this.time) / this.slideTime);
        circle(xp05, yp05, width * tapDiameter * 0.9);

    }

    setTime(time) {
        this.time = time;
    }

    draw() {
        if (!this.started || this.done) return;
        if (this.time >= this.endTime) this.done = true;

        let xp0 = bezierPoint(this.x1 * width, this.x2 * width, this.x3 * width, this.x4 * width, 0.01);
        let yp0 = bezierPoint(this.y1 * height, this.y2 * height, this.y3 * height, this.y4 * height, 0.01);

        let xp1 = bezierPoint(this.x1 * width, this.x2 * width, this.x3 * width, this.x4 * width, 0.99);
        let yp1 = bezierPoint(this.y1 * height, this.y2 * height, this.y3 * height, this.y4 * height, 0.99);

        let vec0 = new p5.Vector(xp0 - this.x1 * width, yp0 - this.y1 * height);
        vec0.setMag(tapDiameter * width / 2);
        vec0.rotate(PI / 2);

        let vec1 = new p5.Vector(xp1 - this.x4 * width, yp1 - this.y4 * height);
        vec1.setMag(tapDiameter * width / 2);
        vec1.rotate(-PI / 2);

        stroke(255);
        strokeWeight(3);
        fill(this.color);
        vec0.rotate(PI);
        beginShape();
        vertex(this.x1 * width + vec0.x, this.y1 * height + vec0.y);
        vec0.rotate(PI);
        vertex(this.x1 * width + vec0.x, this.y1 * height + vec0.y);
        bezierVertex(this.x2 * width + vec0.x,
            this.y2 * height + vec0.y, this.x3 * width + vec1.x, this.y3 * height + vec1.y,
            this.x4 * width + vec1.x, this.y4 * height + vec1.y);
        vec1.rotate(PI);
        vertex(this.x4 * width + vec1.x, this.y4 * height + vec1.y);
        vec0.rotate(PI);
        bezierVertex(this.x3 * width + vec1.x, this.y3 * height + vec1.y, this.x2 * width + vec0.x,
            this.y2 * height + vec0.y, this.x1 * width + vec0.x, this.y1 * height + vec0.y);
        endShape();

        let xp05 = bezierPoint(this.x1 * width, this.x2 * width, this.x3 * width, this.x4 * width, 0.5);
        let yp05 = bezierPoint(this.y1 * height, this.y2 * height, this.y3 * height, this.y4 * height, 0.5);

        circle(this.x1 * width, this.y1 * height, width * tapDiameter);
        circle(this.x4 * width, this.y4 * height, width * tapDiameter);

        rectMode(CENTER);
        fill(255);
        stroke(255);
        textFont('Courier New', width * 0.03);
        textAlign(CENTER, CENTER);
        text(this.number, this.x1 * width, this.y1 * height, tapDiameter * width, tapDiameter * width);
        strokeWeight(1);
        rectMode(CORNER);

        this.drawTimingCircle();
        this.moveBall();
    }
}

class ImageButton {
    constructor (x, y, w, h, action, argument, img) {
        this.x = x;
        this.y = y;
        this.w = w; 
        this.h = h;
        this.action = action;
        this.img = img;
        this.argument = argument;
    }

    mouseCollides() {
        let mX = mouseX / width;
        let mY = mouseY / height;
        let insideX = (mX > this.x) && (mX < this.x + this.w);
        let insideY = (mY > this.y) && (mY < this.y + this.h);

        return (insideX && insideY);        
    }

    checkClick() {
        if (this.mouseCollides()) {
            clickSound.play();
            this.action(this.argument);
        }
    }


    draw() {
        image(this.img, this.x * width, this.y * height, this.w * width, this.h * height);
    }
}


class GameCursor {
    constructor(c) {
        this.color = c;
    }

    draw() {
        fill(this.color);
        stroke(255);
        strokeWeight(3);
        circle(mouseX, mouseY, width * gameCursorDiameter);
        line(mouseX, mouseY + width * gameCursorDiameter / 4, mouseX, mouseY - width * gameCursorDiameter / 4);
        line(mouseX + width * gameCursorDiameter / 4, mouseY, mouseX - width * gameCursorDiameter / 4, mouseY);
    }
}

class TextButton {
    constructor (x, y, w, h, action, argument, text, font_ratio=0.08) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.action = action;
        this.text = text;
        this.hovering = false;
        this.argument = argument;
        this.font_ratio = font_ratio;
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
            clickSound.play();
            this.action(this.argument);
        }
    }

    setText(newText) {
        this.text = newText;
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
        textFont(menuFont);
        textSize(width * this.font_ratio);
        textAlign(CENTER, CENTER);
        text(this.text, this.x * width, (this.y  - this.h * 0.1) * height, this.w * width, this.h * height);
        rectMode(CORNER);
    }
}