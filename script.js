// script.js - Common utilities
const API_URL = "https://script.google.com/macros/s/AKfycbx1GZQu9f4NMM_suyGLKml40Ivns5Y1wx05mg38jG41lIOwe0M1kROPW9Kk4FxeE61rBA/exec";

async function apiCall(action, data = null) {
    try {
        let url = `${https://script.google.com/macros/s/AKfycbx1GZQu9f4NMM_suyGLKml40Ivns5Y1wx05mg38jG41lIOwe0M1kROPW9Kk4FxeE61rBA/exec}?action=${action}`;
        
        const options = {
            method: data ? 'POST' : 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success && result.message) {
            throw new Error(result.message);
        }
        
        return result;
        
    } catch (error) {
        console.error(`API Error (${action}):`, error);
        alert(error.message || "Something went wrong! Please try again.");
        throw error;
    }
}

function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.padding = "14px 24px";
    toast.style.borderRadius = "8px";
    toast.style.color = "white";
    toast.style.zIndex = "9999";
    toast.style.fontWeight = "500";
    toast.style.background = type === "success" ? "#27ae60" : "#e74c3c";
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3500);
}

function logout() {
    localStorage.removeItem('student');
    window.location.href = "index.html";
}
