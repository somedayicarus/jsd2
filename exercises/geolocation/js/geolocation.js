// Setup
// ------------------------------------------
var options = {
    enableHighAccuracy: true,
    maximumAge: 3000,
    timeout: 2700
};


// Structure
// ------------------------------------------
var button    = document.querySelector('main button');
var error     = document.querySelector('main .error');
var locations = document.querySelector('main .locations');


// Events
// ------------------------------------------
button.addEventListener('click', clickButton);


// Event Handlers
// ------------------------------------------
function clickButton(event) {
	console.log("clicked");
	navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
}


// Geolocation callback functions
// ------------------------------------------
function geoSuccess(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	console.log("Success! Coordinates: " + latitude, longitude);
}

function geoError(positionError) {
	console.log(error.message);
	}


// Update page functions
// ------------------------------------------
function printLocation(latitude, longitude) {
	var li = document.createElement("li");
	li.innerHTML = latitude + ", " + longitude;
	locations.appendChild(li);
	console.log(latitude, longitude);
}