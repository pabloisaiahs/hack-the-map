document.addEventListener('DOMContentLoaded', function () {
  // Function to check inputs and provide an alert
  function checkInputsAndAlert() {
    var destination = document.getElementById('destinationInput').value;
    var origin = document.getElementById('originInput').value;
    var numberOfPeople = document.getElementById('numberOfPeople').value;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;

    // Check if all fields are filled
    if (!destination || !origin || !numberOfPeople || !startDate || !endDate) {
      alert('Please fill in all the fields.');
      return; // Stop the function if any field is empty
    }

    // Check if the date range is valid
    if (!isValidDateRange(startDate, endDate)) {
      alert('Enter a valid date range.');
      return; // Stop the function if the date range is invalid
    }

    // If all fields are filled and the date range is valid, alert the user with the information
    // alert(`Destination: ${destination}, Origin: ${origin}, Number of People: ${numberOfPeople}, Date Range: ${startDate} to ${endDate}`);
  }

  // Function to check if the date range is valid
  function isValidDateRange(start, end) {
    var startDate = new Date(start);
    var endDate = new Date(end);
    return startDate <= endDate && !isNaN(startDate.getTime()) && !isNaN(endDate.getTime());
  }

  // Get the button and add the click event listener
  var travelButton = document.getElementById('travelButton');
  travelButton.addEventListener('click', checkInputsAndAlert);
});
