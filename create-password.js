document.getElementById('createPasswordForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const mobile = document.getElementById('mobile').value.trim();
    const name = document.getElementById('name').value.trim();
    const domain = document.getElementById('domain').value;
    const password = document.getElementById('password').value;

    if (mobile.length !== 10) {
        alert("Please enter valid 10-digit mobile number");
        return;
    }

    try {
        const result = await apiCall('createPassword', { mobile, name, domain, password });
        showToast("Password created successfully!", "success");
        setTimeout(() => window.location.href = "login.html", 1500);
    } catch (err) {
        console.error(err);
    }
});
