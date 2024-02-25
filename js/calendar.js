document.addEventListener("DOMContentLoaded", function() {
    // Populate the number of people dropdown
    const numberOfPeopleSelect = document.getElementById('numberOfPeople');
    for (let i = 1; i <= 15; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i + (i === 1 ? ' person' : ' people');
        numberOfPeopleSelect.appendChild(option);
    }

    // Initialize the date pickers
    const startDatePicker = new Pikaday({ field: document.getElementById('startDate') });
    const endDatePicker = new Pikaday({ field: document.getElementById('endDate') });
});
