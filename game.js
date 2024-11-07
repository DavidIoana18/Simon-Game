var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// to see if the game has started
$(document).keypress(function(){
    if (!started){
        nextSequence();
        started = true;
    }
});

// to see if the user has clicked a button
$(".btn").click(function(){
    var userChosenColour =$(this).attr("id");    // get the id of the button that was clicked
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour); 

    checkAnswear(userClickedPattern.length - 1); // check if the user has clicked the correct button
});

function checkAnswear(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){     // if the user has clicked the correct button
        if(gamePattern.length === userClickedPattern.length){               // if the user has completed the entire sequence of the current level
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else{
        playSound("wrong");
        $("#level-title").text("Game Over! Tap Any Key to Replay!");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); 
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 
}


function playSound(name){
    var sound = new Audio("sounds/" +  name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}