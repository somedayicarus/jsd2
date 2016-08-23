// Structure
// ------------------------------------------------
var sourceTemplate = document.querySelector("#source-template");
var articleTemplate = document.querySelector("#article-template");
var popup = document.querySelector("#popUp");
var container = document.querySelector(".container");
var closePopUp = document.querySelector(".closePopUp");
var ul = document.querySelector("#menu");
var main = document.querySelector("#main");
var span = document.querySelector("span");

// Setup
// ------------------------------------------------
var articles;
var url = "https://newsapi.org/v1/articles?source=techcrunch&apiKey=ce2ae499737a4b28a9618e6b36fa2076";
span.innerHTML = "TechCrunch";

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
		name: "BuzzFeed",
		path: "buzzfeed"
	},
	{
		name: "Engadget",
		path: "engadget"
	},
	{
		name: "The New York Times",
		path: "the-new-york-times"
	},
	{
		name: "Reddit",
		path: "reddit-r-all"
	}, 
	{
		name: "Mashable",
		path: "mashable"
	},
	{
		name: "Hacker News",
		path: "hacker-news"
	}
];



// Event Listeners
// ------------------------------------------------
window.addEventListener("load", init);
main.addEventListener("click", populatePopUp);
closePopUp.addEventListener("click", hidePopup)
ul.addEventListener("click", chooseSource);


// Event Handlers
// ------------------------------------------------
function init(e) {
	timeoutID = window.setTimeout(hidePopup, 1000);

	getJSON(e);
	getSources(e);
}

function getSources(e) {
	var template = Handlebars.compile(sourceTemplate.innerHTML);
	ul.innerHTML = template(sources);
}

function getJSON(e) {
	var jqxhr = $.getJSON(url, displayArticles);
}


function displayArticles(json) {
	var template = Handlebars.compile(articleTemplate.innerHTML);
	main.innerHTML = template(json.articles);
	articles = json.articles;
}


function populatePopUp(e) {
	e.preventDefault();
	var clicked = e.target.closest("article");
	
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

			showSummary();
		}
	});
};

function chooseSource(e) {
	e.preventDefault();
	console.log(e.target.innerHTML);
	var clicked = e.target.innerHTML;
	span.innerHTML = clicked;

	sources.forEach(function(item) {
		if(clicked === item.name) {
			showLoader()
			var url = "https://newsapi.org/v1/articles?source=" + item.path + "&apiKey=ce2ae499737a4b28a9618e6b36fa2076";
			var jqxhr = $.getJSON(url, displayArticles);
			
			var timeoutID = setTimeout(hidePopup, 1000);
		}
	});
};


//show/hide/load timeout functions
function showSummary() {
	popup.classList.remove("hidden", "loader");
}

function showLoader() {
	popup.classList.remove("hidden");
	popup.classList.add("loader");
}

function hidePopup() {
	popup.classList.add("hidden");
}
