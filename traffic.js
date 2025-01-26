require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3000;
const APIKey = process.env.DISTANCEMATRIX_KEY;

app.get("/traffic", async (req, res) => {
  //   let origin = req.query.origin;
  //   let destination = req.query.destination;
  //   let mode = req.query.mode
  //   let restriction = req.query.restriction

  let { origin, destination, mode, avoid } = req.query;

  console.log(origin);
  console.log(destination);
  console.log(mode);
  console.log(avoid);

  let APIurl = ``;

  if (avoid == "none") {
    APIurl = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&key=${APIKey}`;
  } else {
    APIurl = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&avoid=${avoid}&key=${APIKey}`;
  }

  try {
    const response = await axios.get(APIurl);
    let traffic = response.data;

    let distanceResponse = traffic.rows[0].elements[0].distance.value;
    let distance = distanceResponse / 1609.344;

    let durationResponse = traffic.rows[0].elements[0].duration.value;
    let duration = Math.round(durationResponse / 60);

    console.log(distance, duration);

    res.json({ distance, duration });
    // res.json(traffic)
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Started on port", PORT);
});
