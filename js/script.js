// js/script.js
// Common utilities
function getWebAppUrl() {
    // Replace with your actual deployed Google Apps Script Web App URL
    return "https://script.google.com/macros/s/AKfycbyml1-OMcWE8Dj-MN8PvPq5uzEykjY-S_mKvRbMe8QnSyE0VRQTGpUZPNnUApvKDQypMg/exec";
}

function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "8px";
    toast.style.color = "white";
    toast.style.background = type === "success" ? "#27ae60" : "#e74c3c";
    toast.style.zIndex = "9999";
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
}
