import axios from "axios";
import prisma from "../../prisma/client";


export const getTravelTime = async (id: number) => {
  const travelTimes: string[] = [];
  const apiKey = "niTMFb80yf7PvGir2qXKCYxtOVSZOxI2ZOFjMZPueZkfHRUpycz1RHlvaJomaROG";  //this should prob be hidden

  const AllAdditionalInfo = await prisma.additionalInfo.findMany({
    where: {
      authorId: id,
    }
  });
  const AdditionalInfoCount = await prisma.additionalInfo.count({
    where: {
      authorId: id,
    }
  });

  for (let i = 0; i < AdditionalInfoCount; i++) {
    let origin = AllAdditionalInfo[i].etaStart;
    let destination = AllAdditionalInfo[i].etaEnd;

    try {
      let URL = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
      let response = await axios.get(URL);

      //distance rounded to nearest decimal, duration rounded to whole number
      const distanceValue = Math.round((response.data.rows[0].elements[0].distance.value / 1609.34) * 10) / 10;
      const durationValue = Math.round(response.data.rows[0].elements[0].duration.value / 60);

      const travelTime = `${distanceValue} miles, ${durationValue} minutes`;

      travelTimes.push(travelTime);
    } catch (error) {
      //invalid addresses do not reach here, they return null or empty string
      //error occurs if user did not fill out additional info form
      console.log("could not get travel time", error);
    }
  }
  return travelTimes;
};