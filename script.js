const questions = [
    {
        question: "Which language is used to style web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyperlink Text Management Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is mainly used to make web pages interactive?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        answers: [
            { text: ".", correct: false },
            { text: "#", correct: true },
            { text: "*", correct: false },
            { text: "@", correct: false }
        ]
    },
    {
        question: "Which of these is a programming language?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "Python", correct: true },
            { text: "HTTP", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<href>", correct: false },
            { text: "<url>", correct: false }
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { text: "variable", correct: false },
            { text: "var", correct: true },
            { text: "int", correct: false },
            { text: "string", correct: false }
        ]
    },
    {
        question: "Which database language is used to manage relational databases?",
        answers: [
            { text: "SQL", correct: true },
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "XML", correct: false }
        ]
    },
    {
        question: "Which company developed Java?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Google", correct: false },
            { text: "Sun Microsystems", correct: true },
            { text: "Apple", correct: false }
        ]
    },
    {
        question: "Which method is used to print something in the browser console?",
        answers: [
            { text: "console.log()", correct: true },
            { text: "print()", correct: false },
            { text: "display()", correct: false },
            { text: "write.console()", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");

    nextButton.style.display = "none";

    showQuestion();
}

function showQuestion() {
    resetState();

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerHTML =
        `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");

        button.innerHTML = answer.text;
        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");

    scoreElement.innerHTML =
        `Your Score: ${score}/${questions.length}`;
}

restartButton.addEventListener("click", startQuiz);

startQuiz();