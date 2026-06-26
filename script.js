// script.js
const API_URL = "https://script.google.com/macros/s/AKfycbx902dxPb8UArLo8XgNJAmjjdn9aVKq6neOeqiAnxgRcA6lJXgB32A_adQ2_Pa4HX79nQ/exec";

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
        alert("Failed to fetch data!\n\nInternet check karo ya Web App deployment check karo.");
        throw error;
    }
}
