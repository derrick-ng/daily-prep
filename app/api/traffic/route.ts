import axios from "axios";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = url.searchParams.get("origin");
  const destination = url.searchParams.get("destination");
  const mode = url.searchParams.get("mode");
  const avoid = url.searchParams.get("avoid");

  const apiKey = process.env.DISTANCEMATRIX_KEY;

  let APIurl = ``;

  //   if (avoid == "none") {
  //     APIurl = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&key=${apiKey}`;
  //   } else {
  //     APIurl = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&avoid=${avoid}&key=${apiKey}`;
  //   }

  if (avoid && avoid !== "none") {
    APIurl = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&avoid=${avoid}&key=${apiKey}`;
  } else {
    APIurl = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&key=${apiKey}`;
  }

  try {
    const response = await axios.get(APIurl);
    let traffic = response.data;

    let distanceResponse = traffic.rows[0].elements[0].distance.value;
    let distance = Math.round(distanceResponse / 1609.344);

    let durationResponse = traffic.rows[0].elements[0].duration.value;
    let duration = Math.round(durationResponse / 60);

    return Response.json({ distance, duration });
  } catch (error) {
    console.log("error fetching traffic data. \n", error);
  }
}
