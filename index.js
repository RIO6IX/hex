const card_container = document.getElementById("challenge-card-container")
let currentChallengeId;
let challengeData;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        challengeData = data
        data.map(challenge => (
            card_container.innerHTML += `
                <div class='challenge-card'>
                    <div class='challenge-type'>${challenge.type}</div>
                    <div class='challenge-difficulty ${challenge.difficulty}'>${challenge.difficulty}</div>
                    <div class='challenge-title'>${challenge.name}</div>
                    <button class='accept-btn' data-id='${challenge.id}'>Accept Challenge</button>
                </div>
            `
        ))
        setTimeout(() => {data = null}, 1000)
    })
    .catch(error => console.error(error))
    
const modal = document.getElementById("modal")
const modalType = document.getElementById("type");
const modalDifficulty = document.getElementById("difficulty");
const modalName = document.getElementById("challenge-name");
const modalAuthor = document.getElementById("author");
const modalDescription = document.getElementById("description");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.getElementById("submit-btn")
const result = document.getElementById("result")

card_container.addEventListener('click', (event) => {
    event.preventDefault()

    if (event.target.classList.contains('accept-btn')) {
        currentChallengeId = event.target.dataset.id
        modalType.textContent = challengeData[currentChallengeId].type

        modalDifficulty.textContent = challengeData[currentChallengeId].difficulty
        modalDifficulty.classList.add("challenge-difficulty", `${challengeData[currentChallengeId].difficulty}`)
        modalName.textContent = challengeData[currentChallengeId].name
        modalAuthor.textContent = `AUTHOR: ${challengeData[currentChallengeId].author}`
        modalDescription.textContent = challengeData[currentChallengeId].description 

        modal.style.display = 'block'

    }
})

function checkAnswer() {
    const SALT = "mySecretSalt123";
    const answer = challengeData[currentChallengeId].answer
    const userAnswer = document.getElementById("flag-input")
    const hash = CryptoJS.SHA256(userAnswer.value.trim() + SALT).toString();
    if (answer === hash) {
        result.innerText = '✅'
    } else {
        result.innerText = '❌'
    }

    userAnswer.value = ''
}

submitBtn.addEventListener('click', checkAnswer)

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
    result.innerText = ''
})

window.addEventListener('click', (event) => {
    if(event.target === modal) {
        modal.style.display = 'none'
        result.innerText = ''
    }
})


// Toggle Hint section
function showHint(hintNumber) {
    const hint = document.getElementById("hint-container")

    if (hint.style.display === "none" || hint.style.display === "") {
        hint.style.display = "block"
    }
    hint.textContent = challengeData[currentChallengeId].hints[hintNumber]
}