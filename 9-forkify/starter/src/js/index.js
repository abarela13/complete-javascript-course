// Global app controller
import Search from "./models/Search";
import Recipe from "./models/Recipe";

import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";

import { elements, renderLoader, clearLoader } from "./views/base";

/** Global state of the app
 * - Search oject
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/*
 * SEARCH CONTROLLER
 */
const ctrlSearch = async () => {
	// 1) Get query from view
	const query = searchView.getInput();

	if (query) {
		// 2) New search object and add to state
		state.search = new Search(query);

		// 3) Prepare UI for results
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchResults);

		try {
			// 4) Search for recipes
			await state.search.getResults();

			// 5) Render results on UI
			clearLoader(); // remove the loader
			searchView.renderResults(state.search.result);
		} catch (error) {
			clearLoader();
			alert("Something when wrong!");
		}
	}
};

elements.searchForm.addEventListener("submit", e => {
	e.preventDefault();
	ctrlSearch();
});

elements.searchResultPage.addEventListener("click", e => {
	const btn = e.target.closest(".btn-inline");

	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});

/*
 * RECIPE CONTROLLER
 */
const ctrlRecipe = async () => {
	// Get ID from URL
	const id = window.location.hash.replace("#", "");
	// console.log(`Selected ID: ${id}`);

	if (id) {
		// Prepare the UI for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		// Highlight selected search item
		if (state.search) {
			searchView.highlightSelected(id);
		}

		// Create new recipe object
		state.recipe = new Recipe(id);

		try {
			// Get recipe data and parse ingredients
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();

			// Calculate servings and time
			state.recipe.calcTime();
			state.recipe.calcServings();

			// Render Recipe
			clearLoader();
			recipeView.renderRecipe(state.recipe);
		} catch (error) {
			console.log(error);
			// alert("Error processing recipe!");
		}
	}
};

["hashchange", "load"].forEach(event => window.addEventListener(event, ctrlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener("click", e => {
	// IF either the button or any child elements are clicked on
	if (e.target.matches(".btn-decrease, .btn-decrease *")) {
		// Decrease button is clicked
		if (state.recipe.servings > 1) {
			state.recipe.updateServings("dec");
			recipeView.updateServingsIngredients(state.recipe);
		}
	} else if (e.target.matches(".btn-increase, .btn-increase *")) {
		// Increase button is clicked
		state.recipe.updateServings("inc");
		recipeView.updateServingsIngredients(state.recipe);
	}
	// console.log(state.recipe);
});
