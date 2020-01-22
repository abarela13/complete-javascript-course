// Dudget Controller
var budgetController = (function() {
	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var calculateTotal = function(type) {
		var sum = 0;

		data.allItems[type].forEach(function(currentValue) {
			sum += currentValue.value;
		});

		data.totals[type] = sum;
	};

	// var allExpensese = [];
	// var allIncome = [];
	// var totalExpenses = 0;

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};

	return {
		addItem: function(type, description, value) {
			var newItem, ID;

			// Create new ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			// Create new item based on "inc" or "exp" type
			if (type === "exp") {
				newItem = new Expense(ID, description, value);
			} else if (type === "inc") {
				newItem = new Income(ID, description, value);
			}

			// Push it into our data structure
			data.allItems[type].push(newItem);

			// Return the new element
			return newItem;
		},

		calculateBudget: function() {
			// Calculate total income and expenses
			calculateTotal("inc");
			calculateTotal("exp");

			// Calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;

			// Calculate the percentage of income that we expect
			data.percentage = ((data.totals.exp / data.totals.inc) * 100).toFixed(2);
		},

		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
		},

		testing: function() {
			console.log(data);
		}
	};
})();

// UI Controller
var UIController = (function() {
	var DOMstrings = {
		inputType: ".add__type",
		inputDescription: ".add__description",
		inputValue: ".add__value",
		inputButton: ".add__btn",
		incomeContainer: ".income__list",
		expensesContainer: ".expenses__list"
	};

	return {
		getInput: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value, // Will be either "inc" or "exp"
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			};
		},

		addListItem: function(obj, type) {
			var html, newHtml;

			// Create HTML string with placeholder text
			if (type === "inc") {
				element = DOMstrings.incomeContainer;

				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === "exp") {
				element = DOMstrings.expensesContainer;

				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			// Replace placehold text with actual data
			newHtml = html.replace("%id%", obj.id);
			newHtml = newHtml.replace("%description%", obj.description);
			newHtml = newHtml.replace("%value%", obj.value);

			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
		},

		clearFields: function() {
			var fields, fieldsArr;

			fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			});

			fieldsArr[0].focus();
		},

		getDomStrings: function() {
			return DOMstrings;
		}
	};
})();

// Global App Controller
var controller = (function(budgetCtrl, UICtrl) {
	var setupEventListenter = function() {
		var DOM = UICtrl.getDomStrings();

		document.querySelector(DOM.inputButton).addEventListener("click", ctrlAddItem);
		document.addEventListener("keypress", function(event) {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}

			// Display ANY keyboard event
			// console.log(event);
		});
	};

	var updateBudget = function() {
		// Calculate Budget
		budgetCtrl.calculateBudget();

		// Return the Budget
		var budget = budgetCtrl.getBudget();

		// Display Budget on UI
		console.log(budget);
	};

	var ctrlAddItem = function() {
		var input, newItem;

		// Get field input data
		input = UICtrl.getInput(); // console.log(input);

		if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
			// Add item to budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			// Add item to UI
			UICtrl.addListItem(newItem, input.type);

			// Clear the fields
			UICtrl.clearFields();

			// Calculate and update budget
			updateBudget();
		}
	};

	return {
		init: function() {
			setupEventListenter();
			console.log("Event listeners initialized.");
		}
	};
})(budgetController, UIController);

controller.init();
