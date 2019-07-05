<h1>Group Project 1</h1>

<strong><h3>Out of The Park </h3></strong> 

 
---
<strong><h3>Project Description |</h3></strong>
Our app is designed to quickly but efficiently guide baseball fans to parking facilities that have accurate, up to date information in regard to closures, addresses and parking rates.

Parallax scrolling was used to create the sleek design of the app. 

User's select their favorite MLB team and the Bing Maps API is queried to show the general vicinity of the stadium and displays push pins.

In the same onClick function, the ParkWhiz API is also queried to show available parking lots or structures closest to the stadium. 

In addition, users are given nearby restaurant suggestions via the Zomato API. We pulled the latitude and longitude of the stadium location from the Bing Maps API into the Zomato query to offer users suggestions on restaurants located near the stadium and parking structures. We also hid the div that contains the Zomato results using display:none until the onClick function for the parking search is triggered. Once triggered, Zomato will return 5 restaurant suggestions in the area.

Several MLB parks currently rely only on their own parking structures or lots and did not have parking available via the ParkWhiz API. Should a user select a team without parking available from ParkWhiz, a modal appears alerting users that their team currently does not have outside parking. 

---
<strong><h3>Team Members |</h3></strong>
 * Ashlie Warren 
 * Christian Mader 
 * Erin Lyden 
 * Isidro Quevedo
 
 # Demo
 https://irishjedi77.github.io/Parking/

---
<strong><h3>APIs |</h3></strong>
  * ParkWhiz [ https://www.parkwhiz.com/apikey=572094d12777806d7c3175bd54245f00ba20ba82 ]
  * Zomato [ https://www.zomato.com/d23536464f4c1f106274e3197e9d49f7 ]
  * Bing Maps [ https://www.microsoft.com/en-us/maps/documentation ]
  
---
  
  

