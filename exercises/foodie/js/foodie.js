// Structure
// ------------------------------------
var results = document.querySelector(".results");
var form = document.querySelector("form");
var zip = document.querySelector(".zip");

function getRestaurants(e) {
	e.preventDefault(e);
	var search = zip.value;
	console.log(search); 
	var url = "http://opentable.herokuapp.com/api/restaurants?zip=" + search;
	$.getJSON(url, updateRestaurants);
};

// Events
// ------------------------------------
form.addEventListener("submit", getRestaurants);

// Event Handler 
// ------------------------------------


// Update page
// ------------------------------------
function updateRestaurants(json) {
	results.innerHTML = "";
	json["restaurants"].forEach(createRestaurant);
};

function createRestaurant(restaurant) {

	// create elements 
	var li = document.createElement("li");
	var img = document.createElement("img");
	var h2 = document.createElement("h2");
	var p = document.createElement("p");

	// add content 
	img.src = restaurant.image_url;
	h2.textContent = restaurant.name;
	p.textContent = restaurant.address;

	// append to parents
	results.appendChild(li);
	li.appendChild(img);
	li.appendChild(h2);
	li.appendChild(p);
};




