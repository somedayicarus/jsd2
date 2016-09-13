//setup 
//.....................

//shopstyle API endpoint
var pid = "uid3904-35452852-63";
var url = "http://api.shopstyle.com/api/v2/products?pid=" + pid + "&limit=50";


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

//fire on load
window.addEventListener("load", init)	

//on search submit, make ajax request
form.addEventListener("submit", runSearch);

//on logo click, show browse categories
logo.addEventListener("click", showBrowse);

//on heart click, show saved items
heart.addEventListener("click", init)

//when category clicked make ajax request
browse.addEventListener("click", browseByCategory);


//event handlers 
//.....................

//on load, grab firebase data and dispaly saved items
function init(e) {
	firebaseRef.once('value').then(getData);
}

//run ajax request with input field value as search parameters
function runSearch(e) {
	e.preventDefault();

	//show loader and hide browse category list
	showLoader();
	browse.classList.add("hidden");

	//set headline content
	h1.textContent = "Search results for: '" + input.value + "'";

	//format search field value as proper string for ajax request
	var searchText = "&fts=" + input.value.split(' ').join('+');

	//make ajax request and pass response to displayResults func
	$.getJSON(url + searchText, displayResults);

	//clear search field
	input.value = "";
};

//run ajax request with product category parameter
function browseByCategory(e) {
	e.preventDefault();

	//disregard any clicks that don't occur on anchor tag
	if(e.target.tagName != "A") {
		return;
	} else {
		//display loader and hide browse categories
		showLoader();
		browse.classList.add("hidden");

		//set headline text
		h1.textContent = e.target.textContent;

		//grab data-cat from clicked element to use url param
		var cat = "&cat=" + e.target.dataset.cat;

		//append category parameter and make ajax request - pass response to displayResults
		$.getJSON(url + cat, displayResults);
	}
};

//adds items to saved list
function addWish(e) {
	//disregard any clicks that dont occur on span tag
	if(e.target.tagName != "SPAN") {
		return;
	};

	e.preventDefault();
	//get clicked target and index
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

	//save updated list data to firebase
	saveData(data);
};

//mark as fulfilled and add to received array on icon click
function markFulfilled(e) {
	e.preventDefault();

	//disregards all clicks that don't occur on ok icon
	if(e.target.tagName != "SPAN") {
		return;
	} else if(e.target.classList.contains("glyphicon-ok")) {
		//get clicked target and index
		var clicked = e.target.closest("figure");
		var index = clicked.dataset.index;
		var product = data.wishes[index];

		//set fulfilled property 
		product.fulfilled = true;

		var received = {
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
			url: product.url,
			fulfilled: true,
			thanked: false
		}
		
		//add received item to fulfilled array and remove from wishlist
		data.fulfilled.push(received);
		data.wishes.splice(index, 1)

		//send new data object to firebase
		saveData();

		//update page with new data object
		displaySaved(data);
		displayFulfilled(data);
	}
};

//remove saved item on icon click
function deleteSavedItem(e) {
	e.preventDefault();

	//disregard clicks that don't occur on remove icon
	if(e.target.tagName != "SPAN") {
		return;
	} else if(e.target.classList.contains("glyphicon-remove")) {

		//get clicked target and index
		var clicked = e.target.closest("figure");
		var index = clicked.dataset.index;

		//remove from wishlist array
		data.wishes.splice(index, 1)
	} 

	//send new data object to firebase and update page
	saveData();
	displaySaved(data);
};

//remove received item on icon click
function deleteFulfilled(e) {
	e.preventDefault();

	//disregard clicks that don't occur on trash icon
	if(e.target.tagName != "SPAN") {
		return;
	} else if(e.target.classList.contains("glyphicon-trash")) {

		//get clicked target and index
		var clicked = e.target.closest("li");
		var index = clicked.dataset.index;

		//remove from received items array
		data.fulfilled.splice(index, 1)

		//send new data object to firebase and update page
		saveData();
		displayFulfilled(data);
	}
}

//keep track of thank yous sent for items
function markThanked(e) {
	e.preventDefault();

	//disregard clicks that don't occur on envelope icon
	if(e.target.tagName != "SPAN") {
		return;
	} else if(e.target.classList.contains("glyphicon-envelope")) {
		//get clicked target and index
		var clicked = e.target.closest("li");
		var index = clicked.dataset.index;

		//set thanked property to true and add thanked class
		data.fulfilled[index].thanked = true;
		clicked.classList.add("thanked");

		//send updated data object to firebase
		saveData();
	}
};

//firebase functions 
//..................... 
//set firebase data
function saveData() {
	firebaseRef.set(data);
};	


//get snapshot from firebase and update page
function getData(snapshot) {
	//clear container content
	main.innerHTML = "";

	//if snapshot is null, update page and return
	if(snapshot.val() === null) {
		h1.textContent = "No saved items";
		browse.classList.remove("hidden");
		return;
	}
	//set returned firebase snapshot to data object
	data = snapshot.val();

	//update page with snapshot data
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
	hideLoader();
	//compile template with 
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
	
	//check to see if wishlist array is undefined or empty
	if(json.wishes == undefined || json.wishes.length == 0) {
		h1.textContent = "No saved items";
		browse.classList.remove("hidden");
		main.classList.add("hidden");
		json.wishes = [];
	} else {
		//if array is not undefined or empty, compile handlebars template
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

//compile recieved items template 
function displayFulfilled(json) {
	
	//check to see if array is empty
	if(json.fulfilled.length == 1) {
		fulfilledContainer.innerHTML = '';
		return;
	} else {
	//compile handlebars template
	var template = Handlebars.compile(fulfilledTemplate.innerHTML);
	fulfilledContainer.innerHTML = template(json.fulfilled);

	//grab fulfilled container and add event listeners
	var fulfilledItems = document.querySelector(".fulfilled-container");
	fulfilledItems.addEventListener("click", deleteFulfilled);
	fulfilledItems.addEventListener("click", markThanked)
	}
};

function showBrowse(e) {
	e.preventDefault();

	//update page content and show browse category list
	h1.textContent = '';
	main.innerHTML = '';
	fulfilledContainer.innerHTML = '';
	browse.classList.remove('hidden');
};

//toggle loader gif functions
function hideLoader() {
	loader.classList.add("hidden");
};

function showLoader() {
	loader.classList.remove("hidden");
};




	