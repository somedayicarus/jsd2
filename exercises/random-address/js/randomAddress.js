// Structure
// ------------------------------------------
var button    = document.querySelector('main button');
var addresses = document.querySelector('main .addresses');


// Events
// ------------------------------------------
button.addEventListener('click', generateAddress);


// Setup
// ------------------------------------------
// TODO: create your arrays here (street, city, state, etc)
var streetNumbers = [123, 33, 437, 2448, 999, 36];
var streetNames = ['Golden Gate Avenue', '7th Avenue', 'Folsom Street', 'Great Hollow Road', 'Robinson Road'];
var cityNames = ['Santa Barbara', 'San Francisco', 'Hanover', 'San Antonio', 'Lebanon'];
var stateNames = ['CA', 'NH', 'VT', 'OR', 'IL', 'MA', 'TX'];
var zipCodes = [13755, 94118, 11100, 93067, 94107, 78786];


// Event Listeners
// ------------------------------------------
function generateAddress(e) {
	// TODO: randomly select one item from each of these arrays 
	var randomNumber = getRandomInt(0, streetNumbers.length - 1);
	var randomStreet = getRandomInt(0, streetNames.length - 1);
	var randomCity = getRandomInt(0, cityNames.length - 1);
	var randomState = getRandomInt(0, stateNames.length - 1);
	var randomZip = getRandomInt(0, zipCodes.length - 1);

	var randomAddress = streetNumbers[randomNumber] + ' ' + streetNames[randomStreet]  + ', ' + cityNames[randomCity] + ', ' + stateNames[randomState] + ' ' + zipCodes[randomZip];
	
	addAddress(randomAddress);

}


// Update page functions
// ------------------------------------------
function addAddress(address) {
	var li = document.createElement('li');
	li.innerHTML = address;
	addresses.appendChild(li);
}

//helper function 
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




