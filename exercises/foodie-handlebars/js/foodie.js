// Structure
// ------------------------------------
var results = document.querySelector(".results");
var form = document.querySelector("form");
var zip = document.querySelector(".zip");
var header = document.querySelector("#total-results");

var headerTemplate = document.querySelector("#header-template");
var restaurantTemplate = document.querySelector("#restaurant-template");

function getRestaurants(e) {
	e.preventDefault(e);
	var search = zip.value;
	var url = "http://opentable.herokuapp.com/api/restaurants?zip=" + search;
	$.getJSON(url, updateRestaurants);
};

// Events
// ------------------------------------
form.addEventListener("submit", getRestaurants);

// Update page
// ------------------------------------
function updateRestaurants(json) {
	results.innerHTML = "";

	var template = Handlebars.compile(headerTemplate.innerHTML);
	header.innerHTML = template(json);

	//compiling template src from script tag into handlebars template
	var template = Handlebars.compile(restaurantTemplate.innerHTML);
	results.innerHTML = template(json["restaurants"]);
};




