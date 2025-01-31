const SALT = "mySecretSalt123";

// Answer hashes (generated offline)
const answerHashes = {
    q1: "5d36336fe2df6b5a1233e186d92a6a646a5715bebc2de96738c7a56e25f24767", // Hash for "Paris"
    // Hash for other answers
};

function checkAnswer(questionId) {
    const userAnswer = document.getElementById(questionId).value.trim();
    const hash = CryptoJS.SHA256(userAnswer + SALT).toString();
    
    const resultSpan = document.querySelector(`#${questionId} + button + .result`);
    
    if (hash === answerHashes[questionId]) {
        resultSpan.textContent = "✅ Correct!";
        resultSpan.style.color = "green";
    } else {
        resultSpan.textContent = "❌ Try Again";
        resultSpan.style.color = "red";
    }
}