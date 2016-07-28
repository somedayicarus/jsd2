
// Technique #1 for looping over an array
// .forEach(callback function);

var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

days.forEach(printDay);

function printDay(day) {
	console.log(day);
}

console.log("-------------")

// Technique #2 for looping over an array 
// using the for loop

for (var i = 0; i < days.length; i++) {
	console.log(days[i]);
}