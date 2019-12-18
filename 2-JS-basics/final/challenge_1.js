/*****************************
 * CODING CHALLENGE 1
 */

/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than John.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than John's? true"). 

GOOD LUCK 😀
*/

var markMass = prompt("Mark's weight: ");
var markHeight = prompt("Mark's height: ");
var johnMass = prompt("John's weight: ");
var johnHeight = prompt("John's height: ");

var markBMI = markMass / Math.pow(markHeight, 2);
var johnBMI = johnMass / Math.pow(johnHeight, 2);

console.log("Mark's weight: " + markMass);
console.log("Mark's height: " + markHeight);
console.log("Mark's BMI: " + markBMI);
console.log("John's weight: " + johnMass);
console.log("John's height: " + johnHeight);
console.log("John's BMI: " + johnBMI);

var markIsFat = markBMI > johnBMI;
console.log('Is Mark\'s BMI higher than John\'s? ' + markIsFat);