
var p = document.querySelector("p");
var ul = document.querySelector(".concepts");

// api request w/ jquery
var consumerFinanceAPI = "https://api.consumerfinance.gov/data/hmda.json";

var jqxhr = $.getJSON(consumerFinanceAPI, handleData);

function handleData(json) {
	console.log(json);
	var description = json["description"];	
	p.innerHTML = description;

	json["_embedded"]["concepts"].forEach(createConcepts);

	function createConcepts(item) {
		var li = document.createElement("li");
		li.innerHTML = item["description"];
		ul.appendChild(li);
	}
};