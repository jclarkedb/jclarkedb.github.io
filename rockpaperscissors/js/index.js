var userScore = 0;
var compScore = 0;
var possibleChoices = ["rock","paper","scissors"];
var playersChoices = [];
var compsChoices = [];

countDownToStart();
//perform countdown
function countDownToStart() {
  var startNum = 3;
  document.getElementById('countdown').innerHTML = startNum;
  document.getElementById('countdown').style.display = "block";
  var x = setInterval(function(){
    startNum--;
    document.getElementById('countdown').innerHTML = startNum;
    if (startNum == 0) {
      //when clock reaches zero end countdown
      clearInterval(x);
      //hide previous hand signals
      if (playersChoices.length > 0) {
        hideElements();
      }
      //hide countdown
      document.getElementById('countdown').style.display = "none";
      //enable buttons
      enableButtons();
    }
  }, 500);
}

function playGame(userChoice) {
  
  //generate a computer choice
  var compChoice = generateCompChoice();
  
  document.getElementById('player-choice-text').innerHTML = userChoice;
  document.getElementById('comp-choice-text').innerHTML = compChoice;
  
  showPlayerHandSignals(userChoice);
  showComputerHandSignals(compChoice);
  
  if (userChoice == compChoice) {
    draw(userChoice);
  } else if (userChoice == "rock" && compChoice == "paper") {
    compWins(userChoice, compChoice);
  } else if (userChoice == "rock" && compChoice == "scissors") {
    playerWins(userChoice, compChoice);
  } else if (userChoice == "paper" && compChoice == "rock") {
    playerWins(userChoice, compChoice);
  } else if (userChoice == "paper" && compChoice == "scissors") {
    compWins(userChoice, compChoice);
  } else if (userChoice == "scissors" && compChoice == "rock") {
    compWins(userChoice, compChoice);
  } else if (userChoice == "scissors" && compChoice == "paper") {
    playerWins(userChoice, compChoice);
  }
  
  //add previous choice to array so we know what the previous choice was
  playersChoices.unshift(userChoice);
  compsChoices.unshift(compChoice);
  
  //update scores
  document.getElementById('player-score').innerHTML = userScore;
  document.getElementById('comp-score').innerHTML = compScore;
  
  //disable buttons
  disableButtons();
  //start again after a short period
  setTimeout(countDownToStart, 1000);
};

function playerWins(userCh, compCh) {
  document.getElementById('who-beats-who').innerHTML = userCh + " beats " + compCh;
  document.getElementById('who-wins').innerHTML = "PLAYER WINS";
  document.getElementById('who-wins').className = "text-success";
  userScore++;
}
function compWins(userCh, compCh) {
  document.getElementById('who-beats-who').innerHTML = compCh + " beats " + userCh;
  document.getElementById('who-wins').innerHTML = "COMPUTER WINS";
  document.getElementById('who-wins').className = "text-danger";
  compScore++;
}
function draw(userCh) {
  document.getElementById('who-beats-who').innerHTML = "Both chose " + userCh;
  document.getElementById('who-wins').innerHTML = "DRAW";
  document.getElementById('who-wins').className = "text-secondary";
}


function enableButtons() {
  var btns = document.getElementsByClassName('btn');
      for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = false;
      }
}
function disableButtons() {
  var btns = document.getElementsByClassName('btn');
      for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
      }
}

function generateCompChoice() {
  var compChoice = Math.floor(Math.random() * 3);
  compChoice = possibleChoices[compChoice];
  return compChoice;
}

function hideElements() {
  document.getElementById('player-' + playersChoices[0]).style.display = 'none';
  document.getElementById('player-choice-text').innerHTML = "&nbsp;";
  document.getElementById('comp-' + compsChoices[0]).style.display = 'none';
  document.getElementById('comp-choice-text').innerHTML = "&nbsp;";
}

function showPlayerHandSignals(choice) { 
  switch (choice) {
    case "rock":
      document.getElementById('player-rock').style.display = "inline";
      break;
    case "paper":
      document.getElementById('player-paper').style.display = "inline";
      break;
    case "scissors":
      document.getElementById('player-scissors').style.display = "inline";
      break;
  }
}
function showComputerHandSignals(choice) { 
  switch (choice) {
    case "rock":
      document.getElementById('comp-rock').style.display = "inline";
      break;
    case "paper":
      document.getElementById('comp-paper').style.display = "inline";
      break;
    case "scissors":
      document.getElementById('comp-scissors').style.display = "inline";
      break;
  }
}