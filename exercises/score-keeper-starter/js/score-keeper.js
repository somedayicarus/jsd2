// structure
var scoreboard = document.querySelector("#score");
var increase = document.querySelector("#increase-5");
var decrease = document.querySelector("#decrease-5");
var scoreField = document.querySelector("#custom-score");
var setScore = document.querySelector("#submit-custom-score");
var counter = 0;


//event listener
increase.addEventListener("click", increaseScore);
decrease.addEventListener("click", decreaseScore);
setScore.addEventListener("click", setCustomScore);

//callback functions
function increaseScore(e) {
	counter += 5;
	scoreboard.innerHTML = counter + " Points";
};

function decreaseScore(e) {
	if (counter >= 5) {
		counter -= 5;
		scoreboard.innerHTML = counter + " Points";
	}
};

function setCustomScore(e) {
	scoreboard.innerHTML = scoreField.value + " Points";
	counter = parseInt(scoreField.value);
};