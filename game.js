
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;  //to keep track of whether if the game has started or not
var level = 0;       //start at level 0

// detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
$(document).keypress(function() {
  if (!started) {
     // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0"
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); //store the id of the button that got clicked
  userClickedPattern.push(userChosenColour); //Add the contents of the variable userChosenColour  to the end of this new userClickedPattern

  playSound(userChosenColour);     //when a user clicks on a button, the corresponding sound should be played
  animatePress(userChosenColour);

   //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
 // check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong"
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
         // Call nextSequence() after a 1000 millisecond delay
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
    
      // play wrong.mp3 if the user got one of the answers wrong
      playSound("wrong");
      // apply the class "game-over" to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds
      $("body").addClass("game-over");
      // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //Call startOver() if the user gets the sequence wrong
      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++; //increase the level by 1 every time nextSequence() is called
 
  // update the h1 with this change in the value of level
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

   //select the button with the same id as the randomChosenColour and animate a flash to the button selected
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


//play the sound for the button colour selected
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
 // reset the values of level, gamePattern and started variables
  level = 0;
  gamePattern = [];
  started = false;
}
