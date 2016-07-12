// Structure
// ------------------------------------------
var rollButton = document.querySelector('.roll-button');
var firstDie   = document.querySelector('#first-die');
var secondDie  = document.querySelector('#second-die');


// Events
// ------------------------------------------
rollButton.addEventListener('click', rollDice);


// Event Listeners
// ------------------------------------------

function rollDice() {
	
	var random1 = getRandomInt(1, 6);
	var random2 = getRandomInt(1, 6);

	firstDie.className  = "dice-" + random1;
	secondDie.className = "dice-" + random2;
};



// Helper Functions
// ------------------------------------------
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};