

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
var count = 0;

$(".table").hide()


//functinon to submit park name, and show available parking garages on map
$("#submit").on("click", function () {

    event.preventDefault();
    $(".home-address").empty();
    $("#directionsItinerary").empty();
    $("#parking-info-table tbody").empty();
    $("#maps").show();

    var stadium = $("#stadiumVal").val();
    var bingQ = "https://api.parkwhiz.com/" + stadium + "/?page=2&no_event_301=1&key=f02ac3a6bef919dd3a80a73e964af9e9d3d2991a";


    $.ajax({
        url: bingQ,
        method: "GET",

        beforeSend: function () {
            $("#myMap").hide();
            $("#load").show();
        },

        complete: function () {
            $("#load").hide();
            $("#myMap").show();
        }

    }).then(function (response) {

        if (!response.parking_listings) {

            // Get the modal
            var modal = document.getElementById('myModal');
            modal.style.display = "block";

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];


            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            }
            $(".home-address").empty();
            $("#directionsItinerary").empty();
            $("#parking-info-table tbody").empty();


        } else {
            //console.log(response.parking_listings[0].address);
            stadiumLat = response.lat;
            stadiumLng = response.lng;
            console.log(stadiumLng)
            console.log(stadiumLat)
            $("#suggestions").empty();
            foodInfo(stadiumLat, stadiumLng);
            map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
                center: new Microsoft.Maps.Location(response.lat, response.lng), zoom: 10
            });

            var stadiumMain = new Microsoft.Maps.Location(response.lat, response.lng);
            var pushpinMain = new Microsoft.Maps.Pushpin(stadiumMain, { color: 'red' });
            map.entities.push(pushpinMain);
            //console.log("exit loadMapScenario");

            for (var i = 0; i < 10; i++) {


                var lat = response.parking_listings[i].lat;
                var long = response.parking_listings[i].lng;
                var name = response.parking_listings[i].location_name;

                var price = response.parking_listings[i].price_formatted;
                var address = response.parking_listings[i].address;
                var city = response.parking_listings[i].city;
                var state = response.parking_listings[i].state;


                var garage = new Microsoft.Maps.Location(lat, long);
                var pushpin = new Microsoft.Maps.Pushpin(garage, { text: (i + 1).toString(), subTitle: name });
                map.entities.push(pushpin);

                // Display the parking info

                var newRow = $("<tr>").append(
                    $("<td>").text(i + 1),
                    $("<td>").text(name),
                    $("<td>").text(price),
                    $("<td>").text(address),
                    $("<td>").text(city),
                    $("<td>").text(state),
                    $("<td>").html(`<button type="button" class="submit-address btn btn-secondary" data-lat="${lat}" data-long="${long}">Get Directions</buttton>`)
                );

                // Append the new row to the table
                $(".table").show();
                $("#parking-info-table tbody").append(newRow);






            };
            /* console.log(response); */
        };
    });

    //display parking input
    var addressRow = $("<h3>").text("Starting Address: ").append(

        $("<input>").attr({
            type: "text",
            placeholder: "Starting Address",
            name: "address",
            id: "addressInput",
            class: "text-muted"

        })

    );

    $(".home-address").append(addressRow);



    function foodInfo(lat, long) {
        //console.log(stadiumLat, stadiumLng)

        //var stadiumFood = $("#stadiumVal option:selected").attr("id");
        var zomatoQuery = 'https://developers.zomato.com/api/v2.1/search?count=5&lat=' + lat + '&lon=' + long + '&apikey=809cacce2b45b91bf605edacedac021c';



        $.ajax({
            url: zomatoQuery,
            method: "GET"
        }).then(function (response) {
            console.log("response array" + response);

            for (i = 0; i < response.restaurants.length; i++) {

                var name = response.restaurants[i].restaurant.name;
                var location = response.restaurants[i].restaurant.location.address;
                var foodURL = response.restaurants[i].restaurant.url;
                console.log(foodURL);
                console.log(name, location);

                var imgURL = response.restaurants[i].restaurant.thumb;

                var newRow = $("<tr>").append(
                    $("<img>").attr("src", imgURL),
                    $("<td>").html(`<a href='${response.restaurants[i].restaurant.url}' target='blank'>${name}</a>`),
                    $("<td>").text(location),
                    $("<tr>").attr("class", "newRow")

                );

                $("#foodOptions").show();
                // Append the new row to the table
                $("#suggestions").append(newRow);



            }



        });


        //console.log("" + stadiumFood);
        return
    };


});



//direction functionality 
$(document).on("click", ".submit-address", function (e) {
    e.preventDefault();


    var data = $(this).data();
    console.log(data.long, data.lat);

    var homeAddress = $("#addressInput").val().trim();

    console.log(homeAddress);



    function GetMap() {


        //Load the directions module.
        Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {



            //Create an instance of the directions manager.
            directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);


            if (count = 1) {

                map.layers.clear();
            };

            //Create waypoints to route between.
            var startingWaypoint = new Microsoft.Maps.Directions.Waypoint({ address: homeAddress });
            directionsManager.addWaypoint(startingWaypoint);

            var endWaypoint = new Microsoft.Maps.Directions.Waypoint({ address: 'end', location: new Microsoft.Maps.Location(data.lat, data.long) });
            directionsManager.addWaypoint(endWaypoint);

            //Specify the element in which the itinerary will be rendered.
            directionsManager.setRenderOptions({ itineraryContainer: '#directionsItinerary' });

            //Calculate directions.
            directionsManager.calculateDirections();

            count = 1;


        });
    };
    GetMap();

});

