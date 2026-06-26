document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const mobile = document.getElementById('mobile').value.trim();
    const password = document.getElementById('password').value.trim();

    if (mobile.length !== 10) {
        alert("Please enter valid 10 digit mobile number");
        return;
    }

    try {
        const result = await apiCall('login', { mobile, password });
        
        if (result.success) {
            localStorage.setItem('student', JSON.stringify(result.student));
            alert("Login Successful!");
            window.location.href = "dashboard.html";
        } else {
            alert(result.message || "Invalid credentials");
        }
    } catch (err) {
        console.error(err);
    }
});
