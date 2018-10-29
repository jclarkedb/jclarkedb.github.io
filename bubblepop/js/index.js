// Game created by JNC Webs using JQuery
// Based on the basic priciple of a 'Fruit Slice' game

$(document).ready(function() {
  let playing = false;
  let topScore = 0;

  //when user clicks start button
  $("#start-reset").click(function() {
    if (playing === true) {
      //if game is currently being played then reload game
      location.reload(true);
    } else {
      playing = true;
      $("#start-reset").text("Reset Game");
      let lives = 3;
      let score = 0;
      let fruitNum = 1;
      //selection of lovely fruits ('.' to denote class)
      const fruits = [".apple", ".orange", ".lemon"];

      let fallSpeed = function() {
        return Math.floor(Math.random() * (5000 - 1700) + 1700);
      };
      let fallFrequency = function() {
        return Math.floor(Math.random() * (1100 - 700) + 700);
      };

      $(".score").text(score);
      //display amount of hearts that corresponds to amount of lives
      for (let i = 1; i <= lives; i++) {
        $("#lives").append('<span class="heart"></span>');
      }

      const sendFruit = function() {
        //select random fruit class from fruits array
        let chosenFruit = fruits[Math.floor(Math.random() * fruits.length)];
        let fruitClass = chosenFruit + fruitNum.toString();
        //ensure the fruit appears on the page
        appendToDiv(chosenFruit);
        //apply css styles to fruit
        applyCSS(chosenFruit);

        //move fruit down screen
        $(fruitClass).animate(
          {
            top: $('#game-area').height()
          },
          fallSpeed(), "linear", function() {
            //if fruit hits bottom lose a life
            $("#lives .heart:nth-of-type(" + lives + ")").remove();
            lives--;
            //delete element
            $(this).remove();
            //when lives reach zero
            if (lives === 0) {
              //stop sending fruit
              clearInterval(startGame);
              //commence end game function
              endGame();
            }
          }
        );
        //increase fruitNum
        //note: this is used to ensure each generated class is unique, by adding the fruitNum on to the end of the class it ensures a unique fruit element each time
        fruitNum++;

        //when user clicks on fruit
        $(fruitClass).click(function() {
          //stop animation
          $(this).stop();
          //explode only when not using mobile device. As the performance demands are too great, it also makes a more enjoyable experience when using a touch screen
          var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    if (isMobile.matches) {
        $(this).toggle();
    } else {
      $(this).toggle("explode", { pieces: 9 });
    }
          //element must be removed as previous statement only sets display: none
          $(this).remove();
          //increase score by 1
          score++;
          $(".score").text(score);
        });
      };
      
      //set interval for sending fruit
      let startGame = setInterval(function() {
        sendFruit();
      }, fallFrequency());

      function appendToDiv(fruit) {
        //remove the '.' from the fruit name and add unique class number
        let spanDiv = "<span class='fruit " + fruit.substr(1) + fruitNum.toString() + "'></span>";
        $("#game-area").append(spanDiv);
      }
      function applyCSS(fruit) {
        let color;
        if (fruit === ".apple") {
          color = "rgba(187, 249, 188, .4)";
        } else if (fruit === ".orange") {
          color = "rgba(249, 182, 119, .4)";
        } else if (fruit === ".lemon") {
          color = "rgba(249, 245, 122 .4)";
        } else {
          color = "rgba(186, 232, 252, .4)";
        }
        //css styles to be applied
        $(fruit + fruitNum.toString()).css({
          //random value between 0 and game-area width minus fruit width.. without minusing the fruit width the fruit will overhang the container on right hand side
          left: Math.floor(Math.random() * ($('#game-area').width() - $('.fruit').width())) + "px",
          background: color
        });
      }

      function endGame() {
        playing = false;
        if (score > topScore) {
          topScore = score;
          $('.top-score').text(topScore);
        }        
        $('.modal').modal('show');
        //any fruit remaining in game area to stop and explode
        $("#game-area").children().stop();
        $("#game-area").children().toggle("explode");
        //element must be removed as previous statement only sets display: none
        $("#game-area").children().remove();
        //reset button text
        $("#start-reset").text("Start Game");
      }
    } //end else statement
  }); //end click function
  
  $('#modalClose').click(function(){
    $('.modal').modal('hide');
  });
  
});