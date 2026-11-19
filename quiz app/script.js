// ==============================
// QUIZ QUESTIONS
// ==============================

const quizData = [
    {
        question: "Which language is primarily used for structuring web pages?",
        a: "A. Python",
        b: "B. HTML",
        c: "C. CSS",
        d: "D. JavaScript",
        correct: "b",
        explanation: "HTML is used to structure elements on a webpage."
    },
    {
        question: "Which language is used to add beautiful styles and responsive layouts?",
        a: "A. CSS",
        b: "B. HTML",
        c: "C. Java",
        d: "D. PHP",
        correct: "a",
        explanation: "CSS controls the design, colors, layout and styling of webpages."
    },
    {
        question: "Which language adds interactivity to a website?",
        a: "A. C++",
        b: "B. Python",
        c: "C. JavaScript",
        d: "D. HTML",
        correct: "c",
        explanation: "JavaScript adds interactive behavior and functionality to websites."
    },
    {
        question: "What does HTML stand for?",
        a: "A. Hyper Text Markup Language",
        b: "B. High Text Machine Language",
        c: "C. Hyper Tool Multi Language",
        d: "D. Home Tool Markup Language",
        correct: "a",
        explanation: "HTML stands for Hyper Text Markup Language."
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        a: "A. <link>",
        b: "B. <a>",
        c: "C. <href>",
        d: "D. <hyper>",
        correct: "b",
        explanation: "The <a> tag is used to create hyperlinks in HTML."
    },
    {
        question: "Which property is used in CSS to change the text color?",
        a: "A. font-color",
        b: "B. text-color",
        c: "C. color",
        d: "D. background-color",
        correct: "c",
        explanation: "The 'color' property is used to change the text color in CSS."
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        a: "A. <!-- -->",
        b: "B. //",
        c: "C. /* */",
        d: "D. #",
        correct: "b",
        explanation: "In JavaScript, // is used for single-line comments."
    },
    {
        question: "What does CSS stand for?",
        a: "A. Computer Style Sheets",
        b: "B. Cascading Style Sheets",
        c: "C. Creative Style System",
        d: "D. Colorful Style Sheets",
        correct: "b",
        explanation: "CSS stands for Cascading Style Sheets."
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        a: "A. String",
        b: "B. Boolean",
        c: "C. Float",
        d: "D. Number",
        correct: "c",
        explanation: "JavaScript has Number, String, Boolean, Object, etc. There is no separate 'Float' type."
    },
    {
        question: "Which HTML tag is used to define an unordered list?",
        a: "A. <ol>",
        b: "B. <ul>",
        c: "C. <li>",
        d: "D. <list>",
        correct: "b",
        explanation: "The <ul> tag is used to create an unordered (bulleted) list."
    }
];


// ==============================
// HTML ELEMENTS
// ==============================

const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultsScreen = document.getElementById("results-screen");
const reviewScreen = document.getElementById("review-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const reviewBtn = document.getElementById("review-btn");
const backResultsBtn = document.getElementById("back-results-btn");

const optionsGrid = document.getElementById("options-grid");
const questionText = document.getElementById("question-text");
const questionCounter = document.getElementById("question-counter");
const currentScoreElement = document.getElementById("current-score");
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("timer");

const feedbackBox = document.getElementById("feedback-box");
const feedbackTitle = document.getElementById("feedback-title");
const explanationText = document.getElementById("explanation-text");
const feedbackIcon = document.getElementById("feedback-status-icon");


// ==============================
// QUIZ VARIABLES
// ==============================

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let userAnswers = [];


// ==============================
// BUTTON EVENTS
// ==============================

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", goToNextQuestion);
reviewBtn.addEventListener("click", showReview);

backResultsBtn.addEventListener("click", () => {
    reviewScreen.style.display = "none";
    resultsScreen.style.display = "block";
});


// ==============================
// START QUIZ
// ==============================

function startQuiz() {

    clearInterval(timer);

    startScreen.style.display = "none";
    resultsScreen.style.display = "none";
    reviewScreen.style.display = "none";
    questionScreen.style.display = "block";

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];

    currentScoreElement.textContent = score;

    loadQuestion();
}


// ==============================
// TIMER
// ==============================

function startTimer() {

    clearInterval(timer);

    timeLeft = 60;
    updateTimer();

    timer = setInterval(() => {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(timer);

            autoTimeOut();
        }

    }, 1000);
}


function updateTimer() {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerElement.textContent =
        `⏱️ ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


// ==============================
// LOAD QUESTION
// ==============================

function loadQuestion() {

    feedbackBox.style.visibility = "hidden";
    feedbackBox.className = "feedback-box";

    nextBtn.style.display = "block";

    optionsGrid.innerHTML = "";

    const currentQuiz = quizData[currentQuestionIndex];

    questionText.textContent = currentQuiz.question;

    questionCounter.textContent =
        `Question ${currentQuestionIndex + 1} of ${quizData.length}`;

    const progressPercent =
        (currentQuestionIndex / quizData.length) * 100;

    progressBar.style.width = `${progressPercent}%`;

    const keys = ["a", "b", "c", "d"];

    keys.forEach(key => {

        const button = document.createElement("button");

        button.className = "option-card";
        button.textContent = currentQuiz[key];
        button.dataset.option = key;

        button.addEventListener("click", handleOptionClick);

        optionsGrid.appendChild(button);

    });

    startTimer();
}


// ==============================
// HANDLE ANSWER
// ==============================

function handleOptionClick(e) {

    clearInterval(timer);

    const selectedAnswer = e.currentTarget.dataset.option;

    const currentQuiz = quizData[currentQuestionIndex];

    userAnswers[currentQuestionIndex] = {
        selected: selectedAnswer,
        correct: selectedAnswer === currentQuiz.correct,
        timedOut: false
    };

    const allButtons =
        optionsGrid.querySelectorAll(".option-card");

    allButtons.forEach(btn => {

        btn.disabled = true;

        if (btn.dataset.option === currentQuiz.correct) {
            btn.classList.add("correct");
        }

    });

    if (selectedAnswer === currentQuiz.correct) {

        score++;

        showFeedback(true, currentQuiz.explanation);

    } else {

        e.currentTarget.classList.add("wrong");

        showFeedback(false, currentQuiz.explanation);

    }

    currentScoreElement.textContent = score;
}


// ==============================
// TIME OUT
// ==============================

function autoTimeOut() {

    const currentQuiz = quizData[currentQuestionIndex];

    userAnswers[currentQuestionIndex] = {
        selected: null,
        correct: false,
        timedOut: true
    };

    const allButtons =
        optionsGrid.querySelectorAll(".option-card");

    allButtons.forEach(btn => {

        btn.disabled = true;

        if (btn.dataset.option === currentQuiz.correct) {
            btn.classList.add("correct");
        }

    });

    score--;

    currentScoreElement.textContent = score;

    showFeedback(
        false,
        "Time is up! Penalty applied (-1). " +
        currentQuiz.explanation
    );
}


// ==============================
// SHOW FEEDBACK
// ==============================

function showFeedback(isCorrect, explanation) {

    feedbackBox.style.visibility = "visible";

    if (isCorrect) {

        feedbackBox.classList.add("correct-box");

        feedbackTitle.textContent = "Correct!";

        feedbackIcon.textContent = "✅";

    } else {

        feedbackBox.classList.add("wrong-box");

        feedbackTitle.textContent = "Incorrect!";

        feedbackIcon.textContent = "❌";

    }

    explanationText.textContent = explanation;
}


// ==============================
// NEXT QUESTION
// ==============================

function goToNextQuestion() {

    clearInterval(timer);

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {

        loadQuestion();

    } else {

        showResults();

    }
}


// ==============================
// FINAL RESULTS
// ==============================

function showResults() {

    clearInterval(timer);

    questionScreen.style.display = "none";

    resultsScreen.style.display = "block";

    progressBar.style.width = "100%";

    document.getElementById("final-score-text").textContent =
        `${score}/${quizData.length}`;
}


// ==============================
// REVIEW ANSWERS
// ==============================

function showReview() {

    resultsScreen.style.display = "none";

    reviewScreen.style.display = "block";

    const reviewList = document.getElementById("review-list");

    reviewList.innerHTML = "";

    quizData.forEach((quiz, index) => {

        const answer = userAnswers[index];

        const card = document.createElement("div");

        card.className = "review-card";

        const status = answer.correct
            ? "Correct ✅"
            : answer.timedOut
                ? "Time Out ⏰"
                : "Incorrect ❌";

        const selectedText = answer.selected
            ? quiz[answer.selected]
            : "Not Answered";

        const correctText = quiz[quiz.correct];

        const heading = document.createElement("h3");
        heading.textContent = `Question ${index + 1}`;

        const question = document.createElement("p");
        question.textContent = quiz.question;

        const selected = document.createElement("p");
        selected.textContent = `Your Answer: ${selectedText}`;

        const correct = document.createElement("p");
        correct.textContent = `Correct Answer: ${correctText}`;

        const result = document.createElement("p");
        result.textContent = `Status: ${status}`;

        const explanation = document.createElement("p");
        explanation.textContent = `Explanation: ${quiz.explanation}`;

        card.append(
            heading,
            question,
            selected,
            correct,
            result,
            explanation
        );

        reviewList.appendChild(card);

    });
}


// ==============================
// RESTART QUIZ
// ==============================

function restartQuiz() {

    clearInterval(timer);

    resultsScreen.style.display = "none";
    reviewScreen.style.display = "none";
    questionScreen.style.display = "none";

    startScreen.style.display = "block";

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];

}