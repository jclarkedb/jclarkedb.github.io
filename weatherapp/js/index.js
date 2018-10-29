if (navigator.geolocation) { //if users browser supports geolocation

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    displayWeather(lat, lon);
  }
  function error(err) {
    $("#data-container").html("<h3>To display weather information you must allow your device to share its location</h3>");
  }
} else {
  //if users browser does not support geolocation
  $("#data-container").html(
    "<h3>Sorry. Your browser does not support location tracking</h3>"
  );
}

function displayWeather(lat, lon) {
  var linkAPI =
    "https://fcc-weather-api.glitch.me/api/current?lon=" + lon + "&lat=" + lat;

  $.getJSON(linkAPI, function(json) {
    //declare variables and apply data from JSON object
    var city = json.name;
    var country = json.sys.country;
    var temp = Math.round(json.main.temp * 10) / 10; //round to 1 decimal place
    var fahrenheitTemp = Math.round((temp * 9 / 5 + 32) * 10) / 10; //convert tempt to fahrenheit and round to 1 decimal place
    var weather = json.weather[0].description;
    var icon = json.weather[0].icon;

    $("#city").text(city + ", ");
    $("#country").text(country);
    $("#temp").html(temp + " &deg;<span id='clickTemp'>C</span>");
    $("#icon").attr({
      src: icon,
      alt: weather,
      title: weather
    });
    $("#weather").text(weather);

    $("#temp").on("click", function() {
      //on clicking the temperature it will toggle between Celcius and Fahrenheit
      if ($("#clickTemp").text() == "C") {
        $("#temp").html(fahrenheitTemp + " &deg;<span id='clickTemp'>f</span>");
      } else {
        $("#temp").html(temp + " &deg;<span id='clickTemp'>C</span>");
      }
    });

    switch (json.weather[0].main) { //set background image depending on weather
      case "Thunderstorm":
        $("body").css(
          "background-image",
          "url('https://www.homeadvisor.com/r/wp-content/uploads/2015/03/Dollarphotoclub_43826198.jpg')"
        );
        break;
      case "Rain":
        $("body").css(
          "background-image",
          "url('https://rain.today/Pix/rain.jpg')"
        );
        break;
      case "Drizzle":
        $("body").css(
          "background-image",
          "url('https://rain.today/Pix/rain.jpg')"
        );
        break;
      case "Snow":
        $("body").css(
          "background-image",
          "url('https://www.surfnetkids.com/resources/wp-content/uploads/2016/12/snow.jpg')"
        );
        break;
      case "Atmosphere":
        $("body").css(
          "background-image",
          "url('https://undark.org/wp-content/uploads/sites/2/2017/05/fog.jpg')"
        );
        break;
      case "Clear":
        $("body").css(
          "background-image",
          "url('http://www.photos-public-domain.com/wp-content/uploads/2011/02/bright-sun-in-blue-sky.jpg')"
        );
        break;
      case "Clouds":
        $("body").css(
          "background-image",
          "url('http://www.strategictechplanning.com/blog/wp-content/uploads/2014/01/clouds.jpg')"
        );
        break;
      default:
        $("body").css(
          "background-image",
          "url('http://www.strategictechplanning.com/blog/wp-content/uploads/2014/01/clouds.jpg')"
        );
    }
  });
}
