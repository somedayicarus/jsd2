
// Structure
// ----------------------------------------------
var stop = document.querySelector(".stop-button");
var slow = document.querySelector(".slow-button");
var go = document.querySelector(".go-button");
var caution = document.querySelector(".caution-button");
var stopLight = document.querySelector(".stop-light");
var trafficLight = document.querySelector("#traffic-light");
var blinking;

// Events
// ----------------------------------------------
stop.addEventListener("click", redLight);
slow.addEventListener("click", yellowLight);
go.addEventListener("click", greenLight);
caution.addEventListener("click", blinkingLight);


// Event handlers
// ----------------------------------------------
function redLight(e) {
	clearInterval(blinking);
	trafficLight.classList.remove("slow", "go")
	trafficLight.classList.add("stop");
};

function yellowLight(e) {
	clearInterval(blinking);
	trafficLight.classList.remove("stop", "go");
	trafficLight.classList.add("slow");
};

function greenLight(e) {
	clearInterval(blinking);
	trafficLight.classList.remove("slow", "stop");
	trafficLight.classList.add("go");
};

function blinkingLight(e) {
	trafficLight.classList.remove("go", "stop", "slow");
	blinking = setInterval(toggleYellow, 1000);
};

function toggleYellow(e) {
	trafficLight.classList.toggle("slow");
};


