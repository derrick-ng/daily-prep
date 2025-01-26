let OAUTH_CLIENT_ID;
let GMAIL_KEY;

const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest";
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

let tokenClient;
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
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
//   await fetchCredentials();

  authorizeButton = document.getElementById("authorizeButton");
  signoutButton = document.getElementById("signoutButton");
  content = document.getElementById("content");

  authorizeButton.style.visibility = "hidden";
  signoutButton.style.visibility = "hidden";

  authorizeButton.addEventListener("click", handleAuthClick);
  signoutButton.addEventListener("click", handleSignoutClick);
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
    redirect_uri: "http://127.0.0.1:5500/zzz/emailTest.html",
    callback: (res) => {
      if (res.error) {
        console.log("error during token request", res.error);
        return;
      }
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

function handleAuthClick() {
  tokenClient.callback = async (res) => {
    if (res.error !== undefined) {
      throw res;
    }
    signoutButton.style.visibility = "visible";
    authorizeButton.innerText = "Refresh";
    await listLabels();
  };
  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    tokenClient.requestAccessToken({ prompt: "" });
  }
}

function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken("");
    content.innerText = "";
    authorizeButton.innerText = "Authorize";
    signoutButton.style.visibility = "hidden";
  }
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
