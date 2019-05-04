$(document).ready(function () {

    //stadiums array

    var stadiums = ["Chase Field", "SunTrust Park", "Oriole Park at Camden Yards", "Oriole Park", "Camden Yards", "Fenway Park", "Wrigley Field", "Guaranteed Rate Field", "Great American Ball Park", "Progressive Field", "Coors Field", "Comerica Park", "Minute Maid Park", "Kauffman Stadium", "Angel Stadium", "Angel Stadium of Anaheim", "Dodger Stadium", "Marlins Park", "Miller Park", "Target Field", "Citi Field", "Yankee Stadium", "Oakland-Alameda County Stadium", "Citizens Bank Park", "PNC Park", "Petco Park", "AT&T Park", "ATT Park", "Safeco Park", "T-Mobile Park", "Busch Stadium", "Tropicana Field", "Globe Life Park", "Globe Life Park in Arlington", "Rogers Centre", "Nationals Park"];




});

//variables 
var address;
var map;
var stadiumQ = 0;

var foodDiv;
var stadiumFood;
var latitude;
var longitude;
var stadiumLat;
var stadiumLng;


//functinon to submit park name, and show available parking garages on map
$("#submit").on("click", function () {

    event.preventDefault();
    $("#parking-info-table tbody").empty();

    var stadium = $("#stadiumVal").val();
    //console.log(stadium);
    var bingQ = "http://api.parkwhiz.com/" + stadium + "/?page=2&no_event_301=1&key=f02ac3a6bef919dd3a80a73e964af9e9d3d2991a";

    $.ajax({
        url: bingQ,
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

            var price = response.parking_listings[i].price_formatted;
            var address = response.parking_listings[i].address;
            var city = response.parking_listings[i].city;
            var state = response.parking_listings[i].state;


            var garage = new Microsoft.Maps.Location(lat, long);
            var pushpin = new Microsoft.Maps.Pushpin(garage, { text: i.toString(), subTitle: name });
            map.entities.push(pushpin);

            // Display the parking info

            var newRow = $("<tr>").append(
                $("<td>").text(i + 1),
                $("<td>").text(name),
                $("<td>").text(price),
                $("<td>").text(address),
                $("<td>").text(city),
                $("<td>").text(state),
            );

            // Append the new row to the table
            $("#parking-info-table tbody").append(newRow);

            function foodInfo() {
            
                stadiumLat = response.lat;
                stadiumLng = response.lng;
        
        
                
                var zomatoQuery = 'https://developers.zomato.com/api/v2.1/search?count=5&lat=' + stadiumLat + '&lon=' + stadiumLng + '&apikey=809cacce2b45b91bf605edacedac021c';
                console.log(zomatoQuery)
        
        
                $.ajax({
                    url: zomatoQuery,
                    method: "GET"
                }).then(function (response) {
                    console.log("response array" + response);
        
                    for (i = 0; i < response.restaurants.length; i++) {
                        var name = response.restaurants[i].restaurant.name;
                        var location = response.restaurants[i].restaurant.location.address;
                        console.log(name, location);
        
                        var imgURL = response.restaurants[i].restaurant.thumb;
        
                        var newRow = $("<tr>").append(
                            $("<img>").attr("src", imgURL),
                            $("<td>").text(name),
                            $("<td>").text(location),
        
                        );
        
                        $("#foodOptions").show();
                        // Append the new row to the table
                        $("#suggestions").append(newRow);
        
        
                    }
        
        
                });
        
    
        
            };
            
            foodInfo();

        };
        
    });


});

