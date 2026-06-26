// js/result.js
async function loadResult() {
    const resultData = localStorage.getItem('latestResult');
    if (!resultData) {
        window.location.href = "dashboard.html";
        return;
    }
    
    const result = JSON.parse(resultData);
    
    document.getElementById('scorePercentage').textContent = Math.round(result.percentage);
    
    document.getElementById('correctCount').textContent = result.correct;
    document.getElementById('wrongCount').textContent = result.wrong;
    document.getElementById('unansweredCount').textContent = result.unanswered;
    document.getElementById('finalScore').textContent = `${result.score} / ${result.total}`;
    
    const passFailEl = document.getElementById('passFail');
    if (result.passed) {
        passFailEl.textContent = "🎉 PASSED";
        passFailEl.className = "pass-fail pass";
    } else {
        passFailEl.textContent = "❌ FAILED";
        passFailEl.className = "pass-fail fail";
    }
    
    document.getElementById('resultSummary').innerHTML = `
        <h3>${result.testName}</h3>
        <p>Completed on: ${new Date().toLocaleDateString()}</p>
    `;
}

function goToDashboard() {
    window.location.href = "dashboard.html";
}

window.onload = loadResult;
