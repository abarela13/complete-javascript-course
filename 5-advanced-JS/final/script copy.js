/* 
(function () {
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function () {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function (ans) {
        if (ans === this.correct) {
            console.log('Correct answer!');

        } else {
            console.log('Wrong answer. Try again :)')
        }
    }

    var q1 = new Question('Is JavaScript the coolest programming language in the world?',
        ['Yes', 'No'],
        0);

    var q2 = new Question('What is the name of this course\'s teacher?',
        ['John', 'Micheal', 'Jonas'],
        2);

    var q3 = new Question('What does best describe coding?',
        ['Boring', 'Hard', 'Fun', 'Tediuos'],
        2);

    var questions = [q1, q2, q3];

    var n = Math.floor(Math.random() * questions.length);

    questions[n].displayQuestion();

    var answer = parseInt(prompt('Please select the correct answer.'));

    questions[n].checkAnswer(answer);
})();
*/

/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/