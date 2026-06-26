// js/create-password.js
document.getElementById('createPasswordForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const mobile = document.getElementById('mobile').value.trim();
    const name = document.getElementById('name').value.trim();
    const domain = document.getElementById('domain').value;
    const password = document.getElementById('password').value;
    
    if (mobile.length !== 10) {
        alert("Please enter a valid 10-digit mobile number");
        return;
    }
    
    try {
        const response = await fetch(getWebAppUrl() + '?action=createPassword', {
            method: 'POST',
            body: JSON.stringify({ mobile, name, domain, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert("Password created successfully! Please login.");
            window.location.href = "login.html";
        } else {
            alert(data.message || "Failed to create password");
        }
    } catch (err) {
        console.error(err);
        alert("Error connecting to server");
    }
});
