const quizData = [
    {
        question: "What is the current president of Nigeria?",
        options: ["Bola Ahmed Tinubu", "Muhammed Buhari", "Olusegun Obasonjo", "Yakubu Gowon"],
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
    // Add more questions as needed
];

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const restartButton = document.getElementById("restart-button");
const progressBar = document.querySelector(".progress-done");

let currentQuestionIndex = 0;
let score = 0;

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
};

const checkAnswer = (selectedOption) => {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
    }
};

//Show Result
    const showResult = () => {
    resultContainer.innerHTML = `Your score: ${score} out of ${quizData.length}`;
    };

// Progress Bar - Show progress with visual feedback (e.g., "3/5 questions completed")
    const updateProgress = () => {
    const progressPercentage = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = progressPercentage + "%";
    progressBar.innerHTML = Math.floor(progressPercentage) + "%";
    };


// Animated Transitions 🎨- Smooth animations for navigating between questions.
// Next Button    
nextButton.addEventListener("click", () => {
        const selectedOption = document.querySelector('input[name="option"]:checked');
    
        if (selectedOption) {
            checkAnswer(selectedOption.value);
            
            // Fade out the current question
            questionContainer.style.opacity = 0;
    
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizData.length) {
                    loadQuestion(); // Load next question
                    updateProgress();
                    questionContainer.style.opacity = 1; // Fade in new question
                } else {
                    showResult(); // Show final result
                    questionContainer.style.opacity = 1;
                    nextButton.style.display = "none";
                    restartButton.style.display = "block";
                }
            }, 500); // Matches the transition duration in CSS
        } else {
            alert("Please select an option");
        }
    });
    

// Initial load
loadQuestion();

// Reset progress on restart
const resetProgress = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "block";
    restartButton.style.display = "none";
    resultContainer.innerHTML = "";
    loadQuestion();
    updateProgress(); // Reset progress bar
};

// Initial Update
window.addEventListener("DOMContentLoaded", () => {
    updateProgress(); // Initialize progress bar
});

const restartQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "block";
    restartButton.style.display = "none";
    resultContainer.innerHTML = "";
    loadQuestion();
};

restartButton.addEventListener("click", restartQuiz);

//===IMPROVEMENTS===
// 1. Timer for Each Question ⏱️ - Add a countdown timer to create urgency.
// 2. Progress Bar 📊 - Show progress with visual feedback (e.g., "3/5 questions completed").✅
// 3. Custom Messages 📝 - Display feedback for correct/incorrect answers (e.g., "Great job!" or "Try again!").
// 4. Review Incorrect Answers - Let users review questions they answered incorrectly.
// 5. Random Question Order 🎲 - Shuffle questions each time the quiz starts.
