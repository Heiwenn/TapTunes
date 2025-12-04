/**
 * sketch.js
 * 
 * Functions used to manage scenes and user input.
 */

// Store all available scenes and track which one is active
let scenes = {};
let current;
var canvas;
// ----------------------------------
// p5.js setup function
// ----------------------------------
function setup() {
  console.log("Done Pre-Loading");
  canvas = createCanvas(windowWidth, windowWidth * aspectRatio); // set up game canvas
  canvas.parent('game-container');
  windowResized();

  outputVolume(masterVolume);
  clickSound.setVolume(sfxVolume);

  // Initialize scenes, each gets a reference to switchScene
  scenes.logo = new LogoScene(switchScene);
  scenes.menu = new MenuScene(switchScene);
  scenes.game = new GameScene(switchScene);
  scenes.credits = new CreditsScene(switchScene);
  scenes.tutorial = new TutorialScene(switchScene);
  scenes.options = new OptionsScene(switchScene);
  scenes.select = new SelectScene(switchScene);

  // Start with logo scene
  current = scenes.logo;
  bg.filter(BLUR, 20);
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
    case "Credits":
      current = scenes.credits;
      break;
    case "Options":
      current = scenes.options;
      break;
    case "Tutorial":
      current = scenes.tutorial;
      break;
    case "Select":
      current = scenes.select;
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

function mouseMoved() {
  current.mouseMoved();
}

function mouseWheel(event) {
  current.mouseWheel(event);
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

function loadMaps(data) {
  console.log(data);
  for (let mapName of data) {
      console.log(`Loading map: ${mapName}`);
      let map = {
          "info": loadJSON(`assets/maps/${mapName}/info.json`),
          "bgImage": loadImage(`assets/maps/${mapName}/bg.png`),
          "audio": loadSound(`assets/maps/${mapName}/audio.mp3`)
      };
      mapData[mapName] = map;
  }
}

function preload() {
  bg = loadImage(backgroundImage);
  menuMusic = loadSound(menuSoundTrack);
  clickSound = loadSound(clickPath);
  menuFont = loadFont(menuFontPath);
  menuCursor = loadImage(menuCursorPath);
  titleFont = loadFont(titleFontPath);
  backButton = loadImage(backButtonPath);
  const manifest = loadJSON('assets/maps/manifest.json', loadMaps);
}
