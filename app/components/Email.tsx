"use client";

import { useEffect, useState } from "react";
import LoginComponent from "./GoogleLogin";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { gapi } from "gapi-script";
import MessageList from "./message/MessageList";
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
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchCredentials() {
      try {
        const response = await axios.get("/api/email");
        const data = await response.data;
        setClientId(data.clientId);
        setgapiKey(data.apiKey);
        // setClientSecret(data.clientSecret);
        // setredirect_uri(data.redirect_uri);
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
    // [hasRefreshToken] would mean this is called every time the hasRefreshToken changes
  }, []);

  //on accessToken value change, fetch messages
  useEffect(() => {
    if (accessToken) {
      fetchMessages(accessToken);
    }
  }, [accessToken]);

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
      console.log("access token retrieved");
      // setAccessToken(accessToken);
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

  async function fetchMessages(accessToken: string) {
    const response = await gapi.client.gmail.users.messages.list({
      userId: "me",
      maxResults: 5,
      access_token: accessToken,
      // q = query
      // follows the same format as the gmail search box, space separated parameters
      // (add later) labels:unread
      q: "category:primary",
    });

    // || is variable version of a fallback function
    // if response.results.messages fails, null, etc, will fallback to []
    const messages = response.result.messages || [];

    const allMessages = await Promise.all(
      messages.map(async (msg: { id: string }) => {
        const message = await gapi.client.gmail.users.messages.get({
          userId: "me",
          id: msg.id,
          access_token: accessToken,
        });
        return message.result;
      })
    );
    // console.log(allMessages);
    setMessages(allMessages);
  }

  const openMessage = (messageId: number) => {
    const url = `https://mail.google.com/mail/u/0/#all/${messageId}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <h3>Gmail API & OAuth2 Test</h3>
      <div>
        {!hasRefreshToken && clientId ? (
          <GoogleOAuthProvider clientId={clientId}>
            <LoginComponent onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
          </GoogleOAuthProvider>
        ) : (
          <div>
            {/* <p>logged in</p> */}
            <MessageList messages={messages} openMessage={openMessage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Email;
