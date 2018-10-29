$(document).ready(function(){
  //declare variables
  let playerChoice = "X";
  let computerChoice = "O";
  let winPos;
  let selectedId;
  let choice;
  let choiceArr = ['t1','t2','t3','m1','m2','m3','b1','b2','b3'];
  let originalArr = [...choiceArr];
  let chosenArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let playerNum = 1;
  let compNum = 2;
  let isPlayersTurn = true;
  let playerWinCount = 0;
  let computerWinCount = 0;
  let drawCount = 0;
  let computerGoesFirst = false;
  let gameInProgress = false;
  enableClickHandler();
  
  //code for changing user player 'X' or 'O'
  $('#x-box').css('background-color', 'rgba(255,255,255,0.1)');
  $('#o-box').css('cursor', 'pointer');  
  $('#x-box').on('click', function() { //on changing user player to 'X'
    if (gameInProgress === false) {
    $(this).css('background-color', 'rgba(255,255,255,0.1)').css('cursor', 'default');
    $('#o-box').css('background-color', '').css('cursor', 'pointer');
    playerChoice = "X";
    computerChoice = "O"
    } else {
      return;
    }
  });
  $('#o-box').on('click', function() { //on changing user player to 'O'
    if (gameInProgress === false) {
    $(this).css('background-color', 'rgba(255,255,255,0.1)').css('cursor', 'default');
    $('#x-box').css('background-color', '').css('cursor', 'pointer');
    playerChoice = "O";
    computerChoice = "X"
  } else {
    return;
  }
  });

  //code for toggle switch
  $('#checkbox').on('click', function() { //toggle computer goes first
    computerGoesFirst = $('#checkbox').is(':checked');
    if (!gameInProgress) {
      gameInProgress = true;
      setTimeout(computersTurn, 500); //set delay before computer makes turn
    }
  });

  let playersTurn = (td) => {
    selectedId = $(td).attr('id'); //get the id of the selected td
    choice = getArrayChoiceFromId(selectedId); //get the corresponding name of the selected td that matches the array
    if (choiceArr.indexOf(choice) > -1) { //if the selected td hasn't been selected before
      $(td).text(playerChoice); //set the selected section to X
      removeChoiceFromArr(choice, playerNum); //remove selected from array
      if (checkForWin(playerNum)) { //check for a win
        playerWinCount++;
        $('#playerScore').text(playerWinCount);
        isPlayersTurn = false;
        disableClickHandler(); //disable click event handler
        $('#winner').text('Player wins'); //set modal text
        $('.winner-modal').show(); //show modal
        return;
      } else if (checkForDraw()) { //check for draw
        drawCount++;
        $('#drawScore').text(drawCount); //update scoreboard
        isPlayersTurn = false;
        disableClickHandler();
        $('#winner').text('Draw'); //set modal text
        $('.winner-modal').show(); //show modal
      } else {
        isPlayersTurn = false;
        disableClickHandler();
        setTimeout(computersTurn, 500); //set delay before computer makes turn
      };
    };
  }

  let computersTurn = () => {
    if (isWinPossible(compNum)) { //play attacking
      choice = originalArr[winPos];
    } else if (isWinPossible(playerNum)) { //play defensive
      choice = originalArr[winPos];
    } else if (choiceArr.indexOf('m2') != -1) { //if middle is free choose middle cell
      choice = choiceArr[choiceArr.indexOf('m2')]; 
    } else if (checkCornerFree()) { //if corner free choose corner
      choice = choiceArr[choiceArr.indexOf(checkCornerFree())];
    } else {
      choice = choiceArr[Math.floor(Math.random() * choiceArr.length)]; //select random array value
    }
   
    selectedId = getIdChoiceFromArray(choice); //get corresponding cell
    $('#'+selectedId).text(computerChoice); //update the cell to show the computers selection
    removeChoiceFromArr(choice, compNum); //remove value from array
    if (checkForWin(compNum)) { //check for a win
      computerWinCount++;
      $('#computerScore').text(computerWinCount);
      $('#winner').text('Computer wins'); //set modal text
      $('.winner-modal').show(); //show modal
      return;
    } else if (checkForDraw()) { //check for draw
      drawCount++;
      $('#drawScore').text(drawCount); //update scoreboard
      $('#winner').text('Draw'); //set modal text
      $('.winner-modal').show(); //show modal
    } else {
      isPlayersTurn = true;
      enableClickHandler();
      return;
    };
  }

  // if (computerGoesFirst === true) {
  //   setTimeout(computersTurn, 500);
  // }

  $('.winner-modal button').on('click', startNewGame);
  
  
  //declare functions
  function startNewGame() {
    choiceArr = ['t1','t2','t3','m1','m2','m3','b1','b2','b3']; //reset arrays
    chosenArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (computerGoesFirst) {
      gameInProgress = true;
      isPlayersTurn = false;
    } else {
      isPlayersTurn = true;
      gameInProgress = false;
    }
    $('td').empty(); //empty cells
    $('td').css('background-color', ''); //reset css values
    $('.winner-modal').hide(); //hide modal
    if (computerGoesFirst === true) {
      setTimeout(computersTurn, 500);
    } else {
      enableClickHandler(); //enable click event
    }    
  }

  function checkCornerFree() { //check to see if any corner tiles are free
    if (choiceArr.indexOf('t1') != -1) {
      return 't1';
    } else if (choiceArr.indexOf('t3') != -1) {
      return 't3';
    } else if (choiceArr.indexOf('b1') != -1) {
      return 'b1';
    } else if (choiceArr.indexOf('b3') != -1) {
      return 'b3';
    } else {
      return false;
    }
  }

  function isWinPossible(num) {
    for (let i = 0; i < chosenArr.length; i++) {
      if (chosenArr[i] === 0) {
        chosenArr[i] = num;
        if (checkForWin(num)) {
          chosenArr[i] = 0;
          winPos = i;
          return true;
        }
        chosenArr[i] = 0;
      }
    }
    return false;
  }

  function checkForDraw() {
    if (choiceArr.length === 0) {
      return true;
    }
  }

  function enableClickHandler() { //enable clicking cells / start game
    if (isPlayersTurn) { 
    $('table').on('click', 'td', function() {
      playersTurn(this);
    });
  };
  }
  function disableClickHandler() { //disable clicking cells
    gameInProgress = true;
    $('table').off('click','td');
  }

  function checkForWin(val) { //check to see if there is a winner
    if (chosenArr[0] === val && chosenArr[1] === val && chosenArr[2] === val) {
      return true;
    } else if (chosenArr[3] === val && chosenArr[4] === val && chosenArr[5] === val) {
      return true;
    } else if (chosenArr[6] === val && chosenArr[7] === val && chosenArr[8] === val) {
      return true;
    } else if (chosenArr[0] === val && chosenArr[3] === val && chosenArr[6] === val) {
      return true;
    } else if (chosenArr[1] === val && chosenArr[4] === val && chosenArr[7] === val) {
      return true;
    } else if (chosenArr[2] === val && chosenArr[5] === val && chosenArr[8] === val) {
      return true;
    } else if (chosenArr[0] === val && chosenArr[4] === val && chosenArr[8] === val) {
      return true;
    } else if (chosenArr[2] === val && chosenArr[4] === val && chosenArr[6] === val) {
      return true;
    } else {
      return false;
    }
  }
  function getArrayChoiceFromId(selected) { //function to match the corresponding id value
    let chosen;
    switch(selected) {
      case 'topLeft':
        chosen = 't1';
        break;
      case 'topMiddle':
        chosen = 't2';
        break;
      case 'topRight':
        chosen = 't3';
        break;
      case 'middleLeft':
        chosen = 'm1';
        break;
      case 'middleMiddle':
        chosen = 'm2';
        break;
      case 'middleRight':
        chosen = 'm3';
        break;
      case 'bottomLeft':
        chosen = 'b1';
        break;
      case 'bottomMiddle':
        chosen = 'b2';
        break;
      case 'bottomRight':
        chosen = 'b3';
        break;
    }
    return chosen;
  }
  function getIdChoiceFromArray(selected) { //function to match the corresponding array value
    let chosen;
    switch(selected) {
      case 't1':
        chosen = 'topLeft';
        break;
      case 't2':
        chosen = 'topMiddle';
        break;
      case 't3':
        chosen = 'topRight';
        break;
      case 'm1':
        chosen = 'middleLeft';
        break;
      case 'm2':
        chosen = 'middleMiddle';
        break;
      case 'm3':
        chosen = 'middleRight';
        break;
      case 'b1':
        chosen = 'bottomLeft';
        break;
      case 'b2':
        chosen = 'bottomMiddle';
        break;
      case 'b3':
        chosen = 'bottomRight';
        break;
    }
    return chosen;
  }
  function removeChoiceFromArr(selection, val) {
    chosenArr[originalArr.indexOf(selection)] = val;
    choiceArr.splice(choiceArr.indexOf(selection), 1);
  }

});