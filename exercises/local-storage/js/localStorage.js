var button = document.querySelector("button");
var make = document.querySelector(".make");
var model = document.querySelector(".model");
var color = document.querySelector(".color");

var p = document.querySelector("p");

button.addEventListener("click", saveCar);
window.addEventListener("load", updateCar);

function saveCar(e) {

	var car = {
		make: make.value,
		model: model.value,
		color: color.value,
	}

	//save to local storage
	localStorage.setItem("car", JSON.stringify(car));

	updateCar();
};

function updateCar() {
	var car = localStorage.getItem("car");

	//get car from local storage
	if(car == null) {
		return;
	} 
	console.log(car);
	car = JSON.parse(car);
	p.textContent = car.color + " " + car.make + " " +  car.model;
};