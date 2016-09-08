//setup 
//.....................


//shopstyle API endpoint
var pid = "uid3904-35452852-63";
var url = "http://api.shopstyle.com/api/v2/products?pid=" + pid + "&limit=50";
var brandURL = "http://api.shopstyle.com/api/v2/brands?pid=" + pid;
var colorURL =  "http://api.shopstyle.com/api/v2/colors?pid=" + pid;

//handlebar templates
var resultsTemplate = document.querySelector("#results-template");
var savedTemplate = document.querySelector("#saved-template");
var brandTemplate = document.querySelector("#brand-template");


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
	"fulfilled": [false]
};

var brands = [];
var colors = [];




//structure
//.....................
var main = document.querySelector("#main-container");
var form = document.querySelector("form");
var input = document.querySelector("#search");
var h1 = document.querySelector(".filters h1");
var filters = document.querySelector(".filters ul");
var logo = document.querySelector(".logo");
var brandList = document.querySelector("#brands");
var browse = document.querySelector(".browse");
var heart = document.querySelector(".heart");

//event listeners 
//.....................

//on load, dispaly saved items
window.addEventListener("load", init)	

//when checklist icon clicked, mark fulfilled and 

//on search submit, show results
form.addEventListener("submit", runSearch);

//on filter, update results

//on logo click, load saved lists
logo.addEventListener("click", init);

//on heart click, show saved items
heart.addEventListener("click", init)


//event handlers 
//.....................
$.getJSON(brandURL, saveBrands);
$.getJSON(colorURL, saveColors);

function init(e) {
	firebaseRef.once('value').then(getData);
}

//run ajax request with input field value as search parameters
function runSearch(e) {
	e.preventDefault();
	browse.classList.add("hidden");
	h1.textContent = "Search results for: '" + input.value + "'";
	//format search term 
	var searchText = "&fts=" + input.value.split(' ').join('+');
	$.getJSON(url + searchText, displayResults);
	filters.classList.remove("hidden");
	input.value = "";
}

function addWish(e) {
	e.preventDefault();

	if(e.target.tagName != "SPAN") {
		return;
	};

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
		var fulfilled = {
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
			url: product.url,
			fulfilled: true
		}
		data.fulfilled.push(fulfilled);
		data.wishes.splice(index, 1)
	}
	
	saveData();
	displaySaved(data);
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


//firebase functions 
//..................... 
function saveData() {
	firebaseRef.set(data);
	console.log(data);
};	


function getData(snapshot) {

	if(snapshot.val() === null) {
		h1.textContent = "No saved wishes";
		browse.classList.remove("hidden");
		return;
	}
	// container.innerHTML = "";
	data = snapshot.val();
	console.log(data)
	displaySaved(data);

};

function watchData() {
	firebase.database().ref().on("value", updateView);
} 



//save api data 
//..................... 
function saveBrands(json) {
	json.brands.forEach(function(item) {
		brands.push(item);
	});
};

function saveColors(json) {
	json.colors.forEach(function(item) {
		colors.push(item);
	});
};

//update page 
//..................... 


//compile handlebars template with array
function displayResults(json) {
	results = json.products;
	var template = Handlebars.compile(resultsTemplate.innerHTML);
	main.innerHTML = template(results);

	var searchResults = document.querySelector(".results-container");
	//on list click, show list contents
	searchResults.addEventListener("click", addWish);
}

//compile
function displaySaved(json) {
	
	h1.textContent = "Saved Wishes";
	var template = Handlebars.compile(savedTemplate.innerHTML);
	main.innerHTML = template(json.wishes);
	console.log(json);

	var savedItems = document.querySelector(".saved-container");

	savedItems.addEventListener("click", markFulfilled);
	savedItems.addEventListener("click", deleteSavedItem);
}


function displayBrands(json) {
	var template = Handlebars.compile(brandTemplate.innerHTML);
	brandList.innerHTML = template(json);
	// debugger
}





