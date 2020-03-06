import {
    elements
} from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
}

export const clearResults = () => {
    elements.searchResultList.innerHTML = "";
    elements.searchResultPage.innerHTML = "";
}

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll(".results__link--active"));
    resultsArr.forEach((el) => {
        el.classList.remove("results__link--active");
    });

    document.querySelector(`.results__link[href*="#${id}"]`).classList.toggle("results__link--active");
}

/**
 * Pasta with tomato and spinach
 * 
 * acc: 0 / acc + cur.length = 5 / newTitle = ["Pasta"]
 * acc: 5 / acc + cur.length = 9 / newTitle = ["Pasta", "with"]
 * acc: 9 / acc + cur.length = 15 / newTitle = ["Pasta", "with", "tomato"]
 * acc: 15 / acc + cur.length = 18 / newTitle = ["Pasta", "with", "tomato"]
 * acc: 18 / acc + cur.length = 24 / newTitle = ["Pasta", "with", "tomato"]
 */

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];

    if (title.length > limit) {
        title.split(" ").reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(" ")} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup =
        `<li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.image_url}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`;

    elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

//type: "prev" or "next"
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === "prev" ? page - 1 : page + 1}>
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right"}"></use>
        </svg>
    </button>`;


const renderButtons = (page, numResults, resultsPerPage) => {
    const numPages = Math.ceil(numResults / resultsPerPage);
    let button;

    if (page === 1 && numPages > 1) {
        // Button for next page
        button = createButton(page, "next");
    } else if (page < numPages) {
        /// Both buttons
        button = `
            ${createButton(page, "prev")}
            ${createButton(page, "next")}`;
    } else if (page === numPages && numPages > 1) {
        /// Button for last page
        button = createButton(page, "prev");
    }

    elements.searchResultPage.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
    // render result of current page
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, recipes.length, resultsPerPage);
};