const questions=[
    {
        ques: " Which planet is known as the 'Red Planet'? ",
        ans:[
            {text:'Venus',correct: false},
            {text:'Mars',correct: true},
            {text:'Jupiter',correct: false},
            {text:'Saturn',correct: false},
        ]
    }, {
        ques: " What is the capital of France? ",
        ans:[
            {text:' Berlin ',correct: false},
            {text:'Rome',correct: false},
            {text:'Paris',correct: true},
            {text:'London',correct: false},
        ]
    }, {
        ques: " What is the name of the largest planet in our solar system? ",
        ans:[
            {text:'Venus',correct: false},
            {text:'Mars',correct: false},
            {text:'Jupiter',correct: true},
            {text:'Saturn',correct: false},
        ]
    }, {
        ques: "What is the chemical symbol for gold? ",
        ans:[
            {text:'Ag',correct: false},
            {text:'Au',correct: true},
            {text:'Fe',correct: false},
            {text:'Cu',correct: false},
        ]
    }, {
        ques: "  Which is the smallest continent?",
        ans:[
            {text:'Asia',correct: false},
            {text:'Africa',correct: false},
            {text:'Australia',correct: true},
            {text:'Europe',correct: false},
        ]
    }
]
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answerButtons.style.display = "block";
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none"; 
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.ques;

    currentQuestion.ans.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", () => selectAnswer(answer.correct, button));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.style.display = "none";
}

function selectAnswer(isCorrect, selectedButton) {
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    nextButton.style.display = "block";
    nextButton.onclick = handleNextButton;
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    answerButtons.style.display = "none";
    nextButton.innerHTML = "Play Again";
    nextButton.onclick = restartQuiz;
}

function restartQuiz() {
    answerButtons.style.display = "block";
    startQuiz();
}

startQuiz();