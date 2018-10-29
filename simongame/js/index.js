$(document).ready(function() {
  
  let switchedOn = false;
  let gameStarted = false;
  let isStrict = false;
  const padArray = ['green','red','yellow','blue'];
  let gameArray = [];
  let count = 0;
  let newColor;
  let turnNo = 0;
  let isPlayersTurn = false;
  let isTouchScreen = false;
  disableUserClicks();

  let sounds = {
    green: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
    red: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
    yellow: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
    blue: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
  };
  let greenSound;
  let redSound;
  let yellowSound;
  let blueSound;

  let timeouts = {
    lightUpPad: 700,
    timeUntilNextPad: 1000,
    compTurnDelay: 700,
    mistakeDelay: 3500,
    blinkSpeed: 300
  };

  window.addEventListener('touchstart', function() {
    isTouchScreen = true; //if user is using a touch screen device
  });

  //check to see game is turned on
  $('#onOffSwitch').on('click', flickSwitch);

  //on pressing start button
  $('#start_button').on('click', startGame);

  //on pressing strict button
  $('#strict_button').on('click', enableStrict);

  //functions
  function flickSwitch() { //function for pressing on-off switch
    if ($(this).is(':checked')) { //if set to on
      switchedOn = true;
      $('#score').text('--'); //turn screen on
      // enableUserClicks();
    } else { //if set to off
      turnOff();
    }
  }

  function startGame() {  //function to begin game once start button is pressed
    if (switchedOn && !gameStarted) { //providing is switched on and game isn't already in progress
      gameStarted = true;
      computerTurn();
    } else {
      return;
    }
  }

  function computerTurn() { //function for computer's turn
    disableUserClicks();
    newColor = padArray[Math.floor(Math.random() * 4)]; //choose random color
    gameArray.push(newColor); //add it to game array
    setCount(); //increase counter

    let lightItUp = () => { //function to light pads
      setTimeout(function() {
        for (let i = 0; i < gameArray.length; i++) { //loop through and light up pads
          setTimeout(function() {
            playSound(gameArray[i]);
            $(`#${gameArray[i]}`).addClass('active'); //light up selected pad
            setTimeout(function() {
              $(`#${gameArray[i]}`).removeClass('active'); //unlight selected pad
              if (i === (gameArray.length - 1) && !isPlayersTurn) {
                playersTurn();
              }
            }, timeouts.lightUpPad);
          }, timeouts.timeUntilNextPad * i);
        }
      }, timeouts.compTurnDelay);
      
    }
    lightItUp();
    computerTurn.lightItUp = lightItUp; //make function available in global scope
  }

  function playersTurn() { //function for player's turn
    turnNo = 0;
    enableUserClicks(); //all methods that point to performTurn() function are here
  }

  function performTurn(id) { //function to register players turns
    if (id === gameArray[turnNo]) { //if right pad is selected
      turnNo++;
      if (turnNo === count) { //if sequence has been followed successfully
        computerTurn();
      }
    } else { //if wrong pad is selected
      turnNo = 0;
      disableUserClicks();
      flashScreen(); //show blinking screen to indicate mistake
      if (!isStrict) {
        setTimeout(computerTurn.lightItUp, timeouts.mistakeDelay); //acces local function to repeat pattern
      } else {
        resetValues();
        setTimeout(computerTurn, timeouts.mistakeDelay);
      }        
      return;
    }    
  }

  function setCount() { //function for increasing score
    count = gameArray.length;
    if (count <= 9) {
      $('#score').text(`0${count}`);
    } else {
      $('#score').text(count);
    }

  }  

  function playSound(color) { //function for playing sound
    greenSound = new Audio(sounds.green);
    redSound = new Audio(sounds.red);
    yellowSound = new Audio(sounds.yellow);
    blueSound = new Audio(sounds.blue);

    switch(color) {
      case 'green':
        greenSound.play();
        break;
      case 'red':
        redSound.play();
        break;
      case 'yellow':
        yellowSound.play();
        break;
      case 'blue':
        blueSound.play();
        break;
      default:
        return;
    }
  }

  function enableStrict() { //function for enabling strict mode
    if (switchedOn) {
      if (!isStrict) {
        isStrict = true;
        $('#strict_light').css('background-color', '#ff0707');
      } else {
        isStrict = false;
        $('#strict_light').css('background-color', '');
      }      
    } else {
      return;
    }
  }

  function flashScreen() { //function to show mistake by user
    //blink screen
    let textVisible = true;
    let blinker = setInterval(function() {
      if (textVisible) {
        $('#score').text('');
        textVisible = false;
      } else {
        $('#score').text('!!');
        textVisible = true;
      }
    }, timeouts.blinkSpeed);
    setTimeout(function() { //after set period clear interval
      clearInterval(blinker);
      $('#score').text('!!');
    }, timeouts.mistakeDelay - 1500);
    setTimeout(function() { //after set period reset score
      setCount();
    }, timeouts.mistakeDelay);
  }

  function disableUserClicks() { //function to prevent user clicking on pads
    isPlayersTurn = false;
    $('.pad').off().css('cursor', 'default');

    //for touchscreen devices
    if (isTouchScreen){
      padArray.forEach(function(col) {
        document.getElementById(col).removeEventListener('touchstart', touchLightOn);
        document.getElementById(col).removeEventListener('touchend', touchLightOff);
      });
    }
    
  }
  function enableUserClicks() { //function to enable user to click pads
    isPlayersTurn = true;

    if (!isTouchScreen) {
      $('.pad').on('click').css('cursor', '');
      $('.pad').on('mousedown', function() {
        $(this).addClass('active');
        playSound($(this).attr('id'));
      });
      $('.pad').on('mouseup', function() {
        $(this).removeClass('active');
        performTurn($(this).attr('id'));
      });
    }
    //for touchscreen devices
    if (isTouchScreen){
    padArray.forEach(function(col) {
      document.getElementById(col).addEventListener('touchstart', touchLightOn);
      document.getElementById(col).addEventListener('touchend', touchLightOff);
    });  
    }
        
  }
  function touchLightOn() {
    $(this).addClass('active');
    playSound($(this).attr('id'));
  }
  function touchLightOff() {
    $(this).removeClass('active');
    performTurn($(this).attr('id'));
  }

  function turnOff() { //function to turn game off
    switchedOn = false;
    gameStarted = false;
    if (isStrict) { //turn strict mode off
      isStrict = false;
      $('#strict_light').css('background-color', '');
    }
    resetValues(); //reset values
    $('#score').text(''); //turn screen off
    $('.pad').removeClass('active'); //reset pads should any be lit up
    disableUserClicks();
  }

  function resetValues() { //function to reset values
    gameArray = [];
    count = 1;
  }

});