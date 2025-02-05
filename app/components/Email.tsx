"use client";

import { useEffect, useState } from "react";
import LoginComponent from "./LoginComponent";
import axios from "axios";
import { CredentialResponse, GoogleOAuthProvider } from "@react-oauth/google";
import { gapi } from "gapi-script";

//https://www.youtube.com/watch?v=N5fiL6fwvbU
const Email = () => {
  const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [clientId, setClientId] = useState("");
  const [gapiKey, setgapiKey] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function fetchCredentials() {
      try {
        const response = await axios.get("/api/email");
        const data = await response.data;
        setClientId(data.clientId);
        setgapiKey(data.apiKey);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log("error fetching client id: ", error);
      }
    }
    fetchCredentials();

    //might be a bad idea to call this function here
    //maybe create, then call this in another useEffect
    // ***honestly not even sure if this is needed***
    gapiLoaded();

    // the point of the [] is to tell nextjs when to run this effect
    // an empty array means it is called only once
    // adding a variable would tell next that this effect *depends* on that variable
    // [isAuthenticated] would mean this is called every time the isAuthenticated changes
  }, []);

  const handleLoginSuccess = async (response: any) => {
    //this is just an authorization code, not an access token
    //need to exchange auth code for access token
    console.log("authorization code: ", response.code);

    const params = new URLSearchParams();
    params.append("code", response.code);
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("redirect_uri", "http://localhost:3000");
    params.append("grant_type", "authorization_code");

    try {
      const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      setAccessToken(tokenResponse.data.access_token);
      console.log("access token:", tokenResponse.data.access_token);

      setIsAuthenticated(true);
    } catch (error) {
      console.log("error exchanging auth code", error);
    }
  };

  // not sure how to implement this yet
  const handleLoginFailure = () => {};

  function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: gapiKey,
      discoveryDocs: [DISCOVERY_DOC],
    });
  }

  return (
    <div>
      <h3>Gmail API & OAuth2 Test</h3>
      <div>
        {!isAuthenticated && clientId ? (
          <GoogleOAuthProvider clientId={clientId}>
            <LoginComponent onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
          </GoogleOAuthProvider>
        ) : (
          <p>logged in</p>
        )}
      </div>
    </div>
  );
};

export default Email;
