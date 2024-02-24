document.addEventListener('DOMContentLoaded', function() {
    // Mock data for flights from Manassas to Hawaii
    const mockFlightsToDestination = [
        {
            airline: 'Pacific Air',
            departureTime: '08:00 AM',
            arrivalTime: '04:00 PM',
            price: '$550'
        },
        {
            airline: 'Island Hopper',
            departureTime: '09:30 AM',
            arrivalTime: '05:45 PM',
            price: '$600'
        }
    ];

    // Mock data for flights from Hawaii to Manassas
    const mockFlightsFromDestination = [
        {
            airline: 'Pacific Air',
            departureTime: '10:00 AM',
            arrivalTime: '06:00 PM',
            price: '$560'
        },
        {
            airline: 'Island Hopper',
            departureTime: '11:45 AM',
            arrivalTime: '07:50 PM',
            price: '$610'
        }
    ];

    // Function to create flight card HTML
    function createFlightCardHtml(flight) {
        return `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${flight.airline}</h5>
                        <p class="card-text">Departure: ${flight.departureTime}</p>
                        <p class="card-text">Arrival: ${flight.arrivalTime}</p>
                        <p class="card-text">Price: ${flight.price}</p>
                        <a href="#" class="btn btn-primary">Book this flight</a>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to display flights
    function displayFlights(toFlights, fromFlights) {
        const toFlightsContainer = document.querySelector('#flightsToDestination .row');
        const fromFlightsContainer = document.querySelector('#flightsFromDestination .row');

        // Clear previous results
        toFlightsContainer.innerHTML = '';
        fromFlightsContainer.innerHTML = '';

        // Insert mock flights to destination
        toFlights.forEach(flight => {
            toFlightsContainer.innerHTML += createFlightCardHtml(flight);
        });

        // Insert mock flights from destination
        fromFlights.forEach(flight => {
            fromFlightsContainer.innerHTML += createFlightCardHtml(flight);
        });

        // Show the flight sections
        document.getElementById('flightsToDestination').style.display = 'block';
        document.getElementById('flightsFromDestination').style.display = 'block';
    }

    // Trigger the flight search on button click
    document.getElementById('travelButton').addEventListener('click', function() {
        // For now, we assume the form is always valid
        displayFlights(mockFlightsToDestination, mockFlightsFromDestination);
    });
});
