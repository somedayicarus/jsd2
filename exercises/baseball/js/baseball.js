// Elements
// ------------------------------------------
var date      = document.querySelector('.date');
var games     = document.querySelector('.games');

var dateTemplate = document.querySelector("#date-template");
var gamesTemplate = document.querySelector("#game-template");

// Templates
// ------------------------------------------
function getDate(json) {
	var template = Handlebars.compile(dateTemplate.innerHTML);
	date.innerHTML = template(json);
}

function getScores(json) {
	var template = Handlebars.compile(gamesTemplate.innerHTML);
	games.innerHTML = template(json.games);
}


getDate(mockdata);
getScores(mockdata);