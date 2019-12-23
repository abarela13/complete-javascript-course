/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// Primary Game Variables
var scores, roundScore, activePlayer, gamePlaying;

// DOM Button Elements Getters
var btnStart = document.querySelector('.btn-start');
var btnNew = document.querySelector('.btn-new');
var btnRoll = document.querySelector('.btn-roll');
var btnHold = document.querySelector('.btn-hold');

// Event Listeners
btnStart.addEventListener('click', newGame);
btnNew.addEventListener('click', newGame);
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', bankScore);

init();

function init() {
    // Hide Gameplay Buttons
    btnNew.setAttribute('disabled', true);
    btnNew.setAttribute('hidden', true);
    btnRoll.setAttribute('disabled', true);
    btnRoll.setAttribute('hidden', true);
    btnHold.setAttribute('disabled', true);
    btnHold.setAttribute('hidden', true);

    // Reset Score Values
    scores = [0, 0];
    roundScores = 0;

    // Set First Player to Player 1
    activePlayer = 0;

    // Hide Dice
    document.querySelector('.dice').style.display = 'none';

    // Set all scores values to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Begin Game Play
    gamePlaying = true;
}

function rollDice() {
    // DOM Variables
    var diceDOM = document.querySelector('.dice');

    // Enable Dice
    diceDOM.style.display = 'block';

    // Generate Final Random Number
    var finalRoll = Math.ceil(Math.random() * 6);

    // Animate Dice Rolls
    function animateDice() {
        var diceRolls = 4 + Math.ceil(Math.random() * 3);
        btnRoll.setAttribute('disabled', true);
        console.log('Amount of roll animations - ' + diceRolls);

        setTimeout(function () {
            var rollValue = Math.ceil(Math.random() * 6);
            console.log(rollValue);
            diceDOM.src = 'dice-' + rollValue + '.png';
            diceRolls--;
            if (diceRolls > 0) {
                animateDice();
            }
        }, 750);
        btnRoll.classList.remove('disabled');
        showFinalRoll();
    }

    // Display Final Result
    function showFinalRoll() {
        diceDOM.src = 'dice-' + finalRoll + '.png';
        console.log('Final Roll Value - ' + finalRoll);
    }

    // Update Round Score IF rolled # was NOT a 1
    if (finalRoll > 1) {
        console.log('Player ' + (activePlayer + 1) + ' rolled a ' + finalRoll + '.');
        roundScore += finalRoll;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        document.getElementById('current-' + activePlayer).textContent = 0;
        roundScore = 0;
        console.log('Player ' + activePlayer + ' rolled a 1.');
        console.log('Switching Players.');
        switchPlayer();
    }
}

function newGame() {
    // Hide Gameplay Buttons
    btnStart.setAttribute('disabled', true);
    btnStart.setAttribute('hidden', true);

    // Show Gameplay Buttons
    btnNew.removeAttribute('disabled');
    btnNew.removeAttribute('hidden');

    btnRoll.removeAttribute('disabled');
    btnRoll.removeAttribute('hidden');

    btnHold.removeAttribute('disabled');
    btnHold.removeAttribute('hidden');
}


function bankScore() {
    document.getElementById('current-' + activePlayer).textContent = 0;
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    switchPlayer();
}

function switchPlayer() {
    if (activePlayer === 0) {
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
        activePlayer = 1;
        console.log('Player ' + (activePlayer + 1) + ' round.');
    } else {
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        activePlayer = 0;
        console.log('Player ' + (activePlayer + 1) + ' round.');
    }
}

function gameLog() {
    console.log('Current Active Player - ' + (activePlayer + 1));
    console.log('Last Roll - ' + finalRoll);
    console.log('Current Round Score - ' + roundScore);
}