import axios from "axios";
import prisma from "../../prisma/client";

//can be called in another file... main.ts?

//currently returns an array of travel times for all users, in the order of database the rows
    //this is going to cause a problem, array is essentially random
//might need to change functionality to return individual travel times, through ID as parameter




//check see if it works with export
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

  //hold all travel times in an array
  //failed attempts to get distance/duration will not be added to the array

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

      //console.log(travelTime);
      travelTimes.push(travelTime);
    } catch (error) {
      console.log("error calculating distance, prob invalid value (address)", error);
    }
  }
  return travelTimes;
};

// getTravelTime()
//     .then((travelTimes) => {
//         console.log("Travel Times: ", travelTimes);
//     })