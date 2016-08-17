//setup 
//..............
var button = document.querySelector("button");

//establish connection with firebase
var firebaseRef = new Firebase("https://jsd2-test.firebaseio.com/");

//event handlers 
//..............
button.addEventListener("click", saveChanges);
window.addEventListener("load", restoreChanges);


function saveChanges(e) {
	theme = {
		bg: "pink",
		color: "purple"
	}

	//save data to firebase
	firebaseRef.set(theme);
};

function restoreChanges(e) {
	firebaseRef.on("value", changeColor);
}

function changeColor(snapshot) {
	console.log(snapshot);
	var theme = snapshot.val();
	console.log(theme);
}