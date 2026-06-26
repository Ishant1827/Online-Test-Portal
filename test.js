// ==========================================
// TEST.JS PART 1
// ==========================================

let questions = [];
let currentQuestionIndex = 0;
let answers = {};
let timerInterval;
let timeLeft = 1800;

// ==========================================
// LOAD TEST
// ==========================================

async function loadTest() {

    const urlParams = new URLSearchParams(window.location.search);

    const testId = urlParams.get("testId");

    if (!testId) {

        alert("Test ID not found.");

        window.location.href = "dashboard.html";

        return;

    }

    try {

        const result = await apiCall(
            `getQuestions&testId=${encodeURIComponent(testId)}`
        );

        if (!result.success) {

            alert(result.message);

            window.location.href = "dashboard.html";

            return;

        }

        questions = result.questions;

        document.getElementById("testNameHeader").innerText =
            result.testName;

        timeLeft = Number(result.duration) * 60;

        startTimer();

        renderQuestion();

        renderQuestionDots();

    }

    catch (err) {

        console.error(err);

        alert("Unable to load test.");

    }

}

// ==========================================
// TIMER
// ==========================================

function startTimer() {

    const timer = document.getElementById("timer");

    timerInterval = setInterval(function () {

        const min = Math.floor(timeLeft / 60);

        const sec = timeLeft % 60;

        timer.innerText =
            String(min).padStart(2, "0") +
            ":" +
            String(sec).padStart(2, "0");

        if (timeLeft <= 300) {

            timer.style.color = "red";

        }

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            submitTest(true);

        }

        timeLeft--;

    }, 1000);

}

// ==========================================
// RENDER QUESTION
// ==========================================

function renderQuestion() {

    const q = questions[currentQuestionIndex];

    if (!q) return;

    document.getElementById("questionNumber").innerText =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    document.getElementById("questionText").innerText =
        q.questionText;

    const options = document.getElementById("options");

    options.innerHTML = "";

    const optionList = [

        { key: "A", value: q.optionA },

        { key: "B", value: q.optionB },

        { key: "C", value: q.optionC },

        { key: "D", value: q.optionD }

    ];

    optionList.forEach(option => {

        const label = document.createElement("label");

        label.className = "option";

        label.innerHTML = `

<input
type="radio"
name="answer"
value="${option.key}"
${answers[q.questionId] === option.key ? "checked" : ""}
>

${option.value}

`;

        options.appendChild(label);

        options.appendChild(document.createElement("br"));

        options.appendChild(document.createElement("br"));

    });

    document
        .querySelectorAll('input[name="answer"]')
        .forEach(input => {

            input.addEventListener("change", function () {

                answers[q.questionId] = this.value;

                console.log("Saved Answer:", answers);

                renderQuestionDots();

            });

        });

}

// ==========================================
// QUESTION DOTS
// ==========================================

function renderQuestionDots() {

    const container = document.getElementById("questionDots");

    container.innerHTML = "";

    questions.forEach((q, index) => {

        const dot = document.createElement("button");

        dot.innerText = index + 1;

        dot.className = "dot";

        if (answers[q.questionId]) {
            dot.classList.add("answered");
        }

        if (index === currentQuestionIndex) {
            dot.classList.add("current");
        }

        dot.onclick = function () {

            currentQuestionIndex = index;

            renderQuestion();

            renderQuestionDots();

        };

        container.appendChild(dot);

    });

}

// ==========================================
// NEXT QUESTION
// ==========================================

function nextQuestion() {

    if (currentQuestionIndex < questions.length - 1) {

        currentQuestionIndex++;

        renderQuestion();

        renderQuestionDots();

    }

}

// ==========================================
// PREVIOUS QUESTION
// ==========================================

function prevQuestion() {

    if (currentQuestionIndex > 0) {

        currentQuestionIndex--;

        renderQuestion();

        renderQuestionDots();

    }

}

// ==========================================
// SUBMIT TEST
// ==========================================

async function submitTest(isAuto = false) {

    clearInterval(timerInterval);

    const student = JSON.parse(localStorage.getItem("student"));

    const urlParams = new URLSearchParams(window.location.search);

    const testId = urlParams.get("testId");

    if (!student) {

        alert("Student not found.");

        window.location.href = "login.html";

        return;

    }

    if (!isAuto) {

        const confirmSubmit = confirm(
            "Are you sure you want to submit the test?"
        );

        if (!confirmSubmit) {

            startTimer();

            return;

        }

    }

    try {

        console.log("Submitting Answers:", answers);

        const result = await apiCall("submitTest", {

            studentId: student.studentId,

            testId: testId,

            answers: answers

        });

        if (!result.success) {

            alert(result.message);

            return;

        }

        localStorage.setItem(
            "latestResult",
            JSON.stringify(result)
        );

        window.location.href = "result.html";

    }

    catch (err) {

        console.error(err);

        alert("Failed to submit test.");

    }

}

// ==========================================
// SUBMIT BUTTON
// ==========================================

function submitTestEarly() {

    submitTest(false);

}

// ==========================================
// START PAGE
// ==========================================

window.onload = function () {

    loadTest();

};
