/**
 * globals.js
 * 
 * Globally defined game variables.
 */


var aspectRatio = 3 / 4;
var menuSoundTrack = "assets/music/vlog-beat-background-349853.mp3";
var backgroundImage = "assets/images/beautiful-7305567_1280.jpg";
var menuFontPath = "assets/fonts/BitcountGridSingle-Light.ttf";
var menuCursorPath = "assets/images/Purple.png";
var titleFontPath = "assets/fonts/MomoTrustDisplay-Regular.ttf"
var backButtonPath = "assets/images/arrow_basic_w.svg"
var clickPath = "assets/music/click.mp3";

var bg;
var clickSound;
var menuMusic;
var menuFont;
var menuCursor;
var titleFont;
var backButton;

var tapDiameter = 0.08;
var gameCursorDiameter = 0.03;

var perfect = 0.9;
var great = 0.8;
var good = 0.6;
var ok = 0.5;

var sfxVolume = 0.5;
var masterVolume = 0.5;

var delay = 2000;

var mapData = {};
var currentMap = null;
var currentScore = 0;
var currentCombo = 0;

var buttonOne = 88;
var buttonTwo = 67;

var buttonOneString = "x";
var buttonTwoString = "c";