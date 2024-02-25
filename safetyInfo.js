document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('travelButton').addEventListener('click', showSafetyInfo);
});

// Import the country-list package
const { getCode } = require('country-list');

function showSafetyInfo() {
    
    // Get the destination value from the input
    var destination = document.getElementById('destinationInput').value;

    // Update the destination in the safety information section
    document.getElementById('safetyDestination').textContent = destination;

    // Assuming you have a function that fetches safety information
    fetchSafetyInfo(destination).then(info => {
        // Update the safety information content
        document.getElementById('safetyContent').innerHTML = info;
        
        // Make the safety information section visible
        document.getElementById('safetyInformation').style.display = 'block';
    }).catch(error => {
        console.error('Error fetching safety information:', error);
    });
}

// Function to fetch safety information
function fetchSafetyInfo(destination) {
    

    var destinationCode = getCode(destination);
    if (!destinationCode) {
        console.error('Invalid country name:', destination);
        return;
    }
    // Ensure the country code is in uppercase since the API uses uppercase codes
    destinationCode = destinationCode.toUpperCase();
    // destinationCode = 'US';

    

    return fetch(`https://www.travel-advisory.info/api?countrycode=${destinationCode}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Access the advisory property using the country code
            const advisory = data.data[destinationCode].advisory;
            return `
                <h2>Travel Advisory</h2>
                <p>Score: ${advisory.score}</p>
                <p>Message: ${advisory.message}</p>
                <p>Updated: ${advisory.updated}</p>
                <p><a href="${advisory.source}" target="_blank">Read more</a></p>
            `;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            return 'Failed to load safety information.';
        });
}
