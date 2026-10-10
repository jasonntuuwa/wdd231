// Read the form data from the URL
const params = new URLSearchParams(window.location.search);
const summary = document.querySelector("#booking-summary");

// Readable labels for the select values
const services = {
    "custom-beat": "Custom Beat Production",
    "mixing": "Mixing",
    "mastering": "Mastering",
    "recording": "Recording Session"
};

const fields = [
    ["Name", `${params.get("first-name") ?? ""} ${params.get("last-name") ?? ""}`.trim()],
    ["Email", params.get("email")],
    ["Phone", params.get("phone") || "Not provided"],
    ["Service", services[params.get("service")]],
    ["Preferred Date", params.get("session-date")],
    ["Project Details", params.get("details")],
    ["Studio Updates", params.get("updates") ? "Yes" : "No"]
];

if (!params.get("email")) {
    summary.innerHTML = "<p>No booking data found. Please <a href=\"contact.html\">submit the form</a>.</p>";
} else {
    fields.forEach(([label, value]) => {
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = label;
        dd.textContent = value; // textContent keeps user input from running as HTML
        summary.append(dt, dd);
    });
}