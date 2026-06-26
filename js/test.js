// js/test.js
let questions = [];
let currentQuestionIndex = 0;
let answers = {};
let timerInterval;
let timeLeft;

async function loadTest() {
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('testId');
    
    if (!testId) {
        window.location.href = "dashboard.html";
        return;
    }
    
    try {
        const response = await fetch(getWebAppUrl() + '?action=getQuestions&testId=' + testId);
        const data = await response.json();
        
        questions = data.questions || [];
        
        if (questions.length === 0) {
            alert("No questions found for this test.");
            window.location.href = "dashboard.html";
            return;
        }
        
        document.getElementById('testNameHeader').textContent = data.testName || "Online Test";
        
        timeLeft = (data.duration || 30) * 60;
        startTimer();
        renderQuestion();
        renderQuestionDots();
    } catch (e) {
        console.error(e);
        alert("Failed to load test");
    }
}

function startTimer() {
    const timerEl = document.getElementById('timer');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 300) {
            timerEl.style.background = '#f39c12';
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest(true);
        }
    }, 1000);
}

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    if (!q) return;
    
    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    document.getElementById('questionText').textContent = q.questionText;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = `
        <label><input type="radio" name="answer" value="A" ${answers[q.questionId] === 'A' ? 'checked' : ''}> ${q.optionA}</label>
        <label><input type="radio" name="answer" value="B" ${answers[q.questionId] === 'B' ? 'checked' : ''}> ${q.optionB}</label>
        <label><input type="radio" name="answer" value="C" ${answers[q.questionId] === 'C' ? 'checked' : ''}> ${q.optionC}</label>
        <label><input type="radio" name="answer" value="D" ${answers[q.questionId] === 'D' ? 'checked' : ''}> ${q.optionD}</label>
    `;
    
    // Add change listener
    const radios = optionsContainer.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            answers[q.questionId] = radio.value;
            renderQuestionDots();
        });
    });
    
    renderQuestionDots();
}

function renderQuestionDots() {
    const container = document.getElementById('questionDots');
    container.innerHTML = '';
    
    questions.forEach((q, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${answers[q.questionId] ? 'answered' : ''} ${index === currentQuestionIndex ? 'current' : ''}`;
        dot.textContent = index + 1;
        dot.onclick = () => {
            currentQuestionIndex = index;
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
        const response = await fetch(getWebAppUrl() + '?action=submitTest', {
            method: 'POST',
            body: JSON.stringify({
                studentId: student.studentId,
                testId: parseInt(testId),
                answers: answers
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            localStorage.setItem('latestResult', JSON.stringify(result));
            window.location.href = "result.html";
        } else {
            alert(result.message || "Failed to submit test");
        }
    } catch (err) {
        alert("Submission failed");
    }
}

function submitTestEarly() {
    if (confirm("Are you sure you want to submit the test now?")) {
        submitTest();
    }
}

window.onload = loadTest;
