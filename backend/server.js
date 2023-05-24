"use strict";

const express = require("express");
const cors = require("cors");
const app = express();

const handleNotFound = require("./middlewares/404");
const handleServerError = require("./middlewares/500");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("The backend is alive!");
});

function start(port) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

app.use("*", handleNotFound);
app.use(handleServerError);

module.exports = {
  start,
  app,
};
