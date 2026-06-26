// js/instructions.js
let currentTest = null;

async function loadTestInfo() {
    const testId = localStorage.getItem('currentTestId');
    if (!testId) {
        window.location.href = "dashboard.html";
        return;
    }
    
    try {
        const response = await fetch(getWebAppUrl() + '?action=getTestInfo&testId=' + testId);
        const data = await response.json();
        
        if (data.test) {
            currentTest = data.test;
            document.getElementById('testTitle').textContent = currentTest.testName;
            document.getElementById('testInfo').innerHTML = `
                <p><strong>Duration:</strong> ${currentTest.duration} minutes</p>
                <p><strong>Total Questions:</strong> ${currentTest.totalQuestions}</p>
            `;
            document.getElementById('duration').textContent = currentTest.duration;
        }
    } catch (e) {
        console.error(e);
    }
}

function startTest() {
    if (!currentTest) return;
    window.location.href = `test.html?testId=${currentTest.testId}`;
}

function goBackToDashboard() {
    window.location.href = "dashboard.html";
}

window.onload = loadTestInfo;
