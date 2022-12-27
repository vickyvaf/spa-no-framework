const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.APP_PORT;

app.use(express.static("public"));

app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
