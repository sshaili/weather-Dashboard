
      $(document).ready(function() {
        $(".btn").on("click",function(){
            var cityName = $('#cityList').val(); 
         $("#city").prepend("<div id=eachCity>" + cityName);
         callApi();
         saveHistory();
        });
    });
       
    function callApi(){
           
          // This is our API key. Add your own API key between the ""
    var APIKey = "e97afa7b3ec61a7ad5f41620a5e245c4";
    var cityName = $('#cityList').val(); 

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var citySelect = $("<h1>").text(response.name + " "+ moment().format('L'));
      var icon = "<img src='http://openweathermap.org/img/w/"+response.weather[0].icon+".png'> "
      var celcius = response.main.temp - 273.15;
      var currentTemperature = $("<h5 id = curTemp>").text("Temperature: " + celcius.toFixed(0) + " c");
      var currentHumidity =  $("<h5 id = curHum>").text("Humidity : " + response.main.humidity + " %");
      var windSpeed =  $("<h5 id = winSpe>").text("Wind Speed : " + response.wind.speed + "MPH");
      
      
      var longitude = response.coord.lon;
      var latitude = response.coord.lat;
      var queryURLUV="https://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+ latitude + "&lon=" + longitude;
      $.ajax({
        url: queryURLUV,
        method: "GET"
        }).then(function(response) {  
       var uvIndex =  $("<h5 id = uvInd>").text("UV Index: " + response.value);
      $(".weatherInfo").empty();
      $(".weatherInfo").append(citySelect, icon, currentTemperature, currentHumidity, windSpeed, uvIndex);
            if(response.value < 3){
                $( "#uvInd" ).css( "color", "green" );
              
            }else if(response.value >= 3  && response.value < 8 ){
                $( "#uvInd" ).css( "color", "yellow" );
               
            }else{
                $( "#uvInd" ).css( "color", "red" );
              
            }
            
          
           
            var forcast="https://api.openweathermap.org/data/2.5/forecast?q=" +cityName+ "&appid=" +APIKey ;
           
            $.ajax({
              url: forcast,
              method: "GET"
              }).then(function(response) { 
                $("#forcast").empty(); 
                $("#forcast").append("<div id=fiveDayForcast></div>");
                $("#fiveDayForcast").addClass("row text-center");

                for(i=1,j=0; i<=5; i++){
                  $("#fiveDayForcast").append("<div class=col id=day"+i+"></div>");
                  $("#day"+i).append("<h6 id=forcastDate"+i+"></h6>");
                  var curDate = response.list[j].dt_txt;
                  $("#forcastDate"+i).text(curDate.slice(0,10));

                  $("#day"+i).append("<img src='http://openweathermap.org/img/w/"+response.list[j].weather[0].icon+".png'>");
                  
                  var tempratureForcast = response.list[j].main.temp - 273.15;
                  $("#day"+i).append("<h6 id=curTemp"+i+"></h6>");
                  $("#curTemp"+i).text("Temp: " + tempratureForcast.toFixed(0) + " c");
                  
                  $("#day"+i).append("<h6 id=curHum"+i+"></h6>");
                  $("#curHum"+i).text("Humidity : " + response.list[j].main.humidity + " %");

              j = j+8;  
              }
                
              });
        

    });
    });
   }

 