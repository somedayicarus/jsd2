var Fighter = function(name) {
	this.name = name;
	this.punch = function() {
		alert(this.name + " punches");
	}
}