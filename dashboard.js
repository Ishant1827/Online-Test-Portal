let currentStudent = null;

async function loadDashboard() {
    const stored = localStorage.getItem('student');
    if (!stored) {
        window.location.href = "login.html";
        return;
    }

    currentStudent = JSON.parse(stored);
    document.getElementById('studentName').textContent = currentStudent.name;
    document.getElementById('welcomeName').textContent = currentStudent.name;

    await loadAvailableTests();
}

async function loadAvailableTests() {
    try {
        const result = await apiCall('getTests', null);
        const container = document.getElementById('testsList');
        container.innerHTML = '';

        if (result.tests && result.tests.length > 0) {
            result.tests.forEach(test => {
                const card = document.createElement('div');
                card.className = 'test-card';
                card.innerHTML = `
                    <h3>${test.testName}</h3>
                    <p>Duration: ${test.duration} minutes</p>
                    <button onclick="startTest('${test.testId}')" class="btn primary">
    Start Test
</button>
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

function startTest(testId) {
    localStorage.setItem('currentTestId', testId);
    window.location.href = "instructions.html";
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
        await apiCall('changePassword', {
            mobile: currentStudent.mobile,
            currentPass,
            newPass
        });
        showToast("Password changed successfully!", "success");
        hideChangePasswordModal();
    } catch (err) {}
});

window.onload = loadDashboard;
