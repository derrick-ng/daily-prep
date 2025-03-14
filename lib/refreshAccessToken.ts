import axios from "axios";

export async function refreshAccessToken(storedRefreshToken: string) {
  try {
    const client_id = process.env.OAUTH_CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    if (!client_id || !client_secret) {
      throw new Error("Client ID or Client Secret is not defined");
    }

    const params = new URLSearchParams({
      client_id,
      client_secret,
      refresh_token: storedRefreshToken,
      grant_type: "refresh_token",
    });
    const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const newAccessToken = tokenResponse.data.access_token;
    return newAccessToken;
  } catch (error) {
    console.error("error refreshing access token", error);
  }
}
