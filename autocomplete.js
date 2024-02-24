document.addEventListener("DOMContentLoaded", function() {
    let currentFocus;

    // Function to handle the display of suggestions
    function displaySuggestions(suggestionsDiv, features, inputElement) {
        suggestionsDiv.innerHTML = '';
        let addedSuggestions = new Set();

        features.forEach(feature => {
            const name = feature.properties.name;
            const state = feature.properties.state || '';
            const country = feature.properties.country;
            const suggestionString = `${name}${state ? ', ' + state : ''}, ${country}`;

            if (!addedSuggestions.has(suggestionString)) {
                addedSuggestions.add(suggestionString);
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = suggestionString;
                suggestionItem.addEventListener('click', function() {
                    inputElement.value = suggestionItem.textContent;
                    suggestionsDiv.innerHTML = '';
                    suggestionsDiv.style.display = 'none'; // Hide the suggestion list
                });

                suggestionsDiv.appendChild(suggestionItem);
            }
        });

        if (features.length > 0) {
            suggestionsDiv.style.display = 'block';
        } else {
            suggestionsDiv.style.display = 'none';
        }
    }

    // Function to handle fetching suggestions from the API
    function fetchSuggestions(inputElement, suggestionsDiv, apiUrl) {
        const searchText = inputElement.value;

        if (searchText.length >= 2) {
            fetch(`${apiUrl}?q=${encodeURIComponent(searchText)}`)
                .then(response => response.json())
                .then(data => {
                    displaySuggestions(suggestionsDiv, data.features, inputElement);
                })
                .catch(error => console.error('Error fetching suggestions:', error));
        } else {
            suggestionsDiv.innerHTML = '';
            suggestionsDiv.style.display = 'none'; // Hide the suggestion list
        }
    }

    // Event listener for the destination input
    document.getElementById('destinationInput').addEventListener('input', function() {
        fetchSuggestions(this, document.getElementById('destinationSuggestions'), 'https://photon.komoot.io/api/');
    });

    // Event listener for the origin input
    document.getElementById('originInput').addEventListener('input', function() {
        fetchSuggestions(this, document.getElementById('originSuggestions'), 'https://photon.komoot.io/api/');
    });
});
