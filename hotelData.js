document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('travelButton').addEventListener('click', getRegionData);
    // Wrap the call to toggleSafetyInformation in an anonymous function
    // document.getElementById('travelButton').addEventListener('click', function() {
    //     toggleSafetyInformation(true);
    // });
});

const { getCode, getName } = require('country-list');

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
    "North Korea":"Korea, Republic of",
    "Congo":"Congo, Democratic Republic of the"
  };

  const mappedCountryName = mappings[countryName] || countryName;
  return getCode(mappedCountryName);
}

async function getRegionData() {

    // other fields
    var numberOfPeople = document.getElementById('numberOfPeople').value
    var startDate = document.getElementById('startDate').value
    var endDate = document.getElementById('endDate').value

    // destination related
    var destination = document.getElementById('destinationInput').value;
    const encodedDestination = encodeURIComponent(destination); // Encode the destination
    var parts = destination.split(',');
    var country = parts[parts.length - 1].trim();
    const countryCode = getCountryCode(country); // This needs to be a country name
    const url = `https://hotels-com-provider.p.rapidapi.com/v2/regions?query=${encodedDestination}&domain=${countryCode}&locale=en_US`;
    console.log("Country: "+encodedDestination+", Domain: "+ countryCode);
    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '89c62d8c41msh5372104939cc961p11f676jsn4c3fbb44aa5b',
        'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
      }
    };
  
    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse the response to JSON
        const gaiaId = result.data[0].gaiaId; // Access the gaiaId of the first item in the data array
        console.log("gaiaId: "+gaiaId); // Do something with the gaiaId, like storing it or using it in another request
        searchHotels(gaiaId, countryCode);    
    } catch (error) {
      console.error(error);
    }
  }

// Helper function to format date from "Mon Feb 26 2024" to "2024-02-26"
function formatDate(dateString) {
    const months = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
        Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };

    const parts = dateString.split(' ');
    const year = parts[3];
    const month = months[parts[1]];
    const day = parts[2].length === 1 ? `0${parts[2]}` : parts[2]; // Add leading zero if day is a single digit

    return `${year}-${month}-${day}`;
}

async function searchHotels(gaiaId, countryCode) {
    const numberOfPeople = document.getElementById('numberOfPeople').value;
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;

    // Reformat the dates
    startDate = formatDate(startDate);
    endDate = formatDate(endDate);

    // Log the values to the console to check
    console.log("Number of People:", numberOfPeople);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    const url = `https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?region_id=${gaiaId}&locale=en_US&checkin_date=${startDate}&sort_order=RECOMMENDED&adults_number=${numberOfPeople}&domain=${countryCode}&checkout_date=${endDate}&lodging_type=HOTEL%2CHOSTEL%2CAPART_HOTEL&price_min=10`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '89c62d8c41msh5372104939cc961p11f676jsn4c3fbb44aa5b',
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Assuming the response is in JSON format

        // Extract and log the first 6 properties information
        displayFirstSixProperties(result);

        console.log("Hotel Search Result:", result); // Log the result to check
    } catch (error) {
        console.error("Error fetching hotel data:", error);
    }
}


function displayFirstSixProperties(data) {
    // Assuming 'data' contains the hotel properties array
    const properties = data.properties;
    const hotelsRow = document.getElementById('hotels-row');
    hotelsRow.innerHTML = ''; // Clear the row first

    // Iterate over the properties and extract the needed information
    for (let i = 0; i < properties.length && i < 6; i++) {
        const property = properties[i];
        const name = property.name;
        const priceFormatted = property.price.lead.formatted; // Assuming we want the lead price
        const imageUrl = property.propertyImage.image.url; // Assuming we want the 'image' URL not the 'fallbackImage'

        // Use the createHotelCard function to create the HTML for the hotel card
        const hotelCardHTML = createHotelCard({
            name,
            imageUrl,
            price: priceFormatted
        });

        // Append the new card to the hotels row
        hotelsRow.innerHTML += hotelCardHTML;
    }
}

// Function to create a hotel card
function createHotelCard(hotel) {
    return `
      <div class="col-md-4 mb-3">
        <div class="card">
          <img src="${hotel.imageUrl}" class="card-img-top hotel-image" alt="${hotel.name}" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${hotel.name}</h5>
            <p class="card-text">
              <button type="button" class="btn btn-secondary">${hotel.price}</button> per night
            </p>
          </div>
        </div>
      </div>
    `;
  }
  
  
  