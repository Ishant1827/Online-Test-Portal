async function loadResult() {
    const resultData = localStorage.getItem('latestResult');
    if (!resultData) {
        window.location.href = "dashboard.html";
        return;
    }

    const result = JSON.parse(resultData);

    document.getElementById('scorePercentage').textContent = Math.round(result.percentage || 0);
    document.getElementById('correctCount').textContent = result.correct || 0;
    document.getElementById('wrongCount').textContent = result.wrong || 0;
    document.getElementById('unansweredCount').textContent = result.unanswered || 0;
    document.getElementById('finalScore').textContent = `${result.score || 0} / 100`;

    const passFail = document.getElementById('passFail');
    if (result.passed || (result.percentage || 0) >= 40) {
        passFail.textContent = "🎉 PASSED";
        passFail.className = "pass-fail pass";
    } else {
        passFail.textContent = "❌ FAILED";
        passFail.className = "pass-fail fail";
    }

    document.getElementById('resultSummary').innerHTML = `
        <h3>${result.testName || "Test"}</h3>
        <p>Completed on: ${new Date().toLocaleDateString()}</p>
    `;
}

function goToDashboard() {
    window.location.href = "dashboard.html";
}

window.onload = loadResult;
