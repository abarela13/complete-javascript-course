// Global app controller
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";

import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";

import {
	elements,
	renderLoader,
	clearLoader
} from "./views/base";

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
	// Get query from view
	const query = searchView.getInput();

	if (query) {
		// New search object and add to state
		state.search = new Search(query);

		// Prepare UI for results
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchResults);

		try {
			// Search for recipes
			await state.search.getResults();

			// Render results on UI
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
			recipeView.renderRecipe(
				state.recipe,
				state.likes.isLiked(id)
			);
		} catch (error) {
			console.log(error);
			// alert("Error processing recipe!");
		}
	}
};

["hashchange", "load"].forEach(event => window.addEventListener(event, ctrlRecipe));

/*
 * LIST CONTROLLER
 */

const ctrlList = () => {
	// Create a new list IF there is none yet
	if (!state.list) state.list = new List();

	// Add each ingredient to the list and UI
	state.recipe.ingredients.forEach(el => {
		const item = state.list.addItem(el.count, el.unit, el.ingredient);
		listView.renderItem(item);
	})
}

// Handle delete and update list item events
elements.shopping.addEventListener("click", e => {
	const id = e.target.closest(".shopping__item").dataset.itemid;

	if (e.target.matches(".shopping__delete, .shopping__delete *")) {
		// Delete from state
		state.list.deleteItem(id);

		// Delete from UI 
		listView.deleteItem(id);

		// Handle the count update
	} else if (e.target.matches(".shopping__count-value")) {
		const val = parseFloat(e.target.value, 10);
		state.list.updateCount(id, val);
	}
})

/*
 * LIKES CONTROLLER
 */
const ctrlLike = () => {
	if (!state.likes) state.likes = new Likes();

	const curID = state.recipe.id;

	// User has not yet liked current recipe
	if (!state.likes.isLiked(curID)) {
		// Add like to the state
		const newLike = state.likes.addLike(
			curID,
			state.recipe.title,
			state.recipe.author,
			state.recipe.img
		);

		// Togle the like button
		likesView.toggleLikeBtn(true);

		// Add like to UI list
		likesView.renderLikeMenu(newLike);
	}
	// User has liked current recipe
	else {
		// Remove like to the state
		state.likes.deleteLike(curID)

		// Togle the like button
		likesView.toggleLikeBtn(false);

		// Remove like to UI list
		likesView.deleteLike(curID);
	}

	likesView.toggleLikeMenu(state.likes.getNumLikes());
}

// Restore liked recipes on page load
window.addEventListener("load", () => {
	state.likes = new Likes();

	// Restore Likes
	state.likes.readStorage();

	// Toggle like menu button
	likesView.toggleLikeMenu(state.likes.getNumLikes());

	// Render existing likes
	state.likes.likes.forEach(like => likesView.renderLikeMenu(like));
});

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
	} else if (e.target.matches("recipe__btn--add, .recipe__btn--add *")) {
		// Add indgredients to shopping list
		ctrlList()
	} else if (e.target.matches(".recipe__love, .recipe__love *")) {
		// Like Controller
		ctrlLike();
	}
});