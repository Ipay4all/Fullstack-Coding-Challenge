"use strict";

require("dotenv").config();
const server = require("./server");
const mongoose = require("mongoose");

const DB_URL = process.env.DATABASE_URI;
const PORT = process.env.PORT || 4000;

mongoose
  .set("strictQuery", true)
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the MongoDB");
    server.start(PORT);
  })
  .catch((e) => {
    console.error("Could not start server", e.message);
  });
