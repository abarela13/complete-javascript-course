/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

scores = [43, 13];
roundScores = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';
// document.querySelector('#current-' + activePlayer).innerHTML = '<em><strong>' + dice + '</strong></em>';

// Score Setter
document.querySelector('#score-0').textContent = scores[0];
document.querySelector('#score-1').textContent = scores[1];

// Score Getter
var x = document.querySelector('#score-0').textContent;
console.log(x);

document.querySelector('.dice').style.display = 'none';


document.querySelector('.btn-roll').addEventListener('click', rollDice);

function rollDice() {
    // Create Variables
    var diceRolls = 2 + Math.ceil(Math.random() * 3);
    var diceDOM = document.querySelector('.dice');
    var currentPlayerScore = document.querySelector('#current-' + activePlayer);

    // Generate Final Random Number
    var finalRoll = Math.ceil(Math.random() * 6);

    // Enable Dice
    diceDOM.style.display = 'block';

    // Dice Animation
    console.log('Amount of roll animations - ' + diceRolls);
    for (var i = 0; i < diceRolls; i++) {
        setInterval(animateDice(), 500);
    }

    function animateDice() {
        var rollValue = Math.ceil(Math.random() * 6);
        console.log(rollValue);
        diceDOM.src = 'dice-' + rollValue + '.png';
    }

    // Display Final Result
    diceDOM.src = 'dice-' + finalRoll + '.png';

    currentPlayerScore.textContent = finalRoll;
    /* 
        // Update Round Score IF rolled # was NOT a 1
        if (finalRoll > 1) {
            roundScore += finalRoll;

        } */

    /* 
    
    console.log(rolls)

    for (var i = 0; i < rolls; i++) {
        dice = Math.ceil(Math.random() * 6);
    }

    dice = Math.ceil(Math.random() * 6);

    dice > 1 ? roundScore += dice : console.log('Dice rolled a ' + dice + '. Switching Players.');
    switchPlayer();
     */
}

function switchPlayer() {
    dice === 0 ? activePlayer = 1 : activePlayer = 0;
}


function gameHold() {

}

function newGame() {

}