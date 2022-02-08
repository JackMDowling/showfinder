const express = require("express");
const path = require("path");
const querystring = require("querystring");
require("dotenv").config();
const { client_id } = require("../config");

// instantiate app
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

const generateRandomString = function (length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// const spotify_url = " https://accounts.spotify.com/authorize?";
const redirect_url = "http://localhost:3113";
const scopes = "user-follow-read user-top-read";

app.get("/login", (req, res) => {
  var state = generateRandomString(16);
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "token",
        client_id: client_id,
        scope: scopes,
        redirect_uri: redirect_url,
        state: state,
      })
  );
});

app.listen(3113, console.log("server connected"));
