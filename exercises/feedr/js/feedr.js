// Setup
// ------------------------------------------------
var sourceTemplate = document.querySelector("#source-template");
var articleTemplate = document.querySelector("#article-template");
var popup = document.querySelector("#popUp");
var container = document.querySelector(".container");
var closePopUp = document.querySelector(".closePopUp");
var ul = document.querySelector("ul");

// Structure
// ------------------------------------------------
var main = document.querySelector("#main");
var articles;

var sources = [
	{
		name: "TechCrunch",
		path: "techcrunch"
	},
	{
		name: "The Next Web",
		path: "the-next-web"
	},
	{
		name: "Buzzfeed",
		path: "buzzfeed"
	},
	{
		name: "Wired",
		path: "wired-de"
	},
	{
		name: "The New York Times",
		path: "the-new-york-times"
	},
	{
		name: "Reddit",
		path: "reddit-r-all"
	}
];

// Event Listeners
// ------------------------------------------------
window.addEventListener("load", toggleHidden);
window.addEventListener("load", getJSON);
window.addEventListener("load", getSources);
main.addEventListener("click", populatePopUp);
closePopUp.addEventListener("click", toggleHidden)



// Event Handlers
// ------------------------------------------------
function getSources(event) {
	var template = Handlebars.compile(sourceTemplate.innerHTML);
	ul.innerHTML = template(sources);
}

function getJSON(event) {
	var url = "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=ce2ae499737a4b28a9618e6b36fa2076";
	var jqxhr = $.getJSON(url, displayArticles);
}

function displayArticles(json) {
	var template = Handlebars.compile(articleTemplate.innerHTML);
	main.innerHTML = template(json.articles);
	articles = json.articles;

	if(json.status === "ok") {
		toggleHidden();
	}
}

function toggleHidden(event) {
	popup.classList.toggle("hidden");
}

function populatePopUp(event) {
	event.preventDefault();
	var clicked = event.target.closest("article");
	console.log(clicked);
	
	//create elements
	var h1 = document.querySelector("#popUp .container h1");
	var p = document.querySelector("#popUp .container p");
	var a = document.querySelector("#popUp .container a");

	//add content, etc
	articles.forEach(function(item) {
		if(clicked.dataset.url == item.url) {
			h1.textContent = item.title;
			p.textContent = item.description;
			a.href = item.url;

			popup.classList.remove("loader", "hidden");
		}
	});
}



