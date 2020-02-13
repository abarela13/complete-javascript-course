/*
 ES5
 Variables are function scoped
*/
/* 
var name5 = "Jane Smith";
var age5 = 23;
name = "Jane Miller"; //Mutation
 */
// console.log(name5); // Jane Miller

/*
 ES6
 Variables are block scoped
 Code wrapped between curly braces
*/
/* 
const name6 = "John Smith";
let age6 = 28; // Mutatable
 */
// name6 = "John Miller";
// console.log(name6); // Error - Assignment to constant variable

/*
 ES5
 var works within the function
*/
/* 
function driverLicesne5(passedTest) {
    if (passedTest) {
        // console.log(firstName); // undefined, var variables are hoisted and will show undefined
        var firstName = "John";
        var yearOfBirth = 1990;
    }
    console.log(firstName + ", born in " + yearOfBirth + ", is now officially allowed to drive.");
}
driverLicesne5(true);
 */
/*
 ES6
 let and const only work within the curly braces
*/
/* 
function driverLicesne6(passedTest) {
    // console.log(firstName); // firstName is not defined ERROR, TEMPORAL DEAD ZONE
    let firstName;
    const yearOfBirth = 1986;

    if (passedTest) {
        firstName = "Jane";
    }

    console.log(firstName + ", born in " + yearOfBirth + ", is now officially allowed to drive.");
}
driverLicesne6(true);
 */
/*
 ES5
 let and const only work within the curly braces
 */
/*
var i = 23;

for (var i = 0; i < 5; i++) {
    console.log(i); // 0 1 2 3 4
   }
   
   console(i); // 5
*/

/*
 ES6
 let and const only work within the curly braces
 */
/*
 let i = 23;
 
 for (let i = 0; i < 5; i++) {
     console.log(i);  // 0 1 2 3 4
    }
    
    console(i);  // 23
 */

//////////////////////////////
// Lecture: Block vs IIFEs
/* 
// ES6 Block
{
    const a = 1;
    let b = 2;
    var c = 3
}
console.log(a + b); // ERROR, not accessible outside of block
console.log(c); // 3, var c is function scoped not block scoped


// ES5 IIFE
(function () {
    var d = 3;
})
console.log(d); // ERROR, d is not defined
 */

//////////////////////////////
// Lecture: Strings
/* 
let fName = "John";
let lName = "Smith";
const yearOfBirth = 1990;

function calcAge(year) {
    return new Date().getFullYear() - year;
}

// ES5 - Template Literals
console.log("// ES5");
console.log("This is " + fName + " " + lName + ". He was born in " + yearOfBirth + ". Today he is " + calcAge(yearOfBirth) + " years old.");

// ES6
console.log("\n");
console.log("// ES6");
console.log(`This is ${fName} ${lName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);
const n = `${fName} ${lName}`;
console.log(n.startsWith("J"));
console.log(n.startsWith("j"));
console.log(n.endsWith("th"));
console.log(n.includes(" "));
console.log(`${fName} `.repeat(5)); // John John John John John
 */

//////////////////////////////
// Lecture: Arrow Functions
/* 
const years = [1990, 1985, 1962, 1937];

// ES5
var ages5 = years.map(function(el) {
	return new Date().getFullYear() - el;
});
console.log(ages5);

// ES6
const ages6 = years.map(el => new Date().getFullYear() - el); // For callback functions with only one argument
console.log(ages6);

let ages7 = years.map((el, index) => {
	const thisYear = new Date().getFullYear();
	const age = thisYear - el;
	return `Age element ${index + 1}: ${age} years old.`;
});

console.log(ages7);
 */

// Lecture: Arrow Functions - THIS
/* 
// ES5
var box5 = {
	color: "green",
	position: 1,
	clickMe: function () {
		var self = this;

		document.querySelector(".green").addEventListener("click", function () {
			var str = "This is box number " + self.position + " and it is " + self.color;
			console.log(str);
		});
	}
};
box5.clickMe();

// ES6
const box6 = {
	color: "blue",
	position: 1,
	clickMe: function () {
		document.querySelector(".blue").addEventListener("click", () => {
			var str = "This is box number " + this.position + " and it is " + this.color;
			console.log(str);
		});
	}
};
box6.clickMe();

function Person(name) {
	this.name = name;
}

var friends = ["Bob", "Jane", "Mark", "Steph"];

// ES5
Person.prototype.myFriends5 = function (friends) {
	var arr = friends.map(
		function (el) {
			var self = this;
			return this.name + " is friends with " + el;
		}.bind(this) // binds the "this" keyword to whatever value is passed with bind, this case the for Person (this)
	);

	console.log(arr);
};

new Person("John").myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function (friends) {
	let arr = friends.map(el => `${this.name} is friends with ${el}.`);

	console.log(arr);
};

new Person("Steph").myFriends6(friends);
 */
//////////////////////////////
// Lecture: Destructuring
/* 
// ES5
var john = ['John', 26];
var name5 = john[0];
var age5 = john[1];

// ES6
const [name6, age6] = ['John', 26];
console.log(name6);
console.log(age6);

const obj = {
	firstName: 'John',
	lastName: 'Smith'
};

const {
	firstName,
	lastName
} = obj;
console.log(firstName);
console.log(lastName);

const {
	firstName: a,
	lastName: b
} = obj;
console.log(a);
console.log(b);

function calcAgeRetirement(year) {
	const age = new Date().getFullYear() - year;
	return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);
 */
//////////////////////////////
// Lecture: Arrays
/* 
const boxes = document.querySelectorAll(".box");
// ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function (cur) {
	cur.style.backgroundColor = "dodgerblue";
});

// ES6
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => (cur.style.backgroundColor = "dodgerblue"));

// ES5
for (var i = 0; i < boxesArr5.length; i++) {
	if (boxesArr5[i].className === "box blue") {
		continue;
	}

	boxesArr5[i].textContent = "I changed to blue!";
}

// ES6
for (const cur of boxesArr6) {
	if (cur.className.includes("blue")) {
		continue;
	}
	cur.textContent = "I changed to blue!";
}

// ES5
var ages = [12, 17, 8, 21, 14, 11];

var legalAge = ages.map(function(cur) {
	return cur >= 18;
});

console.log(legalAge);
console.log(legalAge.indexOf(true));
console.log(ages[legalAge.indexOf(true)]);

// ES6
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));
 */

//////////////////////////////
// Lecture: Arrays - Spread Operator
/* 
function addFourAges(a, b, c, d) {
	return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(`sum1 - ${sum1}`);

// ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(`sum2 - ${sum2}`);

// ES6
const sum3 = addFourAges(...ages); // expands ages array into its components
console.log(`sum3 - ${sum3}`);

const familySmith = ["John", "Jane", "Mark"];
const familyMiller = ["Mary", "Bob", "Ann"];
const marriageSmithMiller = [...familyMiller, ...familySmith];
console.log(familySmith);
console.log(familyMiller);
console.log(marriageSmithMiller);
*/

const h = document.querySelector("h1");
const boxes = document.querySelectorAll(".box");
const allElements = [h, ...boxes];

Array.from(allElements).forEach(cur => (cur.style.color = "white"));

//////////////////////////////
// Lecture: Rest Parameters
/* 
// ES5
function isFullAge5() {
	// console.log(arguments);
	var argsArr = Array.prototype.slice.call(arguments);
	argsArr.forEach(function (cur) {
		console.log(new Date().getFullYear() - cur >= 18);
	});
}

// isFullAge5(1990, 1999, 1965); // Arguments(3) [1990, 1999, 1965]
// isFullAge5(1990, 1999, 1965, 2016, 1987);

// ES6
function isFullAge6(...yearsOfBirth) {
	yearsOfBirth.forEach(element => {
		console.log(new Date().getFullYear() - element >= 18);
	});
}

isFullAge6(1990, 1999, 1965, 2016, 1987);
 */
/* 
// ES5
function isFullAge5(limit) {
	var argsArr = Array.prototype.slice.call(arguments, 1);

	argsArr.forEach(function(cur) {
		console.log(new Date().getFullYear() - cur >= limit);
	});
}

// isFullAge5(28, 1990, 1999, 1965);

// ES6
function isFullAge6(limit, ...yearsOfBirth) {
	yearsOfBirth.forEach(element => {
		console.log(new Date().getFullYear() - element >= limit);
	});
}

isFullAge6(21, 1990, 1999, 1965, 2016, 1987);

//////////////////////////////
// Lecture: Default Parameters

// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
	lastName === undefined ? (lastName = "Smith") : lastName;
	yearOfBirth === undefined ? (yearOfBirth = 1990) : yearOfBirth;
	nationality === undefined ? (nationality = "American") : nationality;

	this.firstName = firstName;
	this.lastName = lastName;
	this.yearOfBirth = yearOfBirth;
	this.nationality = nationality;
}

var john = new SmithPerson("John", 1990);
console.log(john);

var emily = new SmithPerson("Emily", 1983, "Diaz", "Spanish");
console.log(emily);

// ES6
function SmithPerson(firstName, yearOfBirth = 1900, lastName = "Smith", nationality = "American") {
	this.firstName = firstName;
	this.lastName = lastName;
	this.yearOfBirth = yearOfBirth;
	this.nationality = nationality;
}

var jake = new SmithPerson("Jake", 1991);
console.log(jake);

var steph = new SmithPerson("Steph", 1992);
console.log(steph);
 */

//////////////////////////////
// Lecture: Maps
/* 
const question = new Map();
question.set("question", "What is the official name of the latest major JavaScript Version?");
question.set(1, "ES5");
question.set(2, "ES6");
question.set(3, "ES7");
question.set(4, "ES2015");
question.set(5, "ES2017");
question.set("correct", 3);
question.set(true, "Correct");
question.set(false, "Incorrect, Try Again");

console.log(`Map Data Structure "question" size - ${question.size}`);
console.log(question.get("question"));

console.log(`Deleting key element "4" - ${question.get(4)}`);
question.delete(4);
console.log(`Map Data Structure "question" size - ${question.size}`);

if (question.has(5)) {
	console.log(`Key element "5" present`);
	console.log(`Deleting key element "5" - ${question.get(5)}`);
	question.delete(5);
	console.log(`Map Data Structure "question" size - ${question.size}`);
}

// question.clear();
// console.log(`Map Data Structure "question" cleared.`);
// console.log(`Map Data Structure "question" size - ${question.size}`);

console.log("\n");

// question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));

for (let [key, value] of question.entries()) {
	if (typeof key === "number") {
		console.log(`Key ${key}: ${value}`);
	}
}

const answerPrompt = parseInt(prompt("Write the correct answer"));
console.log(question.get(answerPrompt === question.get("correct")));
 */
//////////////////////////////
// Lecture: Classes

// ES5
var Person5 = function (name, yearOfBirth, job) {
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
}

Person5.prototype.calcAge = function () {
	var age = new Date().getFullYear() - this.yearOfBirth;
	console.log(age);
}

var john5 = new Person5("John", 1990, "teacher");

// ES6
class Person6 {
	constructor(name, yearOfBirth, job) {
		this.name = name;
		this.yearOfBirth = yearOfBirth;
		this.job = job;
	}

	calcAge() {
		var age = new Date().getFullYear() - this.yearOfBirth;
		console.log(age);
	}

	static greeting() {
		console.log("Hey there");
	}
}

const jake6 = new Person6("Jake", 1987, "teacher");
Person6.greeting();