document.addEventListener("DOMContentLoaded",(function(){document.getElementById("travelButton").addEventListener("click",(function(){var e=document.getElementById("destinationInput").value,t=document.getElementById("originInput").value,n=document.getElementById("numberOfPeople").value,a=document.getElementById("startDate").value,l=document.getElementById("endDate").value;e&&t&&n&&a&&l?function(e,t){var n=new Date(e),a=new Date(t);return n<=a&&!isNaN(n.getTime())&&!isNaN(a.getTime())}(a,l)?alert(`Destination: ${e}, Origin: ${t}, Number of People: ${n}, Date Range: ${a} to ${l}`):alert("Enter a valid date range."):alert("Please fill in all the fields.")}))}));