// Parses the query string, e.g. ?first=John&last=Doe&...
const params = new URLSearchParams(window.location.search);

// The empty div in thanks.html where the data will be shown
const results = document.querySelector('#results');

results.innerHTML = `
    <p>Appointment for ${params.get('first')} ${params.get('last')}</p>
    <p>Proxy ${params.get('ordinance')} on ${params.get('date')} at the ${params.get('location')} Temple</p>
    <p>Your phone: ${params.get('phone')}</p>
    <p>Your email: ${params.get('email')}</p>
`; // template literal: ${} inserts each value into the HTML