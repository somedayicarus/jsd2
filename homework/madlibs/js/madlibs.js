// Setup / Data
// ------------------------------------------
var startupX = ['Uber', 'Google', 'Amazon', 'Apple', 'Facebook', 'Twitter', 'Tumblr', 'Netflix', 'Instagram', 'Yelp'];
var startupY = ['Slack', 'Trello', 'Tesla', 'Hyperloop', 'Harvest', 'Shyp', 'Munchery', 'Snapchat', 'Spotify', 'Buzzfeed'];
var startupIdea;
var favorites = [];


// Structure
// ------------------------------------------
var startup  = document.querySelector('.startup');
var generate = document.querySelector('.generate');
var save     = document.querySelector('.save');
var print    = document.querySelector('.print');
var list     = document.querySelector('.list');
var clear    = document.querySelector('.clear');


// Events
// ------------------------------------------
generate.addEventListener('click', generateStartup);
save.addEventListener('click', saveFavorite);
print.addEventListener('click', printFavorites);
clear.addEventListener('click', clearFavorites);


// Event Listeners
// ------------------------------------------
function generateStartup() {

	// TODO: generate two random index numbers, one for each array
	var randomX = Math.floor(Math.random() * startupX.length - 1) + 1;
	var randomY = Math.floor(Math.random() * startupY.length - 1) + 1;

	// concatenate the fixed text with the two random values
	startupIdea = 'A startup that is ' + startupX[randomX] + ', but for ' + startupY[randomY] + '!';

	// Update page with new startup idea
	startup.innerHTML = startupIdea;
};

function saveFavorite() {
	// add the new idea to the array
	favorites.push(startupIdea);
};

function printFavorites() {
	var favoritesText = '';
	list.innerHTML = '';

	// concatenate favorites into one string
	favorites.forEach(createString);
	function createString(itemInArray) {
		favoritesText = favoritesText + itemInArray + '<br>';

	};

	// update the list element with the new concatenated string
	list.innerHTML = '<h2>Startup Ideas</h2>' + favoritesText;
};

function clearFavorites() {
	// clear favorites array and list
	favorites = [];
	list.innerHTML = ''; 
};


// Init
// ------------------------------------------
generateStartup();

