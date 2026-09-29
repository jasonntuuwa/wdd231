
const params = new URLSearchParams(window.location.search);


const fields = ['firstName', 'lastName', 'email', 'phone', 'orgName'];

fields.forEach((name) => {
    const output = document.getElementById(`out-${name}`);
    output.textContent = params.get(name) || 'Not provided'; 
});


const timestamp = params.get('timestamp');
const timeOutput = document.getElementById('out-timestamp');

timeOutput.textContent = timestamp
    ? new Date(timestamp).toLocaleString() 
    : 'Not provided';