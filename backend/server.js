const express = require("express");
const path = require("path");

const app = express();
// instantiate app
app.use(express.json());
app.use(express.static(path.join("../../client/dist")));
const server = require("http").createServer(app);

app.listen(3113, console.log("server connected"));
