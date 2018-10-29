$(document).ready(function(){
  //on clicking any anchor beginning with #
  $("a[href^=\"#\"]").on("click",function() {
    event.preventDefault(); //prevent default anchor behaviour
    var hash = this.hash; //store hash (location)

    $("html, body").animate({
      // Using jQuery's animate() method to add smooth page scroll
      scrollTop: $(hash).offset().top //
    }, 800, function() {
      // Add hash to URL when done scrolling
      window.location.hash = hash;
    });
  });
  //function to add/remove transparency for navbar
  $(window).scroll(function() {
  //if scroll has been activated
    if ($(document).scrollTop() > $(".first-container").outerHeight() - 50) {
      $("nav").removeClass("semi-transparent");
    } else {
      $("nav").addClass("semi-transparent");
  }
  });
  
  //function to bounce down arrows
  function bounceArrows() {
    setInterval(function() {
      $(".fa-angle-double-down").effect("bounce", {direction: "down", distance: 5, times: 2}, 600);
    }, 2500);
  }
  bounceArrows();
  
  //function to write out opening message (vanilla js)
  var str1 = "Jamie Clarke";

  var i = 0;
  function writeText(str, id)  {
    document.getElementById(id).innerHTML += str[i];
    i++;
    if (i < str.length) {
      setTimeout(writeText, 80, str, id);
    }
  }             
  writeText(str1, "greeting");
  
  setTimeout(function(){
    //fade in bottom part after set time period
    $("#greeting_bottom").css("visibility","visible").hide().fadeIn();
  }, 1200);
  
  //function to display portfolio image captions on mouse hover. But only if being viewed on larger devices which will be likely to have a pointer. The breakpoint is defined in the CSS media query
  if ($(".thumbnail .caption").css("display") == "none") {
    $(".thumbnail").hover(function() {
      $(this).children(".caption").slideDown();
    }, function() {
      $(this).children(".caption").slideUp();
    });
  };

// script to validate contact form

$('#contact-form').validator(); //initiate bootstrap validator http://1000hz.github.io/bootstrap-validator

// when the form is submitted
$('#contact-form').on('submit', function (e) {

  // if the validator does not prevent form submit
  if (!e.isDefaultPrevented()) {
    var url = "contact.php";

    // POST values in the background the script URL
    $.ajax({
      type: "POST",
      url: url,
      data: $(this).serialize(),
      success: function (data)
      {
        // data = JSON object that contact.php returns

        // we recieve the type of the message: success x danger and apply it to the 
        var messageAlert = 'alert-' + data.type;
        var messageText = data.message;

        // let's compose Bootstrap alert box HTML
        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
        
        // If we have messageAlert and messageText
        if (messageAlert && messageText) {
            // inject the alert to .messages div in our form
            $('#contact-form').find('.messages').html(alertBox);
            // empty the form
            $('#contact-form')[0].reset();
        }
    }
      });
      return false;
  }
})

});