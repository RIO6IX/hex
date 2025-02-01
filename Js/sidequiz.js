const questions = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "Capital of France?", answer: "paris" },
    { question: "Largest planet in our solar system?", answer: "jupiter" },
    { question: "Chemical symbol for gold?", answer: "au" },
    { question: "How many continents are there?", answer: "7" },
    { question: "What year did WW2 end?", answer: "1945" },
    { question: "Square root of 64?", answer: "8" },
    { question: "First element on the periodic table?", answer: "hydrogen" },
    { question: "Longest river in the world?", answer: "nile" },
    { question: "Number of sides on a hexagon?", answer: "6" }
];

let currentQuestion = 0;
let score = 0;

function displayQuestion() {
    const questionElement = document.getElementById('question');
    questionElement.textContent = `Question ${currentQuestion + 1}: ${questions[currentQuestion].question}`;
    document.getElementById('answer').value = '';
    document.getElementById('answer').focus();
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestion].answer.toLowerCase();
    const questionBox = document.querySelector('.question-box');

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById('score').textContent = score;
        questionBox.classList.add('correct');

        setTimeout(() => {
            questionBox.classList.remove('correct');
            currentQuestion++;
            if (currentQuestion < questions.length) {
                displayQuestion();
            } else {
                alert(`Quiz completed! Final score: ${score}/10`);
                currentQuestion = 0;
                score = 0;
                document.getElementById('score').textContent = '0';
                displayQuestion();
            }
        }, 1000);
    } else {
        questionBox.classList.add('incorrect');
        setTimeout(() => questionBox.classList.remove('incorrect'), 1000);
        document.getElementById('answer').value = '';
    }
}

// Start the quiz
displayQuestion();
