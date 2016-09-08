//setup 
//.....................


//shopstyle API endpoint
var method = "products";
var pid = "uid3904-35452852-63";
var url = "http://api.shopstyle.com/api/v2/"+ method + "?pid=" + pid + "&limit=50";


//grab handlebars template
var resultsTemplate = document.querySelector("#results-template");
var savedTemplate = document.querySelector("#saved-template");

// Initialize Firebase
var config = {
apiKey: "AIzaSyC0OdzgE2grH1ZTXHB4Z9dWdAsUL8M9rbc",
authDomain: "tinsel-4db11.firebaseapp.com",
databaseURL: "https://tinsel-4db11.firebaseio.com",
storageBucket: "tinsel-4db11.appspot.com",
};

firebase.initializeApp(config);


//saved lists object
var results;

var data = {
	"wishes": []
};



//structure
//.....................
var container = document.querySelector("#list-container");
var form = document.querySelector("form");
var input = document.querySelector("#search");
var h1 = document.querySelector(".filters h1");
var filters = document.querySelector(".filters ul");



//event listeners 
//.....................

//on load, dispaly saved items
window.addEventListener("load", init)	

//on list click, show list contents
container.addEventListener("click", addWish);

//on search submit, show results
form.addEventListener("submit", runSearch);

	//on filter, update results


//event handlers 
//.....................


function init(e) {
	firebase.database().ref().once('value').then(getData);
}

//run ajax request with input field value as search parameters
function runSearch(e) {
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

	console.log("addWish")
	console.log(e);
	console.log(e.target.closest("figure"))

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

	console.log(wish);
	//add wish item to wishes array
	data.wishes.push(wish);

	console.log(data);
	//save updated list data to firebase
	saveData(data);

}





//firebase functions 
//..................... 
function saveData() {
	firebase.database().ref().set(data);
};	

function getData(snapshot) {

	if(snapshot.val() === null) {
		return;
	}
	// container.innerHTML = "";
	data = snapshot.val();
	console.log(data)
	displaySaved(data);

};



//update page 
//..................... 


//compile handlebars template with array
function displayResults(json) {
	results = json.products;
	var template = Handlebars.compile(resultsTemplate.innerHTML);
	container.innerHTML = template(results);
}

//compile
function displaySaved(json) {
	h1.textContent = "Saved Wishes";
	var template = Handlebars.compile(savedTemplate.innerHTML);
	container.innerHTML = template(json.wishes);
	console.log(json);
}








