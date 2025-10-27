/**
 * sketch.js
 * 
 * Functions used to manage scenes and user input.
 */

// Store all available scenes and track which one is active
let scenes = {};
let current;

// ----------------------------------
// p5.js setup function
// ----------------------------------
function setup() {
  createCanvas(windowWidth, windowWidth * aspectRatio); // set up game canvas
  windowResized();

  // Initialize scenes, each gets a reference to switchScene
  scenes.logo = new LogoScene(switchScene);
  scenes.menu = new MenuScene(switchScene);
  scenes.game = new GameScene(switchScene);

  // Start with logo scene
  current = scenes.logo;
}

// ----------------------------------
// Change current scene by name
// ----------------------------------
function switchScene(nextScene) {
  current.unload();
  switch (nextScene) {
    case "Logo":
      current = scenes.logo;
      break;
    case "Menu":
      current = scenes.menu;
      break;
    case "Game":
      current = scenes.game;
      break;
    default:
      break;
  }
  current.load();
}

// ----------------------------------
// p5.js draw loop
// ----------------------------------
function draw() {
  background(0);   // clear with black
  current.draw();  // delegate rendering to current scene
}

// ----------------------------------
// Forward mouse/keyboard events to current scene
// ----------------------------------
function mouseClicked() {
  current.mouseClicked();
}

function keyPressed() {
  current.keyPressed();
}

function keyReleased() {
  current.keyReleased();
}

function windowResized() {
  let winHeight = windowWidth * aspectRatio;
  let winWidth = windowWidth;
  if (windowWidth * aspectRatio > windowHeight) {
    winHeight = windowHeight;
    winWidth = windowHeight / aspectRatio;
  }
  resizeCanvas(winWidth, winHeight);
}

function preload() {
  bg = loadImage(backgroundImage);
  menuMusic = loadSound(menuSoundTrack);
}
