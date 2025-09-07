"use client";

import { useEffect, useState } from "react";
import LoginComponent from "./GoogleLogin";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { gapi } from "gapi-script";
import { showToastResponse } from "@/lib/toast";

interface EmailProp {
  userId: string | null;
}

//https://www.youtube.com/watch?v=N5fiL6fwvbU
const Email = ({ userId }: EmailProp) => {
  const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest";

  const [hasRefreshToken, setHasRefreshToken] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [clientId, setClientId] = useState("");
  const [gapiKey, setgapiKey] = useState("");

  useEffect(() => {
    async function fetchCredentials() {
      try {
        const response = await axios.get("/api/email");
        const data = await response.data;
        setClientId(data.clientId);
        setgapiKey(data.apiKey);
      } catch (error) {
        console.log("error fetching client id: ", error);
      }
    }
    fetchCredentials();
    gapiLoaded();
  }, []);

  useEffect(() => {
    async function initAccessToken() {
      if (!accessToken && userId) {
        const newAccessToken = await getNewAccessToken(userId);
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          setHasRefreshToken(true);
        } else {
          // a little redundant, but makes it easier to read
          setHasRefreshToken(false);
        }
      }
    }
    initAccessToken();
  }, [userId, accessToken]);

  async function getNewAccessToken(userId: string) {
    try {
      const data = {
        userId,
      };
      const tokenResponse = await axios.post("/api/email/token", data);
      if (tokenResponse.status == 500) {
        setHasRefreshToken(false);
        return;
      }
      const accessToken = tokenResponse.data.newAccessToken;
      return accessToken;
    } catch (error) {
      console.error("fail getting new access token", error);
    }
  }

  const handleLoginSuccess = async (response: { code: string }) => {
    const tokenData = {
      code: response.code,
      userId: userId ? parseInt(userId) : null,
    };
    try {
      const { data } = await axios.post("/api/email", tokenData);
      const accessToken = data.accessToken;

      setAccessToken(accessToken);
      setHasRefreshToken(true);
      showToastResponse(data);
    } catch (error) {
      console.log("error exchanging auth code", error);
    }
  };

  //implement in the future
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
      <div>
        {!hasRefreshToken && clientId ? (
          <GoogleOAuthProvider clientId={clientId}>
            <LoginComponent onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
          </GoogleOAuthProvider>
        ) : (
          <div>Logged in to Gmail</div>
        )}
      </div>
    </div>
  );
};

export default Email;
