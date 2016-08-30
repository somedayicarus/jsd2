console.log('hello sticky notes');

var button = document.querySelector("button");
var container = document.querySelector(".container");
var boxColor = document.querySelector(".box-color");
var boxNote = document.querySelector(".box-note");

window.addEventListener("load", function() {

	var noteCount = 1;

	button.addEventListener("click", function(e) {
		console.log("button clicked");

		var color = boxColor.value;
		var note = boxNote.value;

		var box = document.createElement("div");
		box.className = "box";
		box.innerHTML = noteCount + ". " + note;
		box.style.backgroundColor = color;

		container.appendChild(box);

		noteCount++;
	});

});

