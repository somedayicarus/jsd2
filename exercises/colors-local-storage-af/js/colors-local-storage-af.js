// structure
var body = document.querySelector("body");
var ul = document.querySelector("ul");

// event handlers
ul.addEventListener("click", function(e) {
		if(e.target.tagName != "LI") {
		return;
	}
	changeColor(e.target.dataset.bg);

	var theme = {
		background: e.target.dataset.bg
	}

 	//save color to local storage
	localStorage.setItem("theme", JSON.stringify(theme));
});


window.addEventListener("load", function(e) {
		//grab theme from local storage
	var theme = localStorage.getItem("theme");

	//check if theme exists, if not exit the function
	if(theme == null) {
		return;
	}

	//convert string to json object
	theme = JSON.parse(theme);

	//call change color and pass background
	changeColor(theme.background);
});

function changeColor(color) {
	body.className = color;	
};


