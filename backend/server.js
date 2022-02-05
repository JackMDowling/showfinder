const express = require("express");
const path = require("path");
const querystring = require("querystring");
require("dotenv").config();

const app = express();
// instantiate app
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

const { client_id } = require("../config");
/*
const spotify_url = // spotify auth link
const redirect_url = // my localhost
const scopes = // the data I want to get back from spotify
*/

app.get("/login", (req, res) => {});

app.listen(3113, console.log("server connected"));
