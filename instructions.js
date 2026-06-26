let currentTest = null;

async function loadTestInfo() {
    const testId = localStorage.getItem('currentTestId');
    if (!testId) {
        window.location.href = "dashboard.html";
        return;
    }

    try {
        const result = await apiCall(`getQuestions&testId=${testId}`);  // Note: You may need to update backend
        currentTest = {
    testId: testId,
    testName: result.testName,
    duration: result.duration
};
        
        document.getElementById('testTitle').textContent = currentTest.testName;
        document.getElementById('duration').textContent = currentTest.duration;
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
