import axios from "axios";
import {
	key,
	proxy
} from "../config";

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			// const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&rID=${this.id}`);
			const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.img = res.data.recipe.image_url;
			this.url = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
			// console.log(res);
		} catch (error) {
			alert("Something went wrong :(");
		}
	}

	calcTime() {
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15;
	}

	calcServings() {
		this.servings = 4;
	}

	parseIngredients() {
		const unitsLong = ["tablespoons", "tablespoon", "ounces", "ounce", "teaspoons", "teaspoon", "cups", "pounds"];
		const unitsShort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "lb"];
		const units = [...unitsShort, "kg", "g"];

		const newIngredients = this.ingredients.map(el => {
			// Standardized units
			let ingredient = el.toLowerCase();
			unitsLong.forEach((unit, i) => {
				ingredient = ingredient.replace(unit, unitsShort[i]);
			});

			// Remove white space in front of ingredients
			ingredient = ingredient.trim();

			// Remove Parenthesis and values between
			ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

			// Parse ingredients into count, unit and ingredient
			const arrIng = ingredient.split(" ");

			// Returns index positon of element if matching element in unitsShort array
			const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

			let objIng;

			if (unitIndex > -1) {
				// There is a unit
				const arrCount = arrIng.slice(0, unitIndex);
				let count;

				// Format counts to decimals
				if (arrCount.length === 1) {
					// count = eval(arrIng[0].replace(" - ", " to "));
					count = eval(arrIng[0].replace("-", "+"));
				} else {
					count = eval(arrIng.slice(0, unitIndex).join("+"));
				}

				// if (arrCount.length === 1) {
				//     count = arrIng[0].replace("-", "+");
				// } else {
				//     count = arrIng.slice(0, unitIndex).join("+");
				// }

				objIng = {
					count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex + 1).join(" ")
				};
				// console.log(`There is a valid unit ${objIng.unit}`);
			} else if (parseInt(arrIng[0], 10)) {
				// There is NO unit, but first element is a number
				objIng = {
					count: parseInt(arrIng[0], 10),
					unit: "",
					ingredient: arrIng.slice(1).join(" ")
				};
				// console.log(`There is NO unit but first value is number ${arrIng[0]}`);
			} else if (unitIndex === -1) {
				// There is NO unit and NO number in first position
				objIng = {
					count: 1,
					unit: "",
					ingredient
				};
				// console.log(`There is NO unit and NO number in first position ${objIng.ingredient}`);
			}

			return objIng;
		});
		this.ingredients = newIngredients;
	}

	updateServings(type) {
		// Servings
		const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;

		// Ingredients
		this.ingredients.forEach(ingredient => {
			ingredient.count *= newServings / this.servings;
		});

		this.servings = newServings;
	}
}