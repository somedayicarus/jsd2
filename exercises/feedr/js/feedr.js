// Structure
// ------------------------------------------------
var home = document.querySelector("#home");
var sourceTemplate = document.querySelector("#source-template");
var articleTemplate = document.querySelector("#article-template");
var popup = document.querySelector("#popUp");
var closePopUp = document.querySelector(".closePopUp");
var ul = document.querySelector("#menu");
var main = document.querySelector("#main");
var span = document.querySelector("span");
var search = document.querySelector("#search");
var input = document.querySelector("input");

// Setup
// ------------------------------------------------
var articles;

var sources = [
	{
		name: "The Next Web",
		path: "the-next-web"
	},
	{
		name: "TechCrunch",
		path: "techcrunch"
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
home.addEventListener("click", init);
main.addEventListener("click", populatePopUp);
closePopUp.addEventListener("click", hidePopup)
ul.addEventListener("click", chooseSource);
// input.addEventListener("input", filter);

search.addEventListener("click", function(e) {
	e.preventDefault();
	search.classList.add("active");
});

input.addEventListener("blur", function(e) {
	search.classList.remove("active");
})


// Event Handlers
// ------------------------------------------------
function init(e) {
	timeoutID = window.setTimeout(hidePopup, 1000);
	span.innerHTML = "The Next Web";
	getJSON(e);
	displaySources(e);
};

function getJSON(e) {
	var url = "https://newsapi.org/v1/articles?source=the-next-web&apiKey=ce2ae499737a4b28a9618e6b36fa2076";
	$.getJSON(url, displayArticles);
};

function displaySources(e) {
	var template = Handlebars.compile(sourceTemplate.innerHTML);
	ul.innerHTML = template(sources);
};



function displayArticles(json) {
		articles = json.articles;
		var template = Handlebars.compile(articleTemplate.innerHTML);
		main.innerHTML = template(articles);
		
};

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

			popup.classList.remove("hidden", "loader");
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
			popup.classList.remove("hidden");
			popup.classList.add("loader");
			var url = "https://newsapi.org/v1/articles?source=" + item.path + "&apiKey=ce2ae499737a4b28a9618e6b36fa2076";
			$.getJSON(url, displayArticles);
			
			var timeoutID = setTimeout(hidePopup, 1000);
		}
	});
};

function hidePopup() {
	popup.classList.add("hidden");
};


// function filter(e) {
// 	var searchTerms = input.value;

// 	articles.forEach(function(item, index) {
// 		if(item.title.includes(searchTerms) == false) {
// 			console.log(item.title);
// 			console.log(index);
// 			articles.splice(index, 1);

// 			console.log(articles);
// 			// displayArticles(articles);
// 		}
// 		// console.log(includes);
		
// 	})
// };













