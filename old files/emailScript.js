let OAUTH_CLIENT_ID;
let GMAIL_KEY;
let CLIENT_SECRET;
let REFRESH_TOKEN;

const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest";
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

let gapiInited = false;
let gisInited = false;

let authorizeButton;
let signoutButton;
let content;

async function fetchCredentials() {
  try {
    const response = await fetch("http://127.0.0.1:3000/api/credentials");
    const credentials = await response.json();

    OAUTH_CLIENT_ID = credentials.OAUTH_CLIENT_ID;
    GMAIL_KEY = credentials.GMAIL_KEY;
    CLIENT_SECRET = credentials.CLIENT_SECRET;
    REFRESH_TOKEN = credentials.REFRESH_TOKEN;
  } catch (error) {
    console.log("error in fetching credentials", error);
  }
}

async function refreshAccessToken() {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: OAUTH_CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_Token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const data = await response.json();

  if (data.error) {
    console.log("error during refresh token", data.error);
    return;
  }
  //find exact time for when expires
  const expirationTime = Date.now() + data.expires_in * 1000;
  const tokenData = {
    access_token: data.access_token,
    expires_at: expirationTime,
  };

  localStorage.setItem("tokenData", JSON.stringify(tokenData));
  return tokenData.access_token;
  // gapi.client.setToken({ access_token: data.access_token });
}

function getStoredToken() {
  const tokenData = JSON.parse(localStorage.getItem("tokenData"));
  const time = Date.now();

  if (!tokenData) {
    return null;
  }

  if (time >= tokenData.expires_at) {
    return null;
  }

  return tokenData.access_token;
}

document.addEventListener("DOMContentLoaded", async () => {
  // await fetchCredentials();

  authorizeButton = document.getElementById("authorizeButton");
  signoutButton = document.getElementById("signoutButton");
  content = document.getElementById("content");

  authorizeButton.style.visibility = "hidden";
  signoutButton.style.visibility = "hidden";

  authorizeButton.addEventListener("click", handleAuthClick);
  signoutButton.addEventListener("click", handleSignoutClick);

  const token = getStoredToken();
  if (token) {
    gapi.client.setToken({ access_token: token });
    signoutButton.style.visibility = "visible";
    authorizeButton.innerText = "Refresh";
    await listLabels();
  }
});

async function initGapiClient() {
  await gapi.client.init({
    apiKey: GMAIL_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

async function gapiLoaded() {
  await fetchCredentials();
  gapi.load("client", initGapiClient);
}

async function gisLoaded() {
  await fetchCredentials();
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: OAUTH_CLIENT_ID,
    scope: SCOPES,
    access_type: "offline",
    prompt: "consent", //might be redundant
    callback: async (res) => {
      if (res.error) {
        console.log("error during token request", res.error);
        return;
      }

      const expirationTime = Date.now() + res.expires_in * 1000;
      const tokenData = {
        access_token: res.access_token,
        expires_at: expirationTime,
      };

      localStorage.setItem("tokenData", JSON.stringify(tokenData));
      gapi.client.setToken({ access_token: res.access_token });
      signoutButton.style.visibility = "visible";
      authorizeButton.innerText = "Refresh";
      maybeEnableButtons();
    },
  });
  gisInited = true;
  maybeEnableButtons();
}

function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    authorizeButton.style.visibility = "visible";
  }
}

async function handleAuthClick() {
  const token = getStoredToken();

  if (!token) {
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken) {
      gapi.client.setToken({ access_token: refreshedToken });
      await listLabels();
    }
  }
  // tokenClient.callback = async (res) => {
  //   if (res.error !== undefined) {
  //     throw res;
  //   }
  //   signoutButton.style.visibility = "visible";
  //   authorizeButton.innerText = "Refresh";
  //   console.log("access token", res.access_token);

  //   const token = gapi.client.getToken();
  //   if (token && token.expires_in < Date.now()) {
  //     await refreshAccessToken();
  //   }
  //   await listLabels();
  // };
  // if (gapi.client.getToken() === null) {
  //   tokenClient.requestAccessToken({ prompt: "consent" });
  // } else {
  //   tokenClient.requestAccessToken({ prompt: "" });
  // }
}

function handleSignoutClick() {
  localStorage.removeItem("tokenData");
  gapi.client.setToken(null);
  content.innerText = "";
  authorizeButton.innerText = "Authorize";
  signoutButton.style.visibility = "hidden";

  // const token = gapi.client.getToken();
  // if (token !== null) {
  //   google.accounts.oauth2.revoke(token.access_token);
  //   gapi.client.setToken("");
  //   content.innerText = "";
  //   authorizeButton.innerText = "Authorize";
  //   signoutButton.style.visibility = "hidden";
  // }
}

async function listLabels() {
  let response;
  try {
    response = await gapi.client.gmail.users.labels.list({
      userId: "me",
    });
  } catch (err) {
    content.innerText = err.message;
    return;
  }
  const labels = response.result.labels;
  if (!labels || labels.length == 0) {
    content.innerText = "No labels found.";
    return;
  }
  // Flatten to string to display
  const output = labels.reduce((str, label) => `${str}${label.name}\n`, "Labels:\n");
  content.innerText = output;
}
