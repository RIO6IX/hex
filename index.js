
// Active page indicator
const activePage = window.location.pathname.endsWith("/") 
    ? "/portfolio-security-service/index.html" 
    : window.location.pathname;

const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    if (link.href.endsWith(activePage)) {
        link.classList.add('active');
    }
});


const card_container = document.getElementById("challenge-card-container")
let currentChallengeId;
let challengeData;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        challengeData = data
        data.map(challenge => (
            card_container.innerHTML += `
                <div class='challenge-card' data-category='${challenge.category}' data-difficulty='${challenge.difficulty}'>
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

const userAnswer = document.getElementById("flag-input")    
const modal = document.getElementById("modal")
const modalContent = document.getElementById("modal-content")
const modalType = document.getElementById("type");
const modalDifficulty = document.getElementById("difficulty");
const modalName = document.getElementById("challenge-name");
const modalAuthor = document.getElementById("author");
const modalDescription = document.getElementById("description");
const modalHintContainer = document.getElementById("hint-btn-container")
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.getElementById("submit-btn")
const hint = document.getElementById("hint-container")

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

        challengeData[currentChallengeId].hints.map((hint,index) => (
            modalHintContainer.innerHTML += `<button class="hint-button" onclick="showHint(${index})">${index + 1}</button>`
        ))

        modal.style.display = 'block'

    }
})

function checkAnswer() {
    const SALT = "mySecretSalt123";
    const answer = challengeData[currentChallengeId].answer
    const hash = CryptoJS.SHA256(userAnswer.value.trim() + SALT).toString();
    if (answer === hash) {
        modal.style.display = 'none'
        showConfetti()
    } else {
        flashRedBorder()
    }

    userAnswer.value = ''
}

submitBtn.addEventListener('click', checkAnswer)

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
    hint.style.display = "none"
    modalHintContainer.innerHTML = ''
    userAnswer.value = ''
})

window.addEventListener('click', (event) => {
    if(event.target === modal) {
        modal.style.display = 'none'
        hint.style.display = "none"
        modalHintContainer.innerHTML = ''
        userAnswer.value = ''
    }
})

// Toggle Hint section
function showHint(hintNumber) {
    if (hint.style.display === "none" || hint.style.display === "") {
        hint.style.display = "block"
        hint.textContent = challengeData[currentChallengeId].hints[hintNumber]
    } else {
        hint.style.display = "none"
    }
}

function flashRedBorder() {
    modalContent.classList.add("flash-red")
    setTimeout(() => {
        modalContent.classList.remove("flash-red")
    }, 1500)
}

function showConfetti() {
    for (let i=0; i < 100; i++) {
        let confetti = document.createElement("div")
        confetti.classList.add("confetti")
        document.body.appendChild(confetti)
        confetti.style.left = Math.random() * window.innerWidth + "px"
        confetti.style.top = "-10px"
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`
        confetti.style.animationDuration = (Math.random() * 3 + 2) + "s"
        confetti.style.animationDelay = Math.random() * 2 + "s"
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`

        setTimeout(() => confetti.remove(), 5000)
    }
}

// code to implement filter functionality

const categoryFilter = document.getElementById("category-filter");
const difficultyFilter = document.getElementById("difficulty-filter");

function filterChallenges() {
    let selectedCategory = document.querySelector("#category-filter .active")?.dataset.filter || "all";
    let selectedDifficulty = document.querySelector("#difficulty-filter .active")?.dataset.filter || "all";
    
    let questions = document.querySelectorAll(".challenge-card");

    questions.forEach((question) => {
        let matchesCategory = selectedCategory === "all" || question.getAttribute("data-category") === selectedCategory;
        let matchesDifficulty = selectedDifficulty === "all" || question.getAttribute("data-difficulty") === selectedDifficulty;

        if (matchesCategory && matchesDifficulty) {
            question.classList.remove("not-visible");
        } else {
            question.classList.add("not-visible");
        }
    });
}

categoryFilter.addEventListener("click", (event) => {
    if (event.target.classList.contains("category")) {
        document.querySelectorAll("#category-filter .category").forEach(category => category.classList.remove("active"));
        event.target.classList.add("active");
        filterChallenges();
    }
});

difficultyFilter.addEventListener("click", (event) => {
    if (event.target.classList.contains("category")) {
        document.querySelectorAll("#difficulty-filter .category").forEach(category => category.classList.remove("active"));
        event.target.classList.add("active");
        filterChallenges();
    }
});
