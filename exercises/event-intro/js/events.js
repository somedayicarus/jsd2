var body = document.querySelector("body");
var counter = 0;

var h1 = document.createElement("h1");
h1.innerHTML = "Events";
body.appendChild(h1);

var me = document.createEvent("MouseEvent");
me.initEvent("dblclick");


h1.addEventListener("dblclick", count);

function count(e) {
	counter ++;
	console.log("count", counter);
	console.log(e.type);
	console.log(e.target);
}

h1.dispatchEvent(me);
