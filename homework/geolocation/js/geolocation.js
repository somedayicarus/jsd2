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
var locations = document.querySelector('main .locations');
var error     = document.querySelector('main .error');
var mapDiv = document.querySelector('.map');

var map;
var mapOptions = {
	center: {lat: 37.790841, lng: -122.40128},
	zoom: 17
};



// Events
// ------------------------------------------
button.addEventListener('click', clickButton);


// Event Handlers
// ------------------------------------------
function clickButton(event) {
	console.log('getLocation', event);
	//var watchID = navigator.geolocation.watchPosition(geoSuccess);
};

// Geolocation callback functions
// ------------------------------------------
function geoSuccess(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	printLocation(lat, lng);
};

// Update page functions
// ------------------------------------------
function printLocation(latitude, longitude) {
	var li = document.createElement("li");
	li.textContent = latitude + ", " + longitude;
	locations.appendChild(li);
}

// Callback when Google Maps has loaded
// ------------------------------------------
function initMap() {
	console.log("map!");
	map = new google.maps.Map(mapDiv, mapOptions);

	
}



// Add / update the location marker
// ------------------------------------------
