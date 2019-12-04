// implement your API here
const express = require("express");
let db = require("./data/db");

const app = express();

app.use(express.json());

//routes
app.get("/api/users", (req, res) => {
  //   res.json(db);
  db.find();
});

app.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  const newUser = {
    name: req.body.name,
    bio: req.body.bio,
    created_at: Date.now(),
    updated_at: Date.now()
  };

  db.insert(newUser);
  res.status(201).json(newUser);
});

// server start
const port = 8080;
const host = "127.0.0.1";

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
