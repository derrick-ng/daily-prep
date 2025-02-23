"use client";

import { useEffect, useState } from "react";
import LoginComponent from "./GoogleLogin";
import axios from "axios";
import { CredentialResponse, GoogleOAuthProvider } from "@react-oauth/google";
import { gapi } from "gapi-script";
import MessageList from "./MessageList";

//https://www.youtube.com/watch?v=N5fiL6fwvbU
const Email = () => {
  const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [clientId, setClientId] = useState("");
  const [gapiKey, setgapiKey] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [messages, setMessages] = useState([]);

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

  //on accessToken value change, fetch messages
  useEffect(() => {
    if (accessToken) {
      fetchMessages(accessToken);
    }
  }, [accessToken]);

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
      //cant immediately use accessToken even though it has been set
      //state variables dont change instantly, react does it in batches
      //accessToken state is prob changing in next batch, after function call
      console.log("access token:", tokenResponse.data.access_token);
      //console.log("access token check: ", accessToken)
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

  async function fetchMessages(accessToken: string) {
    const response = await gapi.client.gmail.users.messages.list({
      userId: "me",
      maxResults: 5,
      access_token: accessToken,
      // q = query
      // follows the same format as the gmail search box, space separated parameters
      // (add later) labels:unread
      q: "category:primary"
    });

    // || is variable version of a fallback function
    // if response.results.messages fails, null, etc, will fallback to []
    const messages = response.result.messages || [];

    const allMessages = await Promise.all(
      messages.map(async (msg: any) => {
        const message = await gapi.client.gmail.users.messages.get({
          userId: "me",
          id: msg.id,
          access_token: accessToken,
        });
        return message.result;
      })
    );
    console.log(allMessages);
    setMessages(allMessages);
  }

  const openMessage = (messageId: number) => {
    const url = `https://mail.google.com/mail/u/0/#all/${messageId}`
    window.open(url, "_blank")
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
          <div>
            <p>logged in</p>
            <MessageList 
                messages={messages}
                openMessage={openMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Email;
