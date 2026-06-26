// script.js
const API_URL = "https://script.google.com/macros/s/AKfycbzR3VWJTDfeU30zzPNTC4oTSE9U1wRtIWrqy-bSWNohuMztt9w8nwMdf1HgAUm3q83wuA/exec";

async function apiCall(action, data = null) {
    try {
        let url = `${API_URL}?action=${action}`;
        
        const options = {
            method: data ? 'POST' : 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error("Fetch Error:", error);
        alert("Failed to connect to server. Please check your internet and Web App deployment.");
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
    toast.style.background = type === "success" ? "#27ae60" : "#e74c3c";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
