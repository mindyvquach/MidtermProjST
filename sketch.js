/*******************************************************************************************************************
      BUDDY
    by Mindy Quach
 
  Color Palette Values:

  Beige: #F2E6D9
  PastelBlue: #C2D1F2
  DarkBlue: #4369E3
  Gray: #878C95

    Uses the p5.ComplexStateMachine library. Check the README.md + source code documentation
    The index.html needs to include the line:  <script src="p5.complexStateManager.js"></script>
*********************************************************************************************************************/

var complexStateMachine;           // the ComplexStateMachine class
var clickablesManager;             // our clickables manager
var clickables;                    // an array of clickable objects

var currentStateName = "";
var backgroundImage;

var bkColor = '#52796F';
var textColor = '#878C95';

var buttonFont;

// scoring variables
var score = []
const skeptic = 0; 
const ceo = 0;
const hospital = 0;
const corporate = 0;
const patient = 0;

// button images
var buttonIcon;
var hoverButtonIcon;

const nextIndex = 0;
const startIndex = 1;
const restartIndex = 2;
const selectIndex = 3;


function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  complexStateMachine = new ComplexStateMachine("data/interactionTable.csv", "data/clickableLayout.csv");

  buttonFont = loadFont("Inter-VariableFont_slnt,wght.ttf");

  buttonIcon = loadImage('assets/buttonnothover.png');
  hoverButtonIcon = loadImage('assets/buttonhover.png');
}

// Setup code goes here
function setup() {
  createCanvas(1280, 720);
  imageMode(CENTER);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // setup the state machine with callbacks
  complexStateMachine.setup(clickablesManager, setImage, stateChanged);

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  console.log("score = ");
  console.log(score);
  initializeScore();
 }


// Draw code goes here
function draw() {
  drawBackground();
  drawImage();
  drawOther();
  drawUI();
}

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i <= 2; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].textFont = "Inter-VariableFont_slnt,wght.ttf";
    clickables[i].textSize = 30;
    clickables[i].textColor = 'white';
    clickables[i].width = 220;
  }

  clickableButtonHoverImg = function() {
    this.setImage(hoverButtonIcon);
  }

  clickableButtonOnOutsideImg = function() {
    this.setImage(buttonIcon);
  }

  for ( let j = 2; j <= 19; j++){
    clickables[j].drawImageOnly = true;
    clickables[j].onHover = clickableButtonHoverImg;
    clickables[j].onOutside = clickableButtonOnOutsideImg;
    clickables[j].onPress = clickableButtonPressed;
  }
 
  
 
  
  clickableButtonPressed = function() {
    complexStateMachine.clickablePressed(this.name);
    keepScore(this.id);
  }

}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#4369E3";
  this.noTint = false;
  this.tint = "#FF0000";

}

// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#F2E6D9";
}

clickableButtonPressed = function() {
  complexStateMachine.clickablePressed(this.name);
}

// this is a callback, which we use to set our display image
function setImage(imageFilename) {
  backgroundImage = loadImage(imageFilename);
} 

// this is a callback, which we can use for different effects
function stateChanged(newStateName) {
    currentStateName = newStateName;
    console.log(currentStateName);

    //change score
    if( newStateName === "Hospital1O1") 
      score[skeptic] = 0; 
      score[ceo] += 10;
      score[hospital] -= 10;
      score[corporate] = 0;
      score[patient] += 0;
    }
    if( newStateName === "Hospital1O2") {
      score[skeptic] = 0; 
      score[ceo] -= 10;
      score[hospital] += 10;
      score[corporate] = 0;
      score[patient] = 0;
    }
    console.log(scores);



//==== KEYPRESSED ====/
function mousePressed() {
  // if( currentStateName === "Splash" ) {
  //   complexStateMachine.newState("Instructions");
  // }
}

//==== MODIFY THIS CODE FOR UI =====/

function drawBackground() {
  background(color(bkColor));
}

// draw centered
function drawImage() {
  if( backgroundImage !== undefined ) {
    image(backgroundImage, width/2, height/2);
  }  
}

function drawOther() {
  push();

   // Draw mood — if not on Splash or Instructions screen  
   if( currentStateName !== "Splash" && currentStateName !== "Instructions") {
    fill(color(textColor));
    textFont(buttonFont);
    textSize(24);
    text(currentStateName, width/2, 50);
  }

  pop();
}

//-- right now, it is just the clickables
function drawUI() {
  clickablesManager.draw();
}

function initializeScore() {
  scores = [50,50,50,50];
  console.log(scores);
}
