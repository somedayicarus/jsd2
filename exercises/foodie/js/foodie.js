// Structure
// ------------------------------------
var results = document.querySelector(".results");
var openTableAPI = "http://opentable.herokuapp.com/api";

// Events
// ------------------------------------


// Event Handler 
// ------------------------------------


// Update page
// ------------------------------------
function updateRestaurants(json) {
	json.forEach(createRestaurant);
};

function createRestaurant(restaurant) {

	// create elements 
	var li = document.createElement("li");
	var img = document.createElement("img");
	var h2 = document.createElement("h2");
	var p = document.createElement("p");

	// add content 
	img.src = restaurant.image;
	h2.textContent = restaurant.name;
	p.textContent = restaurant.address;

	// append to parents
	results.appendChild(li);
	li.appendChild(img);
	li.appendChild(h2);
	li.appendChild(p);
};

var ramen = {
	name: "Best Ramen",
	address: "1 Delicious Ln, Tokyo, Japan",
	image: "http://greatist.com/sites/default/files/styles/big_share/public/SlowCooker-Pork-Ramen_0.jpg?itok=kvBKeje7"
};

var pizza = {
	name: "Best Pizza",
	address: "3 Pizzeria Ln, Rome, Italy",
	image: "https://www.pizzahut.com/assets/w/tile/thor/Pepperoni_Lovers_Pizza.png"
};

var dessert = {
	name: "Best Dessert",
	address: "6 Yum Ln, San Francisco, CA",
	image: "http://www.craveamerica.com/wp-content/uploads/2015/10/dessert.jpg"
};

var restaurants = [ramen, pizza, dessert];



