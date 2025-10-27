/**
 * images.js
 * Images for this game were made by loading images of real life objects into
 * https://editor.method.ac/ then overlaying shapes. The properties of those shapes
 * were used to write the initialization functions below.
 */


/**
 * Images for this game were made by loading images of real life objects into
 * https://editor.method.ac/ then overlaying shapes. The properties of those shapes
 * were used to write the initialization functions below.
 */

// Image of a jet based off an F35
function initPlayerJet() {
    let drawing = createGraphics(500, 500);

    //Body
    drawing.fill(190, 196, 196);
    drawing.noStroke();

    drawing.rect(192, 156, 251 - 192, 277);
    drawing.rect(132, 433, 86, 48);
    drawing.rect(75, 321, 117, 50);
    drawing.rect(232, 43, 19, 113);

    drawing.triangle(75, 321, 192, 245, 192, 321);
    drawing.triangle(75, 371, 192, 400, 192, 371);
    drawing.triangle(213, 156, 232, 43, 232, 156);
    drawing.triangle(232, 43, 250, 0, 250, 43);
    drawing.triangle(192, 156, 199, 139, 213, 156);
    drawing.triangle(192, 220, 192, 321, 160, 321);
    drawing.triangle(132, 433, 192, 400, 192, 433);
    drawing.triangle(132, 481, 218, 500, 218, 433);

    // Exhaust
    drawing.fill(147, 136, 130);

    drawing.rect(230, 433, 20, 37);
    drawing.triangle(218, 433, 230, 433, 230, 470);

    // Fusilage
    drawing.fill(7, 179, 164);
    drawing.ellipse(250, 109, 40, 94)

    // Mirror
    let leftHalf = drawing.get(0, 0, 250, 500);
    drawing.push();
    drawing.translate(500 / 2, 0);
    drawing.scale(-1, 1);
    drawing.image(leftHalf, -250, 0, 500 / 2, 500);
    drawing.pop();

    return drawing.get(0, 0, 500, 500);
}

// Image of a jet based off an F35 with a wing missing
function initTurkey() {
    let drawing = createGraphics(45, 45);

    drawing.beginShape();
    drawing.stroke(0);
    drawing.fill(150, 87, 39);
    drawing.vertex(22, 30);
    drawing.bezierVertex(0, 10, -5, 25, 22, 30);
    drawing.vertex(22, 30);
    drawing.bezierVertex(10, -5, -10, 5, 22, 30);
    drawing.vertex(22, 30);
    drawing.bezierVertex(10, -5, 35, -5, 22, 30);
    drawing.vertex(22, 30);
    drawing.bezierVertex(35, -5, 55, 5, 22, 30);
    drawing.vertex(22, 30);
    drawing.bezierVertex(45, 10, 50, 25, 22, 30);
    drawing.vertex(22, 30);
    drawing.endShape();
    drawing.fill(50);
    drawing.beginShape();
    drawing.vertex(21, 40);
    drawing.bezierVertex(0, 40, 0, 25, 21, 25);
    drawing.vertex(21, 40);
    drawing.bezierVertex(45, 40, 45, 25, 21, 25);
    drawing.endShape();
    drawing.fill(54, 113, 168);
    drawing.beginShape();
    drawing.vertex(21, 25);
    drawing.bezierVertex(5, 5, 40, 5, 21, 25);
    drawing.vertex(21, 25);
    drawing.endShape();
    drawing.fill(224, 38, 44);
    drawing.noStroke();
    drawing.beginShape();
    drawing.vertex(22, 18);
    drawing.bezierVertex(10, 35, 35, 35, 22, 18);
    drawing.endShape();

    return drawing.get(0, 0, 45, 45);
}

// Image of a missile
function initMissile() {
    let drawing = createGraphics(150, 600);

    drawing.noStroke();

    drawing.fill(238, 240, 227);
    drawing.rect(45, 197, 30, 361);
    drawing.rect(56, 98, 19, 502);
    drawing.rect(16, 424, 29, 55);
    drawing.rect(30, 560, 26, 28);

    drawing.triangle(56, 98, 45, 197, 56, 197);
    drawing.triangle(56, 98, 75, 0, 75, 98);
    drawing.triangle(30, 588, 56, 588, 56, 600);
    drawing.triangle(16, 424, 45, 363, 45, 424);

    drawing.fill(239, 221, 36);
    drawing.rect(56, 98, 19, 10);
    drawing.rect(45, 300, 30, 10);
    drawing.rect(45, 197, 30, 10);

    drawing.fill(241, 112, 53);
    drawing.rect(45, 250, 7, 80);
    drawing.rect(70, 250, 5, 80);

    drawing.fill(0);
    drawing.rect(45, 353, 30, 10);
    drawing.rect(45, 500, 30, 10);


    let leftHalf = drawing.get(0, 0, 75, 600);
    drawing.push();
    drawing.translate(75, 0);
    drawing.scale(-1, 1);
    drawing.image(leftHalf, -75, 0, 75, 600);
    drawing.pop();

    return drawing.get(0, 0, 150, 600);
}

// Image of a missile
function initTurkeyMissile() {
    let drawing = createGraphics(100, 200);

    drawing.stroke(0);
    drawing.fill(117, 46, 15);
    drawing.beginShape();
    drawing.vertex(50, 200);
    drawing.bezierVertex(0, -60, 100, -60, 50, 200);
    drawing.vertex(50, 200);
    drawing.endShape();
    drawing.fill(150, 87, 39);
    drawing.ellipse(50, 120, 10, 190);

    return drawing.get(0, 0, 100, 200);
}
