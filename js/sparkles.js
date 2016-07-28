//array of sparkle gifs
var bling = ['images/sparkle_yellow.gif', 'images/tiny_blue_sparkle.gif', 'images/large_star_outline_pink.gif',
 'images/pink_sparkle_stars.gif', 'images/sparkle_green.gif', 'images/sparkles.gif',
 'images/sparkle_silver.gif', 'images/sparkles_multi.gif', 'images/twinkles_blue.gif', 'images/sparkles_multi_2.gif']


//create variable and link it to sparkle button
var sparkleButton = document.getElementById("sparkle-btn");
var clear = document.getElementById("clear-btn");
var glitterContainer = document.getElementById("glitter-container");

//add event listener
sparkleButton.addEventListener("click", addSparkles)
clear.addEventListener("click", clearSparkles);

//addSparkles function 
function addSparkles() {
	//generate random sparkle gif
	var randomSparkle =  bling[getRandomInt(0, bling.length - 1)];

	//generate random x and y axis
	var randomX = getRandomInt(0, 100);
	var randomY = getRandomInt(0, 100);

	var sparkleGIF = document.createElement("img");
	sparkleGIF.src = randomSparkle;
	sparkleGIF.style.position = "absolute";
	sparkleGIF.style.top = randomX + "%";
	sparkleGIF.style.left = randomY + "%";
	glitterContainer.appendChild(sparkleGIF);
}

//clearSparkles function
function clearSparkles() {
	while (glitterContainer.firstChild) {
	  glitterContainer.removeChild(glitterContainer.firstChild);
	}
};

//helper function
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
