//setup 
//.....................


//shopstyle API endpoint
var pid = "uid3904-35452852-63";
var url = "http://api.shopstyle.com/api/v2/products?pid=" + pid + "&limit=50";
var catURL = "http://api.shopstyle.com/api/v2/categories?pid=uid3904-35452852-63&&&cat=women&depth=2";

//handlebar templates
var resultsTemplate = document.querySelector("#results-template");
var savedTemplate = document.querySelector("#saved-template");
var fulfilledTemplate = document.querySelector("#fulfilled-template");


// Initialize Firebase
var config = {
apiKey: "AIzaSyC0OdzgE2grH1ZTXHB4Z9dWdAsUL8M9rbc",
authDomain: "tinsel-4db11.firebaseapp.com",
databaseURL: "https://tinsel-4db11.firebaseio.com",
storageBucket: "tinsel-4db11.appspot.com",
};

firebase.initializeApp(config);
var firebaseRef = firebase.database().ref();

//data prep
var results;

var data = {
	"wishes": [],
	"fulfilled": [0]
};


//DOM Elements
//.....................
var main = document.querySelector("#main-container");
var form = document.querySelector("form");
var input = document.querySelector("#search");
var logo = document.querySelector(".logo");
var heart = document.querySelector(".heart");
var fulfilledContainer = document.querySelector("#fulfilled-container");
var browse = document.querySelector(".browse");
var h1 = document.querySelector(".headline");
var loader = document.querySelector(".loader");


//event listeners 
//.....................

//on load, dispaly saved items
window.addEventListener("load", init)	

//on search submit, show results
form.addEventListener("submit", runSearch);

//on filter, update results

//on logo click, load saved lists
logo.addEventListener("click", showBrowse);

//on heart click, show saved items
heart.addEventListener("click", init)

//when category clicked - query api and display results
browse.addEventListener("click", browseByCategory);


//event handlers 
//.....................


function init(e) {
	firebaseRef.once('value').then(getData);
}

//run ajax request with input field value as search parameters
function runSearch(e) {
	e.preventDefault();
	showLoader();
	browse.classList.add("hidden");
	h1.textContent = "Search results for: '" + input.value + "'";
	//format search term 
	var searchText = "&fts=" + input.value.split(' ').join('+');
	$.getJSON(url + searchText, function() {
		var timeoutID = setTimeout(hideLoader, 10000)
	})
		.done(displayResults)
		.fail(hideLoader);

	input.value = "";
}

function browseByCategory(e) {
	e.preventDefault();
	if(e.target.tagName != "A") {
		return;
	} else {
		showLoader();
		browse.classList.add("hidden");
		h1.textContent = e.target.textContent;
		var cat = "&cat=" + e.target.dataset.cat;

		$.getJSON(url + cat, function() {
			var timeoutID = setTimeout(hideLoader, 1000)
		})
			.done(displayResults);
	}
	
}

function addWish(e) {
	if(e.target.tagName != "SPAN") {
		return;
	};
	
	e.preventDefault();
	var clicked = e.target.closest("figure");
	var index = clicked.dataset.index;
	var product = results[index];

	//create JSON for new saved item
	var wish = {
		id: product.id,
		name: product.name,
		price: product.price,
		image: product.image.sizes.Large.url,
		url: product.clickUrl,
		fulfilled: false
	}

	//add wish item to wishes array
	data.wishes.push(wish);

	//add liked class to icon 
	e.target.classList.add("liked")
	console.log(e.target.classList);

	//save updated list data to firebase
	saveData(data);
}


function markFulfilled(e) {
	e.preventDefault();
	if(e.target.tagName != "SPAN") {
		return;
	} else if(e.target.classList.contains("glyphicon-ok")) {
		var clicked = e.target.closest("figure");
		var index = clicked.dataset.index;
		var product = data.wishes[index];

		product.fulfilled = true;
		console.log(data);
		var granted = {
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
			url: product.url,
			fulfilled: true,
			thanked: false
		}
		
		data.fulfilled.push(granted);
		data.wishes.splice(index, 1)

		saveData();
	displaySaved(data);
	displayFulfilled(data);
	}
	
	
}

function deleteSavedItem(e) {
	e.preventDefault();
	if(e.target.tagName != "SPAN") {
		return;
	} else if(e.target.classList.contains("glyphicon-remove")) {
		var clicked = e.target.closest("figure");
		var index = clicked.dataset.index;

		data.wishes.splice(index, 1)
	} 
	saveData();
	displaySaved(data);
}

function deleteFulfilled(e) {
	e.preventDefault();
	console.log(e);
	if(e.target.tagName != "SPAN") {
		return;
	} else if(e.target.classList.contains("glyphicon-trash")) {
		var clicked = e.target.closest("li");
		var index = clicked.dataset.index;

		data.fulfilled.splice(index, 1)

		saveData();
		displayFulfilled(data);
	}
	
}

function markThanked(e) {
	e.preventDefault();
	if(e.target.tagName != "SPAN") {
		return;
	} else if(e.target.classList.contains("glyphicon-envelope")) {
		var clicked = e.target.closest("li");
		var index = clicked.dataset.index;

		data.fulfilled[index].thanked = true;
		clicked.classList.toggle("thanked");
		console.log(clicked);

		saveData();
	}
}

//firebase functions 
//..................... 
function saveData() {
	firebaseRef.set(data);
	console.log(data);
};	


function getData(snapshot) {
	main.innerHTML = "";
	if(snapshot.val() === null) {
		h1.textContent = "No saved items";
		browse.classList.remove("hidden");
		return;
	}
	// container.innerHTML = "";
	data = snapshot.val();


	displaySaved(data);
	displayFulfilled(data);

};


//Handlebar and display functions
//..................... 

//compile search results template with results array
function displayResults(json) {
	//save json.products in results array
	results = json.products;
	main.classList.remove("hidden");
	loader.classList.add("hidden");
	var template = Handlebars.compile(resultsTemplate.innerHTML);
	main.innerHTML = template(results);

	//dont display fulfilledContainer template
	fulfilledContainer.innerHTML = "";

	//grab results container and add event listener for addWish funciton
	var searchResults = document.querySelector(".results-container");
	searchResults.addEventListener("click", addWish);
};

//compile saved wishes template with data.wishes array
function displaySaved(json) {
	//hide browsing categories list
	browse.classList.add("hidden");
	
	if(json.wishes == undefined || json.wishes.length == 0) {
		h1.textContent = "No saved items";
		browse.classList.remove("hidden");
		main.classList.add("hidden");
		json.wishes = [];
	} else {
		var template = Handlebars.compile(savedTemplate.innerHTML);
		main.innerHTML = template(json.wishes);

		//set headline
		h1.textContent = "Saved items";

		//grab saved items container and add event listeners 
		var savedItems = document.querySelector(".saved-container");
		savedItems.addEventListener("click", markFulfilled);
		savedItems.addEventListener("click", deleteSavedItem);
	}	
};

function displayFulfilled(json) {
	
	if(json.fulfilled.length == 1) {
		fulfilledContainer.innerHTML = '';
		return;
	}
	var template = Handlebars.compile(fulfilledTemplate.innerHTML);
	fulfilledContainer.innerHTML = template(json.fulfilled);

	var fulfilledItems = document.querySelector(".fulfilled-container");
	fulfilledItems.addEventListener("click", deleteFulfilled);
	fulfilledItems.addEventListener("click", markThanked)
}

function showBrowse(e) {
	e.preventDefault();
	console.log(e);
	h1.textContent = '';
	main.innerHTML = '';
	fulfilledContainer.innerHTML = '';
	browse.classList.remove('hidden');
}



function hideLoader() {
	loader.classList.add("hidden");
}

function showLoader() {
	loader.classList.remove("hidden");
}




	