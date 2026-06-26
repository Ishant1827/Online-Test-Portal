async function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    try {
        const result = await apiCall('adminLogin', { username, password });
        
        if (result.success) {
            document.getElementById('adminLoginForm').classList.add('hidden');
            document.getElementById('adminDashboard').classList.remove('hidden');
            // Load data
            loadStudents();
        }
    } catch (err) {}
}

async function loadStudents() {
    try {
        const result = await apiCall('getStudents');
        renderTable('studentsTable', result.students || []);
    } catch (e) {}
}

function renderTable(tableId, data) {
    let html = `<tr><th>ID</th><th>Name</th><th>Mobile</th><th>Domain</th></tr>`;
    data.forEach(item => {
        html += `<tr>
            <td>${item.studentId || ''}</td>
            <td>${item.name || ''}</td>
            <td>${item.mobile || ''}</td>
            <td>${item.domain || ''}</td>
        </tr>`;
    });
    document.getElementById(tableId).innerHTML = html;
}

function showTab(n) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.getElementById('tab' + n).classList.remove('hidden');
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-btn')[n].classList.add('active');
}

window.adminLogin = adminLogin;
window.showTab = showTab;
