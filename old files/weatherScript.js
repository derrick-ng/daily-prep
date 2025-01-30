document.getElementById("submitCityName").addEventListener("click", async () => {
    let cityName = document.getElementById("cityName").value;
    console.log(cityName);
  
    try {
      //i am sending a get request at http://127.0.0.1:3000/weather
      //?city=${cityName} is extra and 
      const response = await fetch(`http://127.0.0.1:3000/weather?city=${cityName}`);
      const data = await response.json();
      console.log(data);
  
      const displayDiv = document.createElement('div')
      displayDiv.innerHTML = `
        <p>${data.temp}</p>
        <div>
          <p>Min-Max temp</p>
          <p>${data.tempMin}-${data.tempMax}</p>
        </div>
      `
      document.body.appendChild(displayDiv)
    } catch (error) {
      console.log(error);
      
    }
  });
  