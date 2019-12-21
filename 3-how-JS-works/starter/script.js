///////////////////////////////////////
// Lecture: Hoisting

function calculateAge(birthYear) {
	var currentDate = new Date();

	console.log(currentDate.getFullYear() - birthYear);
}

calculateAge(1990);

var retirement = function(birthYear) {
	var currentDate = new Date();

	console.log(65 - (currentDate.getFullYear() - birthYear) + " years left until retirement.");
};

retirement(1990);

///////////////////////////////////////
// Lecture: Scoping

// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/

// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/

///////////////////////////////////////
// Lecture: The this keyword

console.log(this);

calculateAge(1985);
