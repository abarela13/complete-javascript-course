/*****************************
 * CODING CHALLENGE 2
 */

/*
John and Mike both play basketball in different teams. In the latest 3 games, John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.

1. Calculate the average score for each team
2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output.
3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)

4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
5. Like before, change the scores to generate different winners, keeping in mind there might be draws.

GOOD LUCK 😀
*/

var teamJohnScores = [89, 120, 103];
var teamMikeScores = [116, 94, 123];
var teamMaryScores = [97, 134, 105];

var teamJohnAvg = (teamJohnScores.reduce((a, b) => a + b, 0)) / teamJohnScores.length;
var teamMikeAvg = (teamMikeScores.reduce((a, b) => a + b, 0)) / teamMikeScores.length;
var teamMaryAvg = (teamMaryScores.reduce((a, b) => a + b, 0)) / teamMaryScores.length;

var winningTeam;

if (teamJohnAvg > teamMikeAvg && teamJohnAvg > teamMaryAvg) {
    winningTeam = "Team John wins.";
} else if (teamMikeAvg > teamJohnAvg && teamMikeAvg > teamMaryAvg) {
    winningTeam = "Team Mike wins.";
} else if (teamMaryAvg > teamJohnAvg && teamMaryAvg > teamMikeAvg) {
    winningTeam = "Team Mary wins.";
} else {
    winningTeam = "It's a tie.";
}

console.log("Team John average - " + teamJohnAvg);
console.log("Team Mike average - " + teamMikeAvg);
console.log("Team Mary average - " + teamMaryAvg);

console.log(winningTeam);