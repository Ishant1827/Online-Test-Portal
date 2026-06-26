// js/login.js
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const mobile = document.getElementById('mobile').value.trim();
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(getWebAppUrl() + '?action=login', {
            method: 'POST',
            body: JSON.stringify({ mobile, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('student', JSON.stringify(data.student));
            window.location.href = "dashboard.html";
        } else {
            alert(data.message || "Invalid credentials");
        }
    } catch (err) {
        alert("Login failed. Please try again.");
    }
});
