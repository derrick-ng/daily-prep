require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const PORT = 3000;

const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const GMAIL_KEY = process.env.GMAIL_KEY;

app.get("/api/credentials", (req, res) => {
  res.json({ OAUTH_CLIENT_ID, GMAIL_KEY });
});

app.listen(PORT, () => {
  console.log(`Active on port: ${PORT}`);
});
