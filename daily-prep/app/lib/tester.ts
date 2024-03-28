import axios from "axios";

async function calculateDistance() {
    const origin = "415 Niantic Ave, Daly City, CA 94014";
    const destination = "310 Arballo Drive";
    const apiKey = "niTMFb80yf7PvGir2qXKCYxtOVSZOxI2ZOFjMZPueZkfHRUpycz1RHlvaJomaROG";
    
    try {
        const URL = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
        const response = await axios.get(URL);
        console.log(URL);
        
        
        const distanceValue = Math.round((response.data.rows[0].elements[0].distance.value/1609.34) * 10) / 10;
        const durationValue = Math.round(response.data.rows[0].elements[0].duration.value/60);
        
        const distanceResponse = `${distanceValue} miles`;
        const durationResponse = `${durationValue} minutes`;

        console.log(distanceResponse);
        console.log(durationResponse);
    } catch (error) {
        console.log("error calc distance", error);
        
    }
}
calculateDistance();