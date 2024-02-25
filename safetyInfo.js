document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('travelButton').addEventListener('click', showSafetyInfo);
    // Wrap the call to toggleSafetyInformation in an anonymous function
    document.getElementById('travelButton').addEventListener('click', function() {
        toggleSafetyInformation(true);
    });
});


// Import the country-list package
const { getCode, getName } = require('country-list');

console.log(getName('IS')); // Iceland
console.log(getCode('Iceland')); // IS
console.log(getCode('Nowhere-to-be-found-land')); // undefined

console.log(getCountryCode('United States')); // Should log 'US'

function toggleSafetyInformation(show) {
    var safetyInfo = document.getElementById('safetyInformation-background');
    var safetyBackground = document.querySelector('.safetyInformation-background');
  
    if (show) {
      safetyInfo.style.display = 'block';
      safetyBackground.style.display = 'block'; // Show the background
    } else {
      safetyInfo.style.display = 'none';
      safetyBackground.style.display = 'none'; // Hide the background
    }
  }  

function getCountryCode(countryName) {
  const mappings = {
    "United States": "United States of America",
    "United Kingdom": "United Kingdom of Great Britain and Northern Ireland",
    "United Arab":"United Arab Emirates",
    "British Indian":"British Indian Ocean Territory",
    "Iran":"Iran, Islamic Republic of",
    "Venezuela":"Venezuela, Bolivarian Republic of",
    "British Virgin Islands":"Virgin Islands, British",
    "Taiwan":"Taiwan, Province of China",
    "Vietnam":"Viet Nam",
    "East Timor":"Timor-Leste",
    "South Korea":"Korea, Republic of",
    "North Korea":"Korea, Democratic People's Republic of",
    "Congo":"Congo, Democratic Republic of the"
  };

  const mappedCountryName = mappings[countryName] || countryName;
  return getCode(mappedCountryName);
}

function showSafetyInfo() {
    var destination = document.getElementById('destinationInput').value;

    var parts = destination.split(',');
    var country = parts[parts.length - 1].trim();
    document.getElementById('safetyDestination').textContent = country;

    fetchSafetyInfo(country).then(info => {
        document.getElementById('safetyContent').innerHTML = info;
        document.getElementById('safetyInformation').style.display = 'block';
    }).catch(error => {
        console.error('Error fetching safety information:', error);
    });
    
}

function fetchSafetyInfo(destination) {
    console.log("destination: "+destination);

    var destinationCode = getCountryCode(destination);
    console.log("destination code: "+destinationCode);

    if (!destinationCode) {
        console.error('Invalid country name:', destination);
        return Promise.resolve('Invalid country name provided.');
    }

    destinationCode = destinationCode.toUpperCase();

    return fetch(`https://www.travel-advisory.info/api?countrycode=${destinationCode}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const advisory = data.data[destinationCode].advisory;
            return `
                <h2>Travel Advisory</h2>
                <p>${advisory.message}</p>
                <p>Last updated: ${advisory.updated}</p>
                <a href="${advisory.source}" target="_blank" class="btn btn-light">Read more</a>
                `;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            return 'Failed to load safety information.';
        });
}
