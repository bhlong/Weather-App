var x;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        x = position.coords.latitude + ',' + position.coords.longitude;
        loadWeather(x);
    });
} else {
    loadWeather("Waterloo, ON", "");
}

$(document).ready(function () {
    setInterval(function() {loadWeather(x);}, 1000);
});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'c',
        success: function (weather) {
            city = weather.city + ', ' + weather.region;
            temp = weather.temp + '&deg;';
            wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">';
            wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
            humidity = weather.humidity + ' %'

            $(".location").text(city);
            $(".temperature").html(temp);
            $(".climate_bg").html(wcode);
            $(".windspeed").html(wind);
            $(".humidity").text(humidity);
        },
        error: function (error) {
            $(".error").html("<p>" + error + "</p>");
        }
    });
}