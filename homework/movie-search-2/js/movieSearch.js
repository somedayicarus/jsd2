
// Structure
// ----------------------------------------------
var results = document.querySelector(".results")
var search = document.querySelector(".search");
var form = document.querySelector("form");
var img = document.querySelector(".poster");
var poster = document.querySelector(".image");
var details = document.querySelector(".text");
var posterNotFound = "images/poster-not-found.png";
var li;
var OMDbAPI;

// Events
// ----------------------------------------------
form.addEventListener("submit", getMovies);
//results.addEventListener("click", getDetails)


// Event handlers
// ----------------------------------------------
//on click, request json and call dispalyResults
function getMovies(e) {
	e.preventDefault();
	console.log(e);
	OMDbAPI = "https://www.omdbapi.com/?s=" + search.value;
	$.getJSON(OMDbAPI, displayResults);
}

//interate over json array and call listResults on each object
function displayResults(json) {
	//clear previous search results
	results.innerHTML = "";
	poster.innerHTML = "";
	details.innerHTML = "";
	
	console.log(json);
	if(json["Response"] === "False") {
		var li = document.createElement("li");
		li.textContent = json["Error"];
		li.classList.add("not-found");
		results.appendChild(li);
	} else {
		json["Search"].forEach(listResults);
	}

	//
	li = document.querySelectorAll("li");
	li.forEach(function(i) {
		i.addEventListener("click", getDetails);
	})

}

//when passed movie object - create list items with each movies properties
function listResults(movie) {
	//create elements
	var li = document.createElement("li");
	var img = document.createElement("img");
	var p = document.createElement("p");

	//add content;
	li.id = movie["imdbID"];
	p.textContent = movie["Title"];

	if(movie["Poster"] === "N/A") {
		img.src = posterNotFound;
	} else {
		img.src = movie["Poster"];
	}

	//update page
	li.appendChild(img);
	li.appendChild(p);
	results.appendChild(li);
}



//on click, request details for clicked movie and call displayDetail
function getDetails(e) {
	OMDbAPI = "https://www.omdbapi.com/?i=" + e.currentTarget.id;

	poster.innerHTML = "";
	details.innerHTML = "";
	$.getJSON(OMDbAPI, listDetail);
}

//

//when passed movie detail object - create elements
function listDetail(json) {
	console.log(json);

	//create elements
	var img = document.createElement("img");
	var h2 = document.createElement("h2");
	var p1 = document.createElement("p");
	var p2 = document.createElement("p");
	var a = document.createElement("a")
	var aText = document.createTextNode("View on IMDb");

	//add content
	a.appendChild(aText);
	h2.textContent = json["Title"];
	a.href = "http://www.imdb.com/title/" + json["imdbID"];
	p1.textContent = json["Plot"];

	if(json["Poster"] === "N/A") {
		img.src = posterNotFound;
	} else {
		img.src = json["Poster"];
	}

	//update page
	poster.appendChild(img);
	details.appendChild(h2);
	details.appendChild(p1);
	p2.appendChild(a);
	details.appendChild(p2);
};


