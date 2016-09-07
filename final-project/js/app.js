//setup 
//.....................

//shopstyle API endpoint
var method = "products" ;
var pid = "uid3904-35452852-63";
var url = "http://api.shopstyle.com/api/v2/"+ method + "?pid=" + pid + "&limit=50";


//grab handlebars template
var resultsTemplate = document.querySelector("#results-template");

//establish connection with firebase
var firebaseRef = new Firebase("https://tinsel-4db11.firebaseio.com/");

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



//event listeners 
//.....................

//on load, dispaly saved items
	// window.addEventListener("load", init)	

//on list click, show list contents
container.addEventListener("click", addWish);

//on search submit, show results
form.addEventListener("submit", runSearch);

	//on filter, update results


//event handlers 
//.....................

//init  
// function init(e) {
// 	getData();
// }

function runSearch(e) {
	var searchText = "&fts=" + input.value.split(' ').join('+');
	$.getJSON(url + searchText, displayResults);

	input.value = "";
}

function addWish(e) {
	e.preventDefault();

	console.log("addWish")
	console.log(e);
	console.log(e.target.closest("figure"))

	var product = e.target.closest("figure");
	var index = product.dataset.index;

	//create JSON for new saved item
	var wish = {
		id: product.dataset.id,
		name: "Christmas 2016",
		price: 123,
		image: "image_url",
		url: "retailer_url",
		fulfilled: false
	}

	// //add wish item to wishes array
	// data.wishes.push(wish);

	// //save updated list data to firebase
	// saveData(data);
}





//firebase functions 
//..................... 
function saveData() {
	firebaseRef.set(data);
};	

function dataChanged(snapshot) {
	if(snapshot.val() === null) {
		return;
	}
	container.innerHTML = "";
	data = snapshot.val();
	displayThumbnails(data);
};

function getData() {
	firebaseRef.on("value", dataChanged);
};

//update page 
//..................... 


//compile handlebars template with array
function displayResults(json) {
	results = json.products;
	var template = Handlebars.compile(resultsTemplate.innerHTML);
	container.innerHTML = template(json);
}


//handlebars helper
Handlebars.registerHelper('grouped_each', function(every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});

displayResults(mockdata);




