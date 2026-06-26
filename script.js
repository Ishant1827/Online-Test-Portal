// script.js

const API_URL = "https://script.google.com/macros/s/AKfycbzNAZOLSluZvYU0G_fc_yszTUIA1O5bEQ2UtdzFjwK0pLojzhX1V2F8f2BK9c6j5sKFYg/exec";

async function apiCall(action, data = null) {

    try {

        const url = `${API_URL}?action=${action}`;

        const options = {
            method: data ? "POST" : "GET"
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        alert("Server Connection Failed");

        throw error;

    }

}

function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.padding = "15px 25px";
    toast.style.borderRadius = "8px";
    toast.style.color = "#fff";
    toast.style.zIndex = "9999";
    toast.style.background =
        type === "success" ? "#27ae60" : "#e74c3c";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}
