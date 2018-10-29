$(document).ready(function() {
  
  var sessionLength = 25; //default
  var breakLength = 5; //default
  var isRunning = false;
  var timeInSeconds;
  var interval;
  var emptyFillColor = "rgba(0, 0, 0, .1)";
  var fillColor = "green";
  
  $('#sessionLength').text(sessionLength);
  $('#breakLength').text(breakLength);
  
  $('.session-length > .minus').on('click', reduceSessionLength);
  $('.session-length > .plus').on('click', increaseSessionLength);
  $('.break-length > .minus').on('click', reduceBreakLength);
  $('.break-length > .plus').on('click', increaseBreakLength);

// https://github.com/kottenator/jquery-circle-progress
$('.circle').circleProgress({
    value: 1,
    size: 200,
    thickness: 10,
    startAngle: 0,
    reverse: false,
    fill: {
      color: fillColor
    },
  animation: { duration: 1000, easing: "swing" }
  });
  
  $('.circle').find('strong').text(convertToTimeFormat(sessionLength*60));
  
  $('.circle').on('click', function() { //on clicking the circle
    if (!isRunning) { //if clock isnt running
      isRunning = true; //set running to true
      initiateCountdown(); //begin countdown
      $('#startRestart').text("restart"); //change text
    } else if (isRunning) { //if clock is running
      clearInterval(interval); //stop previous countdown
      initiateCountdown(); //restart countdown
    }
  });
  
  function reduceSessionLength() {
    if (sessionLength > 1) {
      sessionLength--;
      $('#sessionLength').text(sessionLength);
      if (!isRunning) {
        $('.circle').find('strong').text(convertToTimeFormat(sessionLength*60));
      }
    } else {
      return;
    }
  }
  function increaseSessionLength() {
    if (sessionLength < 60) {
      sessionLength++;
      $('#sessionLength').text(sessionLength);
      if (!isRunning) {
        $('.circle').find('strong').text(convertToTimeFormat(sessionLength*60));
      }
    } else {
      return;
    }
  }
  function reduceBreakLength() {
    if (breakLength > 1) {
      breakLength--;
      $('#breakLength').text(breakLength);
    } else {
      return;
    }
  }
  function increaseBreakLength() {
    if (breakLength < 60) {
      breakLength++;
      $('#breakLength').text(breakLength);
    } else {
      return;
    }
  }
  
  function convertToTimeFormat(time) {
 
    var sec_num = parseInt(time, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    
    time = minutes + ":" + seconds;
    
    return time;
  }
  
  function initiateCountdown() {
    var startTime;
    
    $('#breakText').hide(); //hide break text
    
    $('.circle').circleProgress({
      reverse: false,
      emptyFill: emptyFillColor,
      fill: { color: fillColor },
      animation: { duration: sessionLength*60000, easing: "linear" }
    }); //begin circle animation
    
    timeInSeconds = sessionLength * 60;
    $('.circle').find('strong').text(convertToTimeFormat(timeInSeconds));
    timeInSeconds--;    
    interval = setInterval(function() {
      startTime = convertToTimeFormat(timeInSeconds);
      $('.circle').find('strong').text(startTime);
      
      timeInSeconds--;
      console.log(timeInSeconds);
      if (timeInSeconds < 0) {
        clearInterval(interval);
        beginBreakTimer();
      }
      
    }, 1000);
    
    return interval;
  }
  
  function beginBreakTimer() {
    var startTime;
    
    $('#breakText').show() //show break text
    
    $('.circle').circleProgress({
      reverse: true,
      emptyFill: fillColor,
      fill: { color: emptyFillColor },
      animation: { duration: breakLength*60000, easing: "linear" }
    }); //begin circle reverse animation
    
    timeInSeconds = breakLength * 60;
    $('.circle').find('strong').text(convertToTimeFormat(timeInSeconds));
    timeInSeconds--;    
    interval = setInterval(function() {
      startTime = convertToTimeFormat(timeInSeconds);
      $('.circle').find('strong').text(startTime);
      
      timeInSeconds--;
      console.log(timeInSeconds);
      if (timeInSeconds < 0) {
        clearInterval(interval);
        initiateCountdown();
      }
      
    }, 1000);
  }
  
  });