/*****************************
 * Variables and data types
 */
/* 
var firstName, lastName, age, fullName, job, isMarried;
firstName = 'John';
lastName = 'Smith';
age = 28;

fullName = firstName + " " + lastName;

console.log(firstName);
console.log(fullName);
console.log(job);

job = 'Teacher';

console.log(job);
*/

/*****************************
 * Variable mutation and type coercion
 */

/* 
// Type coercion
console.log(firstName + " " + age);

job = 'teacher';
isMarried = false;

console.log(firstName + " is a " + age + " years old " + job + ". You heard that he was married? Well that's " + isMarried + ".");

// Variable mutation
age = 'twenty eight';
job = 'driver';

// Alert window
alert(firstName + " is a " + age + " years old " + job + ". You heard that he was married? Well that's " + isMarried + ".");

lastName = prompt('What is his last Name?');
console.log(firstName + ' ' + lastName);
*/

/*****************************
 * Basic operators
 */
/* 
var now, yearJohn, yearMark;
now = 2018;
ageJohn = 28;
ageMark = 33;

// Math operators
yearJohn = now - ageJohn;
yeahMark = now - ageMark;

console.log(yearJohn);
console.log(now + 2);
console.log(now * 2);
console.log(now / 10);

// Logical operators
var johnOlder = ageJohn < ageMark;
console.log(johnOlder);

// typeof operator (returns what type of variable is selected)
console.log(typeof johnOlder);
console.log(typeof ageJohn);
console.log(typeof 'Is Mark older than John?');
var x;
console.log(typeof x);
 */

/*****************************
 * Operator precedence
 * https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
 */
/* 
var now = 2018;
var yearJohn = 1989;
var fullAge = 18;

// Multiple operators
var isFullAge = now - yearJohn >= fullAge; // true
console.log(isFullAge);

// Grouping
var ageJohn = now - yearJohn;
var ageMark = 35;
var average = (ageJohn + ageMark) / 2;
console.log(average);

// Multiple assignments
var x, y;
x = y = (3 + 5) * 4 - 6; // 8 * 4 - 6 // 32 - 6 // 26
console.log(x, y);


// More operators
x *= 2;
console.log(x);
x += 10;
console.log(x);
x--;
console.log(x);
 */

/*****************************
 * If / else statements
 */
/* 
var firstName = 'John';
var civilStatus = 'single';

if (civilStatus.toLowerCase() === 'married') {
    console.log(firstName + ' is married!');
} else {
    console.log(firstName + ' will hopefully marry soon :)');
}

var isMarried = true;
if (isMarried) {
    console.log(firstName + ' is married!');
} else {
    console.log(firstName + ' will hopefully marry soon :)');
}

var massMark = 78; // kg
var heightMark = 1.69; // meters

var massJohn = 92;
var heightJohn = 1.95;

var BMIMark = massMark / Math.pow(heightMark, 2);
var BMIJohn = massJohn / Math.pow(heightJohn, 2);

if (BMIMark > BMIJohn) {
    console.log('Mark\'s BMI is higher than John\'s.');
} else {
    console.log('John\'s BMI is higher than Marks\'s.');
}
 */

/*****************************
 * Boolean logic
 */
/* 
var firstName = 'John';
var age = 20;

if (age < 13) {
    console.log(firstName + ' is a boy.');
} else if (age >= 13 && age < 20) {
    console.log(firstName + ' is a teenager.');
} else if (age >= 20 && age < 30) {
    console.log(firstName + ' is a young man.');
} else {
    console.log(firstName + ' is a man.');
}
*/

/*****************************
 * The Ternary Operator and Switch Statements
 */
/* 
var firstName = 'John';
var age = 14;

// Ternary operator
age >= 18 ? console.log(firstName + ' drinks beer.') : console.log(firstName + ' drinks juice.');

var drink = age >= 18 ? 'beer' : 'juice';
console.log(drink);

// Switch statement
var career = 'instructor';
switch (career.toLowerCase()) {
    case 'teacher':
    case 'instructor':
        console.log(firstName + ' teaches kids how to code.');
        break;
    case 'driver':
        console.log(firstName + ' drives an uber in Lisbon.');
        break;
    case 'designer':
        console.log(firstName + ' designs beautiful websites.');
        break;
    default:
        console.log(firstName + ' does something else.');
}

age = 56;

switch (true) {
    case age < 13:
        console.log(firstName + ' is a boy.');
        break;
    case age >= 13 && age < 20:
        console.log(firstName + ' is a teenager.');
        break;
    case age >= 20 && age < 30:
        console.log(firstName + ' is a young man.');
        break;
    default:
        console.log(firstName + ' is a man.');
}
*/

/*****************************
 * Truthy and Falsy values and equality operators
 */

// falsy values: undefined, null, 0, '', NaN
// truthy values: NOT falsy values
/* 
var height;

height = 23;

if (height || height === 0) {
    console.log('Variable is defined');
} else {
    console.log('Variable has NOT been defined');
}

// Equality operators
// === is strict to data types
if (height === '23') {
    console.log('The == operator does type coercion!');
} else {
    console.log('Integer is not equal to string!');
}
*/

/*****************************
 * Functions
 */
/*
function calculateAge(birthYear) {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();

    return currentYear - birthYear;
}

function yearsUntilRetirement(year, firstName) {
    var age = calculateAge(year);
    var retirement = 65 - age;

    retirement > 0 ? console.log(firstName + ' retires in ' + retirement + ' years.') : console.log(firstName + ' is already retired.');
}

var ageJohn = calculateAge(1990);
var ageMike = calculateAge(1948);
var ageJane = calculateAge(1969);
console.log(ageJohn, ageMike, ageJane);

yearsUntilRetirement(1990, 'John');
yearsUntilRetirement(1948, 'Mike');
yearsUntilRetirement(1969, 'Jane');
 */

/*****************************
 * Function Statements and Expressions
 */
/* 
// Function declaration
// function whatDoYouDo(job, firstName) {}

// Function expression
var whatDoYouDo = function (job, firstName) {
    switch (job) {
        case 'teacher':
            return firstName + ' teaches kids how to code';
        case 'driver':
            return firstName + ' drives a cab in Lisbon.'
        case 'designer':
            return firstName + ' designs beautiful websites';
        default:
            return firstName + ' does something else';
    }
}

console.log(whatDoYouDo('teacher', 'John'));
console.log(whatDoYouDo('designer', 'Jane'));
console.log(whatDoYouDo('retired', 'Mark'));
 */

/*****************************
 * Arrays
 */
/* 
// Initialize new array
var names = ['John', 'Mark', 'Jane'];
var years = new Array(1990, 1969, 1948);

console.log(names[2]);
console.log(names.length);

// Mutate array data
names[1] = 'Ben';
names[names.length] = 'Mary';
console.log(names);

// Different data types
var john = ['John', 'Smith', 1990, 'designer', false];

// Insert into the end of the array
john.push('blue');
console.log(john);

// Insert into the beginning of the array
john.unshift('Mr.');
console.log(john);

// Remove final element from array
john.pop();
console.log(john);
john.pop();
console.log(john);

// Remove first element of the array
john.shift();
console.log(john);

// Locate position in the array where this item is located (-1 is not in the array)
console.log(john.indexOf(23));
console.log(john.indexOf(1990));

var isDesigner = john.indexOf('designer') === -1 ? 'John is NOT a designer' : 'John IS a designer';
console.log(isDesigner);
 */

/*****************************
 * Objects and properties
 */
/* 
// Object literal
var person = {
    firstName: 'John',
    lastName: 'Smith',
    birthYear: 1990,
    family: ['Jane', 'Mark', 'Bob', 'Emily'],
    job: 'teacher',
    isMarried: false
};

console.log(person.firstName);
console.log(person['lastName']);
var x = 'birthYear';
console.log(person[x]);

person.job = 'designer';
person['isMarried'] = true;
console.log(person);

// new Object syntax
var jane = new Object();
jane.firstName = 'Jane';
jane.birthYear = 1969;
jane['lastName'] = 'Smith';
console.log(jane);
 */

/*****************************
 * Objects and methods
 */
/* 
var currentDate = new Date();
console.log(Date());

var john = {
    firstName: "John",
    lastName: "Smith",
    birthYear: 1992,
    family: ["Jane", "Mark", "Bob", "Emily"],
    job: "teacher",
    isMarried: false,
    calcAge: function () {
        this.age = currentDate.getFullYear() - this.birthYear;
    }
};

john.calcAge();
console.log(john);
 */

/*****************************
 * Loops and iteration
 */
/* 
// for loop
for (var i = 1; i <= 20; i += 2) {
    console.log(i);
}

var john = ['John', 'Smith', 1990, 'designer', false, 'blue'];
for (var i = 0; i < john.length; i++) {
    console.log(john[i]);
}

console.log("------------------BREAK------------------");

// updated for loop
var jake = ['Jake', 2001, 'barista', 'green'];
jake.forEach(function (i) {
    console.log(i);
});

console.log("------------------BREAK------------------");

// While loop
var i = 0;
while (i < john.length) {
    console.log(john[i]);
    i++;
}

console.log("------------------BREAK------------------");
 */
// continue and break statements
var customer = ['John', 'Smith', 1990, 'designer', false, 'blue'];

// "continues" (skips) to the next iteration
for (var i = 0; i < customer.length; i++) {
    if (typeof customer[i] !== 'string') continue;
    console.log(customer[i]);
}
console.log("\n");
// "breaks" out of the loop
for (var i = 0; i < customer.length; i++) {
    if (typeof customer[i] !== 'string') break;
    console.log(customer[i]);
}

console.log("\n");

// Looping backwards
for (var i = customer.length - 1; i >= 0; i--) {
    console.log(customer[i]);
}