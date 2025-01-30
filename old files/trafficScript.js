document.getElementById("submitAddresses").addEventListener("click", async () => {
    let origin = document.getElementById("origin").value;
    let destination = document.getElementById("destination").value;
    let mode = document.getElementById("transportationMode").value;
    let avoid = document.getElementById("restriction").value;
    let url = `http://127.0.0.1:3000/traffic?origin=${origin}&destination=${destination}&mode=${mode}&avoid${avoid}`;
    
    let displayResponse = document.getElementById("displayResponse");
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
  
      let distance = data.distance;
      let duration = data.duration;
  
      let trafficResponse = `${distance} miles, ${duration} minutes if ${mode}`;
  
      let displayResponseParagraph1 = document.createElement("p");
      displayResponseParagraph1.textContent = trafficResponse;
      displayResponse.append(displayResponseParagraph1);
    } catch (error) {
      console.log(error);
    }
  });
  