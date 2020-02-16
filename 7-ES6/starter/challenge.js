/////////////////////////////////
// CODING CHALLENGE
/* 
Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
 */

class TownElement {
	constructor(name, buildYear) {
		this.name = name;
		this.buildYear = buildYear;
	}
}

class Park extends TownElement {
	constructor(name, buildYear, acres, treeCount) {
		super(name, buildYear);
		this.acres = acres;
		this.treeCount = treeCount;
	}

	calcDensity() {
		const density = (this.treeCount / this.acres).toFixed(2);
		console.log(`${this.name} has a tree density of ${density} trees per acre.`);
	}
}

class Street extends TownElement {
	constructor(name, buildYear, length, size = 3) {
		super(name, buildYear);
		this.length = length;
		this.size = size;
	}

	streetType() {
		const streetSize = new Map();
		streetSize.set(1, "Tiny");
		streetSize.set(2, "Small");
		streetSize.set(3, "Normal");
		streetSize.set(4, "Big");
		streetSize.set(5, "Huge");

		console.log(`${this.name} | Build Year: ${this.buildYear} | Size : ${streetSize.get(this.size)} | Length : ${this.length} miles`);
	}
}

const parksArr = [
	new Park("Green Park", 1987, 0.2, 215), // Array formatting
	new Park("National Park", 1894, 2.1, 3541),
	new Park("Central Park", 1924, 3.4, 4516),
	new Park("Oak Park", 1953, 0.4, 1249)
];

const streetsArr = [
	new Street("Ocean Avenue", 1999, 1.1, 4), // Array formatting
	new Street("Evergreen Street", 2008, 2.7, 2),
	new Street("4th Street", 2015, 0.8),
	new Street("Sunset Boulevard", 1982, 2.5, 5)
];

function elementCalculations(arr) {
	const sum = arr.reduce((prev, cur, index) => prev + cur, 0);

	return [sum.toFixed(2), (sum / arr.length).toFixed(2)];
}

function cityReport(parkArr, streetArr) {
	console.log("-----CITY REPORT-----");

	//Totals
	console.log(`Our city has a total of ${parkArr.length} parks and ${streetArr.length} streets.`);

	reportParks(parksArr);
	reportStreets(streetsArr);
}

function reportParks(parkArr) {
	console.log("\n");
	console.log("-----PARKS REPORT-----");

	// Average age
	console.log("\n");
	console.log("- Average - ");
	const ages = parkArr.map(el => new Date().getFullYear() - el.buildYear);
	const [totalAge, avgAge] = elementCalculations(ages);
	console.log(`Our ${parkArr.length} parks have an average age of ${avgAge} years.`);

	// Density
	console.log("\n");
	console.log("- Density - ");
	parkArr.forEach(el => el.calcDensity());

	// Parks with over 1000 trees
	console.log("\n");
	console.log("- 1000+ Trees - ");
	for (var i = 0; i < parkArr.length; i++) {
		if (parkArr[i].treeCount > 1000) {
			console.log(`${parkArr[i].name} has ${parkArr[i].treeCount} trees.`);
		}
	}

	// Park with most trees
	console.log("\n");
	console.log("- Most trees - ");

	const largestPark = parkArr.reduce((prev, current) => (prev.treeCount > current.treeCount ? prev : current));
	console.log(`${largestPark.name} has ${largestPark.treeCount} trees.`);
	// const g = parkArr.map(el => el.treeCount).findIndex(el => el >= 1000);
	// console.log(`${parkArr[g].name} has over 1000 trees.`);
}

function reportStreets(streetArr) {
	console.log("\n");
	console.log("-----STREETS REPORT-----");

	//Total and average length of the town's streets
	console.log("\n");
	console.log("- Average - ");
	const [totalLength, avgLength] = elementCalculations(streetArr.map(el => el.length));
	console.log(`Our ${streetArr.length} streets have a total length of ${totalLength} miles, with an average of ${avgLength} miles.`);

	// CLassify sizes
	console.log("\n");
	console.log("- Sizes - ");
	streetArr.forEach(el => el.streetType());
}

cityReport(parksArr, streetsArr);
