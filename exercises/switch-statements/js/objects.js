
var bus = {
	"route": "38R"
};

var person = {
	"firstName": "Will",
	"lastName": "Mclellarn",
	"languages": [
		"English",
		"Spanish"
	]
};

var car = {
	"color": "green",
	"make": "Ford",
	"model": "Escape",
	"ac": true,
	"locked": true, 
	"unlock": function() {
		this.locked = false;
	}
};