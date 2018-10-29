//on load generate quote by pointing to generateQuote() function
$(document).ready(generateQuote);

var lastNum = [];

//when user clicks new quote button 
$("#newQuote").on("click", function() {
  //set the time it takes for the previous quote to fade out
  var fadeTime = 500;
  //fade out quote and author
  fadeOut(fadeTime);
  //do not generate new quote until previous one has faded out
  setTimeout(generateQuote, fadeTime);
  //generate colours
  changeColors();
});

function generateQuote() {
  //call a random quote object from the quotes array
  var quoteNum
  do {
  quoteNum = Math.floor(Math.random() * quotes.length);
  } while (quoteNum === lastNum[0] || quoteNum === lastNum[1]);
  //this ensures the newly generated number does not match the last 2 numbers, preventing a quote from repeating too frequently
  lastNum.unshift(quoteNum);
  
  var newQuote = quotes[quoteNum];

  //fade in new quote
  $("#quote").text(newQuote.quote).fadeIn("slow");
  $("#author").text(newQuote.author).fadeIn("slow");
  
  //set twitter button attributes
  $(".fa-twitter").attr({
    href: 'https://twitter.com/intent/tweet?text="' +
      newQuote.quote + '" ' + " - " + newQuote.author,
    target: "_blank",
    title: "Share on Twitter"
  });
}

function fadeOut(time) {
  //fade out function
  $("#quote, #author").fadeOut(time);
}

function changeColors() {
  //generate random rgb color value
  var newColor =
    "rgb(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    ")";

  //apply random color to relevant selectors
  //note: this works because jqueryUI script is included. It extends the animate usage to be used to fade one color to another
  $("body, button, .fa-twitter").animate({ backgroundColor: newColor });
  $(".container").animate({ color: newColor });
}

//The container for the quotes and their author. Represented as objects in an array
var quotes = [
    {
      quote:
        "Do not take life too seriously. You will never get out of it alive",
      author: "Elbert Hubbard"
    },
    {
      quote: "Life is 10% what happens to you and 90% how you react to it",
      author: "Charles R. Swindoll"
    },
    {
      quote:
        "Failure will never overtake me if my determination to succeed is strong enough",
      author: "Og Mandino"
    },
    {
      quote:
        "You are never too old to set another goal or to dream a new dream",
      author: "Les Brown"
    },
    {
      quote:
        "A creative man is motivated by the desire to achieve, not by the desire to beat others",
      author: "Ayn Rand"
    },
    {
      quote: "Problems are not stop signs, they are guidelines",
      author: "Robert H. Schuller"
    },
    {
      quote: "Don't watch the clock, do what it does. Keep going",
      author: "Sam Levenson"
    },
    {
      quote:
        "You can't cross the sea merely by standing and staring at the water",
      author: "Rabindranath Tagore"
    },
    {
      quote: "If you're going through hell, keep going",
      author: "Winston Churchill"
    },
    {
      quote: "By failing to prepare, you are preparing to fail",
      author: "Benjamin Franklin"
    },
    {
      quote: "The harder the conflict, the more glorious the triumph",
      author: "Thomas Paine"
    },
    {
      quote:
        "I'd rather attempt to do something great and fail than to attempt to do nothing and succeed",
      author: "Robert H. Schuller"
    },
    {
      quote: "You can never quit. Winners never quit, and quitters never win",
      author: "Ted Turner"
    },
    {
      quote: "A somebody was once a nobody who wanted to and did",
      author: "John Burroughs"
    },
    {
      quote: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty",
      author: "Winston Churchill"
    },
    {
      quote: "We generate fears while we sit. We overcome them by action",
      author: "Dr. Henry Link"
    },
    {
      quote: "The only limit to our realization of tomorrow will be our doubts of today",
      author: "Franklin D. Roosevelt"
    },
    {
      quote: "If you hear a voice within you say \"you cannot paint,\" then by all means paint and that voice will be silenced.",
      author: "Vincent Van Gogh"
    },
    {
      quote: "The only person you are destined to become is the person you decide to be",
      author: "Ralph Waldo Emerson"
    }
  ];