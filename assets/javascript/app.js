
//variables 
var address;
var map;
var stadiumQ = 0;



//functinon to submit park name, and show available parking garages on map
$("#submit").on("click", function () {

    event.preventDefault();
    $("#parking-info-table tbody").empty();

     var stadium = $("#stadiumVal").val();
    console.log(stadium);
    var queryURL = "http://api.parkwhiz.com/" + stadium + "/?page=2&no_event_301=1&key=f02ac3a6bef919dd3a80a73e964af9e9d3d2991a";

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

    /*     for (i = 0; i < response.parking_listings.length; i++) { */

     
        if (response.parking_listings.length > 10) {
            stadiumQ = 10;
        } else {
            stadiumQ = response.parking_listings.length + 1;
        }


        for (i = 0; i < stadiumQ; i++) {

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
          





        };
/* console.log(response); */
    });







});



