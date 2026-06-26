let questions = [];
let currentQuestionIndex = 0;
let answers = {};
let timerInterval;
let timeLeft = 1800; // 30 minutes default

async function loadTest() {
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('testId');

    if (!testId) {
        alert("Test ID not found!");
        window.location.href = "dashboard.html";
        return;
    }

try {

    const result = await apiCall(`getQuestions&testId=${encodeURIComponent(testId)}`);

    console.log("API Result:", result);
    console.log("Questions:", result.questions);

    questions = result.questions || [];

    console.log("First Question:", questions[0]);

    document.getElementById("testNameHeader").textContent =
        result.testName || "Online Test";

    if (questions.length === 0) {
        alert("No questions found in this test.");
        window.location.href = "dashboard.html";
        return;
    }

    timeLeft = (result.duration || 30) * 60;

    startTimer();
    renderQuestion();
    renderQuestionDots();

} catch (err) {

    console.error(err);

}
}

function startTimer() {
    const timerEl = document.getElementById('timer');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        const min = Math.floor(timeLeft / 60);
        const sec = timeLeft % 60;
        timerEl.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

        if (timeLeft <= 300) timerEl.style.background = "#f39c12"; // Orange warning

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest(true);
        }
    }, 1000);
}

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    console.log(questions[currentQuestionIndex]);
    if (!q) return;

    document.getElementById('questionNumber').textContent = 
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    document.getElementById('questionText').textContent = q.questionText;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = `
        <label><input type="radio" name="answer" value="A" ${answers[q.questionId] === 'A' ? 'checked' : ''}> ${q.optionA}</label><br><br>
        <label><input type="radio" name="answer" value="B" ${answers[q.questionId] === 'B' ? 'checked' : ''}> ${q.optionB}</label><br><br>
        <label><input type="radio" name="answer" value="C" ${answers[q.questionId] === 'C' ? 'checked' : ''}> ${q.optionC}</label><br><br>
        <label><input type="radio" name="answer" value="D" ${answers[q.questionId] === 'D' ? 'checked' : ''}> ${q.optionD}</label>
    `;

    // Save answer on change
    optionsDiv.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
            answers[q.questionId] = input.value;
            renderQuestionDots();
        });
    });

    renderQuestionDots();
}

function renderQuestionDots() {
    const container = document.getElementById('questionDots');
    container.innerHTML = '';

    questions.forEach((q, i) => {
        const dot = document.createElement('div');
        dot.className = `dot ${answers[q.questionId] ? 'answered' : ''} ${i === currentQuestionIndex ? 'current' : ''}`;
        dot.textContent = i + 1;
        dot.onclick = () => {
            currentQuestionIndex = i;
            renderQuestion();
        };
        container.appendChild(dot);
    });
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

async function submitTest(isAuto = false) {
    clearInterval(timerInterval);
    
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('testId');
    const student = JSON.parse(localStorage.getItem('student'));

    if (!student) return;

    try {
        const result = await apiCall('submitTest', {
            studentId: student.studentId,
            testId: testId,
            answers: answers
        });

        localStorage.setItem('latestResult', JSON.stringify(result));
        window.location.href = "result.html";
    } catch (err) {
        console.error(err);
    }
}

function submitTestEarly() {
    if (confirm("Are you sure you want to submit the test now?")) {
        submitTest();
    }
}

window.onload = loadTest;
