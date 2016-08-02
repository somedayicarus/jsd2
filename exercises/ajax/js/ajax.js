
var p = document.querySelector("p");

// api request w/ jquery
var consumerFinanceAPI = "https://api.consumerfinance.gov/data/hmda.json";

var jqxhr = $.getJSON(consumerFinanceAPI, handleData);

function handleData(json) {
	console.log(json);
	var description = json["description"];
	p.innerHTML = description;
};