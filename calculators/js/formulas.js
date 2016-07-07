
// Instructions for your homework
// //////////////////////////////////////////////////////////////////
// 1.   Here is where your functions should be defined
// 2.	 What should you name your functions?  Hint:  check the console to see which functions are already being called.  Are they all "defined?"  If not yet defined... then define them here!
// 3.	 Be sure to link up this file in your HTML doc
/////////////////////////////////////////////////////////////////////

//Calculate Celcius to fahrenheit: celcius * (9/5) + 32
function calcCelciusToFarenheit(celcius) {
	var fahrenheit = celcius * (9/5) + 32;
	return fahrenheit;
}	

//Calculate Fahrenheit to celcius: (fahrenheit - 32) * 5/9
function calcFahrenheitToCelcius(fahrenheit) {
	var celcius = (fahrenheit - 32) * 5/9;
	return celcius;
}

//Calculate Radius to circumference: 2 * Math.PI * radius
function calcCircumference(radius) {
	var circumference = 2 * Math.PI * radius;
	return circumference;
}

//Calculate Pythagorean theorem: Math.sqrt((a * a) + (b * b))
function calcLongestSide(sideA, sideB) {
	var longestSide = Math.sqrt((sideA * sideA) + (sideB * sideB));
	return longestSide;
}