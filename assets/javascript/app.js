
//variables 
var address;
var map;


//functinon to submit park name, and show available parking garages on map
$("#submit").on("click", function () {

    event.preventDefault();

    var stadium = $("#stadiumVal").val();
    console.log(stadium);
    var queryURL = "http://api.parkwhiz.com/" + stadium + "/?page=2&no_event_301=1&key=f02ac3a6bef919dd3a80a73e964af9e9d3d2991a";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //console.log(response.parking_listings[0].address);

        var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
            center: new Microsoft.Maps.Location(response.lat, response.lng)
        });

        var stadiumMain = new Microsoft.Maps.Location(response.lat, response.lng);
        var pushpinMain = new Microsoft.Maps.Pushpin(stadiumMain, { color: 'red' });
        map.entities.push(pushpinMain);
        //console.log("exit loadMapScenario");

        for (i = 0; i < 10; i++) {

            var lat = response.parking_listings[i].lat;
            var long = response.parking_listings[i].lng;
            var name = response.parking_listings[i].location_name;

            console.log(lat, long, name)

            var garage = new Microsoft.Maps.Location(lat, long);
            var pushpin = new Microsoft.Maps.Pushpin(garage, { text: i.toString(), subTitle: name });
            map.entities.push(pushpin);

        };

    });







});



