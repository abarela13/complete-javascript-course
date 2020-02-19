/* 
const second = () => {
    setTimeout(() => {
        console.log("Second");
    }, 5000);
}

const first = () => {
    console.log("Hey there");
    second();
    console.log("THE END");
}

first();
 */

//////////////////////////////
// Lecture: Callback Hell
/* 
function getRecipe() {
	setTimeout(() => {
		const recipeID = [523, 883, 432, 974];
		console.log(recipeID);

		setTimeout(
			id => {
				const recipe = {
					name: "Fresh Tomato Pasta",
					publisher: "Jonas"
				};
				console.log(`${id}: ${recipe.name}`);

				setTimeout(
					publisher => {
						const recipe2 = {
							title: "Italian Pizza",
							publisher: "Jonas"
						};
						console.log(recipe2);
					},
					1500,
					recipe.publisher
				);
			},
			1000,
			recipeID[2]
		);
	}, 1500);
}

getRecipe();
 */
//////////////////////////////
// Lecture: Promises

// Produce Promises
const getIDs = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve([523, 883, 432, 974]);
	}, 1500);
});

const getRecipe = recID => {
	return new Promise((resolve, reject) => {
		setTimeout(
			ID => {
				const recipe = {
					title: "Fresh Tomato Pasta",
					publisher: "Jonas"
				};
				resolve(`${ID}: ${recipe.title}`);
			},
			1500,
			recID
		);
	});
};

const getRelated = publisher => {
	return new Promise((resolve, reject) => {
		setTimeout(
			pub => {
				const recipe = {
					title: "Italian Pizza",
					publisher: "Jonas"
				};
				resolve(`${pub}: ${recipe.title}`);
			},
			1500,
			publisher
		);
	});
};

// Consume Promises
// getIDs
// 	.then(IDs => {
// 		console.log(IDs);
// 		return getRecipe(IDs[2]);
// 	})
// 	.then(recipe => {
// 		console.log(recipe);
// 		return getRelated("Jonas");
// 	})
// 	.then(recipe => {
// 		console.log(recipe);
// 	})
// 	.catch(error => {
// 		console.log("---Error---");
// 		console.log(error);
// 	});

//////////////////////////////
// Lecture: Async/Await

async function getRecipesAW() {
	const IDs = await getIDs;
	console.log(IDs);
	const recipe = await getRecipe(IDs[2]);
	console.log(recipe);
	const related = await getRelated("Jonas");
	console.log(related);

	return recipe;
}
getRecipesAW().then(result => console.log(`${result} is the best ever!`));
