
      $(document).ready(function() {
        $(".btn").on("click",function(){
            var cityName = $('#cityList').val(); 
         $("#city").prepend("<br><hr>" + cityName);
          // This is our API key. Add your own API key between the ""
    var APIKey = "e97afa7b3ec61a7ad5f41620a5e245c4";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response)
      var cityName = $("<h1>").text(response.name + " "+ moment().format('L'));
      var icon = "<img src='http://openweathermap.org/img/w/"+response.weather[0].icon+".png'> "
      var celcius = response.main.temp - 273.15;
      var currentTemperature = $("<h5 id = curTemp>").text("Temperature: " + celcius.toFixed(0) + " c");
      var currentHumidity =  $("<h5 id = curHum>").text("Humidity : " + response.main.humidity + " %");
      var windSpeed =  $("<h5 id = winSpe>").text("Wind Speed : " + response.wind.speed + "MPH");
      var longitude = response.coord.lon;
      console.log(longitude);
      var latitude = response.coord.lat;
      console.log(latitude)

      var queryURLUV="https://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+ latitude + "&lon=" + longitude;
      $.ajax({
        url: queryURLUV,
        method: "GET"
        }).then(function(response) {  
         console.log(response); 
       var uvIndex =  $("<h5 id = uvInd>").text("UV Index: " + response.value);
      $(".weatherInfo").empty();
      $(".weatherInfo").append(cityName, icon, currentTemperature, currentHumidity, windSpeed, uvIndex);

         });
        });
         
         });
        });