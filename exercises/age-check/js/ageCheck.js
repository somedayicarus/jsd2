// Structure
// ------------------------------------------
var input  = document.querySelector('.age-check input');
var button = document.querySelector('.age-check button');
var p      = document.querySelector('.age-check p');

// Events
// ------------------------------------------
button.addEventListener('click', checkAge);

// Event Listeners
// ------------------------------------------
function checkAge(e) {
	var age = parseInt(input.value);
	var privilege = getPrivilege(age);
	displayPrivilege(privilege);
}

// Update page functions
// ------------------------------------------
function displayPrivilege(privilege) {
	p.innerHTML = privilege
}

// Determine the privilege to display
// ------------------------------------------
// TODO: write the getPrivilege function here

function getPrivilege(age) {
	if (age < 16) {
		return "You cannot do much outside of going to school";
	} else if (age >= 16 && age < 18) {
		return "You can drive";
	} else if (age >= 18 && age < 21) {
		return "You can vote";
	} else if (age >= 21 && age < 25) {
		return "You can drink alcohol";
	} else if (age >= 25 && age < 35) {
		return "You can rent a car";
	} else if (age >= 35 && age < 62) {
		return "You can run for president";
	} else {
		return "You collect social security benefits";
	}
};



