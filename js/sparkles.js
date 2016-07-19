//array of sparkle gifs
var bling = ['images/sparkle_yellow.gif', 'images/tiny_blue_sparkle.gif', 'images/large_star_outline_pink.gif',
 'images/pink_sparkle_stars.gif', 'images/sparkle_green.gif', 'images/sparkles.gif',
 'images/sparkle_silver.gif', 'images/sparkles_multi.gif', 'images/twinkles_blue.gif', 'images/sparkles_multi_2.gif']


//create variable and link it to sparkle button
var sparkleButton = document.getElementById("sparkle-btn");

//add event listener
sparkleButton.addEventListener('click', addSparkles)


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
	document.getElementById('container').appendChild(sparkleGIF);
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
