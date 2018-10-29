function gameStart() {
  //change this value to set the maximum value to which the times table will go up to
  var timesTable = 12; //min 2
  
  var timeRemaining;
  var countdownTimer;
  
  //ensure score value is set to 0
  var scoreValue = 0;
  changeContent("scoreValue",scoreValue);

  //change text on button to Reset Game
  changeContent("startreset","Reset Game");

  //begin countdown timer
  getContent("timeremaining").style.visibility = "visible";
  timeRemaining = 59;
  countdownTimer = setInterval(function() {
    changeContent("timeRemainingValue",timeRemaining);
    if (timeRemaining <= 0) {
      clearInterval(countdownTimer);
      window.alert(
        "Time expired. Your final score was " +
          scoreValue +
          ".\nPress OK to restart game."
      );
      changeContent("timeRemainingValue","60");
      if (scoreValue > getContent("topScoreValue").innerHTML) {
        changeContent("topScoreValue",scoreValue);
      }
      gameStart();
    }
    timeRemaining--;
  }, 1000);

  if (timesTable < 2) { //prevent infinite loop if timesTable value is set to less than 2
    timesTable = 12;
  }
  generateNewQuestion(timesTable);

  function generateNewQuestion() {
    //generate random numbers between 1 and maximum value as defined at top (default is 12)
    var a = Math.floor(Math.random() * timesTable + 1);
    var b = Math.floor(Math.random() * timesTable + 1);
    //declare question
    var question = a + "x" + b;
    //store answer in variable
    var answer = a * b;

    //display question
    changeContent("question",question);

    //create an array for the boxes, decide which box will be used to display the correct answer and splice(remove) it from the array
    var boxArray = [1, 2, 3, 4];
    var rightBox = Math.floor(Math.random() * boxArray.length + 1);
    boxArray.splice(rightBox - 1, 1);
    //dispaly correct answer in the randomly chosen box
    changeContent("box" + rightBox,answer);

    var wrongAnsArr = [];
    wrongAnsArr.splice(0,wrongAnsArr.length);
    for (var i = 0; i < boxArray.length; i++) {
      //for the remainder of the boxes generate a random number between 1 and whatever the maximum value is and display it
      var maxValue = timesTable * timesTable;
      var wrongAnswer = Math.floor(Math.random() * maxValue + 1);
      changeContent("box" + boxArray[i],wrongAnswer);
      wrongAnsArr.push(wrongAnswer);
      //when user clicks a wrong answer briefly change the background color of the question container
      getContent("box" + boxArray[i]).onclick = function() {
        bgColorTimer("question-container","#c9302c","#eee",500);
      };
    };
    //check randomly generated wrong answers and if any of them match generate again
    wrongAnsArr = wrongAnsArr.sort(function(a, b){return a-b});
    if ((wrongAnsArr[0] == wrongAnsArr[1]) || (wrongAnsArr[1] == wrongAnsArr[2]) || (answer == wrongAnsArr[0]) || (answer == wrongAnsArr[1]) || (answer == wrongAnsArr[2])) {
      rightBox = ""; //reset right answer box to prevent potential incorrect answer being seen as correct
      generateNewQuestion();
    }

    //when user clicks on correct answer
    getContent("box" + rightBox).onclick = function() {
      //increase score by 1
      changeContent("scoreValue",scoreValue + 1);
      scoreValue++;
      //briefly change background color
      bgColorTimer("question-container","#449d44","#eee",500);

      generateNewQuestion();
    };
  }

  //if user presses Reset Game restart
  document.getElementById("startreset").onclick = function() {
    // clearInterval(countdownTimer);
    // document.getElementById("timeRemainingValue").innerHTML = "60";
    location.reload(true);
  };
}

  //functions for altering DOM
function getContent(id) {
  var idd = document.getElementById(id);
  return idd;
}
function changeContent(id,value) {
  var idd = document.getElementById(id).innerHTML = value;
  return idd;
}
function bgColorTimer(id,colorNew,colorOrig,time) {
  document.getElementById(id).style.backgroundColor = colorNew;
        setTimeout(function() {
          document.getElementById(id).style.backgroundColor = colorOrig;
        }, time);
}



//detect whether user is using a touch enabled device (to prevent sticky hover)
document.addEventListener('touchstart', function addtouchclass(e){ // first time user touches the screen
    document.documentElement.classList.add('can-touch') // add "can-touch" class to document root using classList API
    document.removeEventListener('touchstart', addtouchclass, false) // de-register touchstart event
}, false)