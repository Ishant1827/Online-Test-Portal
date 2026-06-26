// js/dashboard.js
let currentStudent = null;

async function loadDashboard() {
    const stored = localStorage.getItem('student');
    if (!stored) {
        window.location.href = "login.html";
        return;
    }
    
    currentStudent = JSON.parse(stored);
    document.getElementById('studentName').textContent = currentStudent.name;
    document.getElementById('welcomeName').textContent = currentStudent.name.split(" ")[0];
    
    await loadAvailableTests();
}

async function loadAvailableTests() {
    try {
        const response = await fetch(getWebAppUrl() + '?action=getTests&domain=' + encodeURIComponent(currentStudent.domain));
        const data = await response.json();
        
        const container = document.getElementById('testsList');
        container.innerHTML = '';
        
        if (data.tests && data.tests.length > 0) {
            data.tests.forEach(test => {
                const card = document.createElement('div');
                card.className = 'test-card';
                card.innerHTML = `
                    <h3>${test.testName}</h3>
                    <p><strong>Duration:</strong> ${test.duration} minutes</p>
                    <button onclick="startTestInstructions(${test.testId})" class="btn primary">Start Test</button>
                `;
                container.appendChild(card);
            });
        } else {
            container.innerHTML = '<p>No tests available for your domain yet.</p>';
        }
    } catch (e) {
        console.error(e);
    }
}

function startTestInstructions(testId) {
    localStorage.setItem('currentTestId', testId);
    window.location.href = "instructions.html";
}

function logout() {
    localStorage.removeItem('student');
    window.location.href = "index.html";
}

function showChangePassword() {
    document.getElementById('changePasswordModal').style.display = 'flex';
}

function hideChangePasswordModal() {
    document.getElementById('changePasswordModal').style.display = 'none';
}

document.getElementById('changePasswordForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const currentPass = document.getElementById('currentPass').value;
    const newPass = document.getElementById('newPass').value;
    
    try {
        const response = await fetch(getWebAppUrl() + '?action=changePassword', {
            method: 'POST',
            body: JSON.stringify({
                mobile: currentStudent.mobile,
                currentPass,
                newPass
            })
        });
        
        const data = await response.json();
        if (data.success) {
            alert("Password updated successfully!");
            hideChangePasswordModal();
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Failed to update password");
    }
});

window.onload = loadDashboard;
