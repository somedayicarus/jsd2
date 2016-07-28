function boom() {
	console.log("BOOM!");
}

var bomb = window.setTimeout(boom, 1000);

//clear timer example


//interval setup 

var i = 0;

function count() {
	i++;
	console.log("Count: " + i);
}

var counting = window.setInterval(count, 2000);

function stop() {
	window.clearInterval(counting);
}