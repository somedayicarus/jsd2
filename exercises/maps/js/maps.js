var map;
var mapDiv = document.querySelector("#map");
var options = {
	center: {lat: 37.790841, lng: -122.40128},
	zoom: 17
};


function initMap() {
	console.log("map!");

	//setup new google map object
	map = new google.maps.Map(mapDiv, options);

	//set up new places api search
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: {lat: 37.790841, lng: -122.40128},
		radius: 100,
		type: ['store'],
	}, displayResults);

	//callback function with search result data
	//call createMarker one time each place
	function displayResults(results, status) {
		console.log("displayResults!");
		results.forEach(createMarker);
		// debugger
	};

	//create one marker for each place
	function createMarker(place) {
		var marker = new google.maps.Marker({
			map: map,
			title: 'General Assembly',
			position: place.geometry.location
		});
	};
	
	navigator.geolocation.getCurrentPosition(updateLocation);
};


function updateLocation(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;

	var marker = new google.maps.Marker({
		map: map, 
		title: 'Current Location',
		position: {lat: lat, lng: lng}
	})

};