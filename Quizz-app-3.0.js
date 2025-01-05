const quizData = [
    {
        question: "What is the current president of Nigeria?",
        options: ["Bola Ahmed Tinubu", "Muhammed Buhari", "Olusegun Obasanjo", "Yakubu Gowon"],
        correctAnswer: "Bola Ahmed Tinubu"
    },
    {
        question: "What is the capital of Lagos State?",
        options: ["Lagos", "Abuja", "Ibadan", "Kano"],
        correctAnswer: "Lagos"
    },
    {
        question: "Who is the President of Russia?",
        options: ["Vladimir Putin", "Dmitry Medvedev", "Boris Yeltsin", "Mikhail Gorbachev"],
        correctAnswer: "Vladimir Putin"
    },
    {
        question: "Who is the Capital of Germany?",
        options: ["Berlin", "Munich", "Harmburg", "Frankfurt"],
        correctAnswer: "Vladimir Putin"
    }
];

const questionContainer = document.getElementById("question-container");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const progressBar = document.querySelector(".progress-done");
const resultContainer = document.getElementById("result-container");

let currentQuestionIndex = 0;
let score = 0;
let countdown;

const loadQuestion = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.innerHTML = `
        <p>${currentQuestion.question}</p>
        <ul>
            ${currentQuestion.options.map((option, index) => `
                <li>
                    <input type="radio" name="option" value="${option}" id="option${index}">
                    <label for="option${index}">${option}</label>
                </li>
            `).join('')}
        </ul>
    `;
    resetTimer();
    startTimer();
};

const checkAnswer = (selectedOption) => {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
    }
};

const nextQuestion = () => {
    clearInterval(countdown);
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        updateProgress();
    } else {
        showResult();
    }
};

const updateProgress = () => {
    const progressPercentage = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = progressPercentage + "%";
    progressBar.textContent = Math.floor(progressPercentage) + "%";
};

//Using the fisherYatesShuffle method
function shuffleQuestionArray(array) {
    for (let i = array.length - 1; i > 0;  i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));        
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];        
    }
    return array;
}

const showResult = () => {
    clearInterval(countdown);
    resultContainer.innerHTML = `Your score: ${score} out of ${quizData.length}`;
    questionContainer.innerHTML = "";
    nextButton.style.display = "none";
    restartButton.style.display = "block";
};

const resetTimer = () => {
    timerElement.textContent = "01:00";
};

const startTimer = () => {
    let time = 60;
    countdown = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        if (time === 0) {
            clearInterval(countdown);
            nextQuestion(); // Move to the next question
        }
        time--;
    }, 100);
};

nextButton.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        checkAnswer(selectedOption.value);
        nextQuestion();
    } else {
        alert("Please select an option.");
    }
});

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "block";
    restartButton.style.display = "none";
    resultContainer.innerHTML = "";
    shuffleQuestionArray(quizData)
    loadQuestion();
    updateProgress();
});

// Initialize the first question and progress
window.onload = () => {
    shuffleQuestionArray(quizData)
    loadQuestion();
    updateProgress();
};

//===IMPROVEMENTS===
// 1. Timer for Each Question ⏱️✅- Add a countdown timer to create urgency.✅
// 2. Progress Bar 📊✅ - Show progress with visual feedback (e.g., "3/5 questions completed").✅
// 3. Custom Messages 📝 - Display feedback for correct/incorrect answers (e.g., "Great job!" or "Try again!").
// 4. Review Incorrect Answers - Let users review questions they answered incorrectly.
// 5. Random Question Order 🎲✅ - Shuffle questions each time the quiz starts.✅
// 6.  Animated Transitions 🎨✅	Smooth animations for navigating between questions.✅
