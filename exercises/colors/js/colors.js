var body = document.querySelector("body");
var ul = document.querySelector("ul");

ul.addEventListener("click", clickColor);

function clickColor(e) {
	if(e.target.tagName != "LI") {
		return;
	}
	changeColor(e.target.dataset.color);
}
	
function changeColor(color) {
	//console.log(color);
	body.className = color;
}