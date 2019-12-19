/*****************************
 * CODING CHALLENGE 4
 */

/*
Let's remember the first coding challenge where Mark and John compared their BMIs. Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height
2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Don't forget they might have the same BMI.

Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

GOOD LUCK 😀
*/
/* 
function calcBMI(weight, height) {
    return weight / Math.pow(height, 2);
} */
var john = {
    fullName: "John",
    height: 1.95,
    mass: 92,
    calcBMI: function () {
        this.bmi = bmiCalculator(this.mass, this.height);
    }
    /* 
    calcBMI: function () {
        this.bmi = this.mass / Math.pow(this.height, 2);
        return this.bmi; 
    */
};

var mark = {
    fullName: "Mark",
    height: 1.69,
    mass: 78,
    calcBMI: function () {
        this.bmi = bmiCalculator(this.mass, this.height);
    }
};

function bmiCalculator(mass, height) {
    return mass / Math.pow(height, 2);
}

function bmiComparison(person1, person2) {
    person1.calcBMI();
    person2.calcBMI();

    if (person1.bmi > person2.bmi) {
        console.log(person1.fullName + " has a higher BMI of " + person1.bmi)
    } else if (person1.bmi < person2.bmi) {
        console.log(person2.fullName + " has a higher BMI of " + person2.bmi)
    } else {
        console.log("Both people have the same BMI!")
    }
}

bmiComparison(john, mark);
console.log(john);
console.log(mark);