document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const mobile = document.getElementById('mobile').value.trim();
    const password = document.getElementById('password').value;

    try {
        const result = await apiCall('login', { mobile, password });
        
        if (result.success) {
            localStorage.setItem('student', JSON.stringify(result.student));
            showToast("Login Successful!", "success");
            window.location.href = "dashboard.html";
        }
    } catch (err) {
        console.error(err);
    }
});
