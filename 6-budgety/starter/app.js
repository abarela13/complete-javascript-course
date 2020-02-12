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
		this.percentage = -1;
	};

	Expense.prototype.calcPercentage = function(totalIncome) {
		if (totalIncome > 0) {
			this.percentage = parseFloat((this.value / totalIncome) * 100).toFixed(1);
		} else {
			this.percentage = -1;
		}
	};

	Expense.prototype.getPercentage = function() {
		return this.percentage;
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

		deleteItem: function(type, id) {
			var uniqueIDs, elementIndex;

			// Loop over allItem elements
			uniqueIDs = data.allItems[type].map(function(current) {
				return current.id;
			});

			// Find array index of the target id
			elementIndex = uniqueIDs.indexOf(id);

			if (elementIndex !== -1) {
				// Delete element from data structure
				data.allItems[type].splice(elementIndex, 1);
			}
		},

		calculateBudget: function() {
			// Calculate total income and expenses
			calculateTotal("inc");
			calculateTotal("exp");

			// Calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;

			// Calculate the percentage of income that we expect
			if (data.totals.inc > 0) {
				data.percentage = parseFloat(((data.totals.exp / data.totals.inc) * 100).toFixed(1));
			} else {
				data.percentage = -1;
			}
		},

		calculatePercentages: function() {
			data.allItems.exp.forEach(function(cur) {
				cur.calcPercentage(data.totals.inc);
			});
		},

		getPercentages: function() {
			var allPercentages = data.allItems.exp.map(function(cur) {
				return cur.getPercentage();
			});
			return allPercentages;
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
			console.log(data.allItems);
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
		expensesContainer: ".expenses__list",
		budgetLabel: ".budget__value",
		incomeLabel: ".budget__income--value",
		expenseLabel: ".budget__expenses--value",
		budgetPercentageLabel: ".budget__expenses--percentage",
		container: ".container",
		expensesPercentageLabel: ".item__percentage",
		dateLabel: ".budget__title--month"
	};

	var formatNumber = function(num, type) {
		var numSplit, int, dec, type;

		/*
		+ or - before numbers
		exactly 2 decimal points
		comma seperating the thousands 
		*/

		num = Math.abs(num);
		num = num.toFixed(2);

		numSplit = num.split(".");
		int = numSplit[0];
		if (int.length > 3) {
			int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
		}

		dec = numSplit[1];

		return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
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

				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === "exp") {
				element = DOMstrings.expensesContainer;

				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage"></div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			// Replace placehold text with actual data
			newHtml = html.replace("%id%", obj.id);
			newHtml = newHtml.replace("%description%", obj.description);
			newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
		},

		deleteListItem: function(selectorID) {
			var childEl = document.getElementById(selectorID);
			childEl.parentNode.removeChild(childEl);
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

		displayBudget: function(obj) {
			var type;
			obj.budget > 0 ? (type = "inc") : (type = "exp");

			if (obj.budget !== 0) {
				document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
			} else {
				document.querySelector(DOMstrings.budgetLabel).textContent = "-";
			}

			document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
			document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, "exp");

			if (obj.percentage > 0) {
				document.querySelector(DOMstrings.budgetPercentageLabel).textContent = obj.percentage + "%";
			} else {
				document.querySelector(DOMstrings.budgetPercentageLabel).textContent = "-";
			}
		},

		displayPercentages: function(percentages) {
			// Returns Node List
			var fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);

			// Node list forEach Method
			var nodeListForEach = function(list, callback) {
				for (var i = 0; i < list.length; i++) {
					callback(list[i], i);
				}
			};

			nodeListForEach(fields, function(current, index) {
				if (percentages[index] > 0) {
					current.textContent = percentages[index] + "%";
				} else {
					current.textContent = "-";
				}
			});
		},

		displayDate: function() {
			var now, month, months, year;

			now = new Date();

			month = now.getMonth();
			months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

			year = now.getFullYear();
			document.querySelector(DOMstrings.dateLabel).textContent = months[month] + " " + year;
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

		// Event listener for div class "container"
		document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);
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

			// Update percentages
			updatePercentages();
		}
	};

	var ctrlDeleteItem = function(event) {
		var itemID, splitID, type, ID;

		// Travers DOM to locate desired ID
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if (itemID) {
			// Example | inc-1
			splitID = itemID.split("-");
			type = splitID[0];
			ID = parseInt(splitID[1]);

			// Delete the item from the data structure
			budgetCtrl.deleteItem(type, ID);

			// Delete item from UI
			UICtrl.deleteListItem(itemID);

			// Update and show the new budget
			updateBudget();

			// Update percentages
			updatePercentages();
		}
	};

	var updateBudget = function() {
		// Calculate Budget
		budgetCtrl.calculateBudget();

		// Return the Budget
		var budget = budgetCtrl.getBudget();

		// Display Budget on UI
		UICtrl.displayBudget(budget);
	};

	var updatePercentages = function(type) {
		// Calculate percentages
		budgetCtrl.calculatePercentages();

		// Read percentages from the budget controller
		var percentages = budgetCtrl.getPercentages();

		// Update UI with new percentages
		UICtrl.displayPercentages(percentages);
	};

	return {
		init: function() {
			setupEventListenter();
			UICtrl.displayDate();
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			console.log("Event listeners initialized.");
		}
	};
})(budgetController, UIController);

controller.init();
