// js/admin.js
let currentAdmin = null;

const https://script.google.com/macros/s/AKfycbyml1-OMcWE8Dj-MN8PvPq5uzEykjY-S_mKvRbMe8QnSyE0VRQTGpUZPNnUApvKDQypMg/exec = getWebAppUrl();

function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    fetch(WEB_APP_URL + '?action=adminLogin', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            currentAdmin = data.admin;
            document.getElementById('adminLoginForm').classList.add('hidden');
            document.getElementById('adminDashboard').classList.remove('hidden');
            loadStudents();
            loadTests();
            loadTestSelect();
        } else {
            alert("Invalid admin credentials");
        }
    });
}

async function loadStudents() {
    const res = await fetch(WEB_APP_URL + '?action=getStudents');
    const data = await res.json();
    renderTable('studentsTable', data.students || [], ['studentId', 'name', 'mobile', 'domain']);
}

async function loadTests() {
    const res = await fetch(WEB_APP_URL + '?action=getAllTests');
    const data = await res.json();
    renderTable('testsTable', data.tests || [], ['testId', 'testName', 'domain', 'duration']);
}

async function loadTestSelect() {
    const res = await fetch(WEB_APP_URL + '?action=getAllTests');
    const data = await res.json();
    const select = document.getElementById('testSelectForQuestions');
    select.innerHTML = '<option value="">Select Test</option>';
    data.tests.forEach(test => {
        const opt = document.createElement('option');
        opt.value = test.testId;
        opt.textContent = test.testName;
        select.appendChild(opt);
    });
}

async function loadQuestionsForTest() {
    const testId = document.getElementById('testSelectForQuestions').value;
    if (!testId) return;
    
    const res = await fetch(WEB_APP_URL + '?action=getQuestions&testId=' + testId);
    const data = await res.json();
    renderTable('questionsTable', data.questions || [], ['questionId', 'questionText']);
}

function renderTable(tableId, rows, columns) {
    let html = `<tr><th>#</th>`;
    columns.forEach(col => html += `<th>${col}</th>`);
    html += `<th>Actions</th></tr>`;
    
    rows.forEach((row, i) => {
        html += `<tr>`;
        html += `<td>${i+1}</td>`;
        columns.forEach(col => {
            html += `<td>${row[col] || ''}</td>`;
        });
        html += `<td><button onclick="deleteRecord('${tableId}', ${row.id || row.studentId || row.testId || row.questionId})" class="btn danger small">Delete</button></td>`;
        html += `</tr>`;
    });
    
    document.getElementById(tableId).innerHTML = html;
}

// Placeholder modal functions - extend as needed
function showAddStudentModal() { alert("Add Student functionality can be extended in full implementation."); }
function showAddTestModal() { alert("Add Test functionality can be extended in full implementation."); }
function showAddQuestionModal() { alert("Add Question functionality can be extended in full implementation."); }

function deleteRecord(table, id) {
    if (confirm("Delete this record?")) {
        alert("Delete operation for " + table + " ID: " + id + " (extend backend accordingly).");
    }
}

function showTab(n) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.getElementById('tab' + n).classList.remove('hidden');
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-btn')[n].classList.add('active');
}
