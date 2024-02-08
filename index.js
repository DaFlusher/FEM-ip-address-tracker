//dom elements
const input = document.getElementById('input-ip');
const submit = document.getElementById('submit-ip');
const ip = document.getElementById('ip');
const loc = document.getElementById('location');
const time = document.getElementById('timezone');
const isp = document.getElementById('isp');
const errorMessage = document.getElementById('error');

//saving the geolocation api
const apiKey = 'at_U4n5Sxyp9RqMf0MaWKUrykOPH0LzZ';
const url = 'https://ipapi.co/';

let responseIp;

// Leaflet JS Code
let map; // Declare map variable outside event listener

// Function to initialize the map with default coordinates
function initializeMap(latitude, longitude) {
    map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const marker = L.marker([latitude, longitude]).addTo(map);
}


//Function to fetch data and retrieve map
const fetchIP = async(event)=>{
    event.preventDefault();
    const ipQuery = input.value;
    const endpoint = `${url}${ipQuery}/json`;
    try{
        const response = await fetch(endpoint);
        if(response.ok){
            responseIp = await response.json();
            showIp(responseIp);
        
        }
        else{
            const errorResponse = await response.json();
            errorMessage.innerText = 'OOP! Could not fetch the IP';
            
        }

         // Update the map with the obtained latitude and longitude values
         const latitude = responseIp.latitude;
         const longitude = responseIp.longitude;
         if (!map) {
             // If map is not initialized yet, initialize it with default coordinates
             initializeMap(latitude, longitude);
         } else {
             // If map is already initialized, set the new view
             map.setView([latitude, longitude], 13);
         }
    }
    catch(error){
            console.log(error.message);
            errorMessage.innerText = 'OOPS! Could not fetch the IP';
    }

    
}
submit.addEventListener('click', fetchIP);

//displaying geolocation data
const showIp = (data)=>{
    
    // ip.innerHTML = ipText;
    // loc.innerHTML = locationText;
    // time.innerHTML = timeText;
    // isp.innerHTML = ispText;
    ip.textContent = data.ip;
    loc.textContent = `${data.region}, ${data.country_code}`;
    time.textContent = data.timezone;
    isp.textContent = data.org;
}


// Event listener for Enter key press on the input field
input.addEventListener('keypress', (event) => {
    // Check if the Enter key was pressed (key code 13)
    if (event.key === 'Enter') {
        event.preventDefault();
        // submit the form
        submit.click();
    }
});

//fetching current users IP on initial load
window.addEventListener('load',fetchIP)