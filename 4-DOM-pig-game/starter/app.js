/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// Primary Game Variables
var scores, roundScore, activePlayer;

// Dice Values
var diceValue, diceRolls;

// DOM Button Elements Getters
var btnStart = document.querySelector(".btn-start");
var btnNew = document.querySelector(".btn-new");
var btnRoll = document.querySelector(".btn-roll");
var btnHold = document.querySelector(".btn-hold");

// Button Event Listeners
// newGame is example of Callback Function, function called on by another function
btnStart.addEventListener("click", newGame);
btnNew.addEventListener("click", newGame);
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", bankScore);

init();

function init() {
	// Reset Score Values
	scores = [0, 0];
	roundScore = 0;

	// Set First Player to Player 1
	activePlayer = 0;

	// Set Player Names
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";

	// Reset player panel classes
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");

	// Show Start Game Button
	btnStart.removeAttribute("disabled");
	btnStart.removeAttribute("hidden");

	// Hide Gameplay Buttons
	btnNew.setAttribute("disabled", true);
	btnNew.setAttribute("hidden", true);
	btnRoll.setAttribute("disabled", true);
	btnRoll.setAttribute("hidden", true);
	btnHold.setAttribute("disabled", true);
	btnHold.setAttribute("hidden", true);

	// Hide Dice
	document.querySelector(".dice").style.display = "none";

	// Set all scores values to 0
	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";
}

function rollDice() {
	// Toggle Roll Dice Button OFF
	btnRoll.setAttribute("disabled", true);
	btnRoll.setAttribute("hidden", true);

	// DOM Variables
	var diceDOM = document.querySelector(".dice");

	// Enable Dice
	diceDOM.style.display = "block";
	/* 
	// Update and animate Dice Roll
	function animateDice() {
		// Number of times to animate dice
		diceRolls = 3 + Math.ceil(Math.random() * 3);
		console.log("Amount of roll animations - " + (diceRolls + 1));

		for (var diceRoll = 0; diceRoll < diceRolls; diceRoll++) {
			var randomPips = Math.ceil(Math.random() * 6);

			setTimeout(function() {
				// Pip Value Per Roll
				diceDOM.src = "dice-" + randomPips + ".png";
				console.log("Roll " + diceRoll + ",  " + randomPips + " pips.");
			}, 750 * diceRoll);
		}

		setTimeout(function() {
			finalRoll();
		}, 750 * (diceRolls + 1));
	}
 */
	// Display Final Result
	function finalRoll() {
		diceValue = Math.ceil(Math.random() * 6);
		diceDOM.src = "dice-" + diceValue + ".png";

		// Update Round Score IF rolled # was NOT a 1
		if (diceValue !== 1) {
			// Add dice value to round score
			roundScore += diceValue;
			console.log("Player " + (activePlayer + 1) + " rolled a " + diceValue + ". Round total so far - " + roundScore + ".");
			document.getElementById("current-" + activePlayer).textContent = roundScore;
		} else {
			document.getElementById("current-" + activePlayer).textContent = 0;
			console.log("BAD LUCK!!!. Player " + (activePlayer + 1) + " rolled a 1 and lost out on " + roundScore + " points.");
			roundScore = 0;
			switchPlayer();
		}
	}

	finalRoll();

	// Toggle Roll Dice Button ON
	btnRoll.removeAttribute("disabled");
	btnRoll.removeAttribute("hidden");
}

function newGame() {
	init();

	// Hide Start Game Button
	btnStart.setAttribute("disabled", true);
	btnStart.setAttribute("hidden", true);

	// Enable Gameplay Buttons
	btnNew.removeAttribute("disabled");
	btnNew.removeAttribute("hidden");
	btnRoll.removeAttribute("disabled");
	btnRoll.removeAttribute("hidden");
	btnHold.removeAttribute("disabled");
	btnHold.removeAttribute("hidden");

	// Begin Game Play
	gamePlaying = true;
	console.log("---------- Player " + (activePlayer + 1) + " ----------");
}

function bankScore() {
	// Bank CURRENT scort to Global Scores
	scores[activePlayer] += roundScore;

	// Update UI
	document.getElementById("current-" + activePlayer).textContent = 0;
	document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

	roundScore = 0;

	// Check if player won
	if (scores[activePlayer] >= 30) {
		gameWin();
	} else {
		switchPlayer();
	}
}

function switchPlayer() {
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

	console.log("\n");
	console.log("---------- Player " + (activePlayer + 1) + " ----------");

	document.querySelector(".player-0-panel").classList.toggle("active");
	document.querySelector(".player-1-panel").classList.toggle("active");
}

function gameLog() {
	console.log("Current Active Player - " + (activePlayer + 1));
	console.log("Last Roll - " + finalRoll);
	console.log("Current Round Score - " + roundScore);
}

function gameWin() {
	// DOM active player panel
	var activePlayerPanel = document.querySelector(".player-" + activePlayer + "-panel");

	// Update Winning Player UI
	activePlayerPanel.classList.remove("active");
	activePlayerPanel.classList.add("winner");

	// Hide Gameplay Buttons
	btnRoll.toggleAttribute("disabled");
	btnRoll.toggleAttribute("hidden");
	btnHold.toggleAttribute("disabled");
	btnHold.toggleAttribute("hidden");

	// Hide Dice
	document.querySelector(".dice").style.display = "none";

	// Update Player Name to "Winner"
	document.getElementById("name-" + activePlayer).textContent = "WINNER";
	/* 
	setTimeout(function() {
		var rematch = confirm("Would you like to play another game?");

		console.log("Congratulations player " + (activePlayer + 1) + " you won!");

		if (rematch == true) {
			newGame();
		} else {
			init();
		}
    }, 10);
     */
}
