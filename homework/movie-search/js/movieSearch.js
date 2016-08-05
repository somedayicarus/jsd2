// Structure
// ----------------------------------------------
var results = document.querySelector(".results")
var search = document.querySelector("#query");
var form = document.querySelector("form");
var img = document.querySelector(".poster")
var OMDbAPI;

// Events
// ----------------------------------------------
form.addEventListener("submit", getData);

// Event handlers
// ----------------------------------------------
function getData(e) {
	e.preventDefault();
	console.log(e);
	OMDbAPI = "https://www.omdbapi.com/?s=" + search.value;;
	$.getJSON(OMDbAPI, handleData);
}

function handleData(json) {
	//clear previous search results
	results.innerHTML = "";
	img.src = "";
	console.log(json);
	if(json["Response"] === "False") {
		var li = document.createElement("li");
		li.textContent = json["Error"];
		li.classList.add("not-found");
		results.appendChild(li);
	} else {
		json["Search"].forEach(listResults);
	}
}

function listResults(movie) {
	//create elements
	var li = document.createElement("li");
	var a = document.createElement("a");
	var aText = document.createTextNode(movie["Title"]);

	//add content
	a.appendChild(aText);
	a.href = movie["Poster"];

	//update page
	li.appendChild(a);
	results.appendChild(li);

	//display poster on click
	a.addEventListener("click", function(e) {
		e.preventDefault();
		if(movie["Poster"] === "N/A") {
			img.src = "images/no-poster.png"
		} else {
			img.src = a.href;
		}
	})
}

