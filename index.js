// implement your API here
const express = require("express");
let db = require("./data/db");

const app = express();

app.use(express.json());

//routes
app.get("/api/users", (req, res) => {
  res.json(db);
});

// server start
const port = 8080;
const host = "127.0.0.1";

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
