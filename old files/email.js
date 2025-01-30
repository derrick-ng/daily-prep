require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const PORT = 3000;

const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const GMAIL_KEY = process.env.GMAIL_KEY;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

app.get("/api/credentials", (req, res) => {
  res.json({ OAUTH_CLIENT_ID, GMAIL_KEY, CLIENT_SECRET, REFRESH_TOKEN });
});

//save token to database at a later time
//currently using hardcoded refresh token in .env file
// app.post("/api/saveToken", (req, res) => {
//   const { token } = req.body;
// });

// app.get("/api/getToken", (req, res) => {
//   res.json({ REFRESH_TOKEN });
// });

app.listen(PORT, () => {
  console.log(`Active on port: ${PORT}`);
});
