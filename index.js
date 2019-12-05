// implement your API here
const express = require("express");
let db = require("./data/db");

const app = express();

app.use(express.json());

//routes

// route to get all the users
app.get("/api/users", (req, res) => {
  //   res.json(db);
  db.find().then(users => res.json(users));
});

// route to add a user to the db
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

// route to grab a specific user based on the id of the user
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    db.findById(id).then(user => res.json(user));
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// route to delete the user from the database
app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  if (id) {
    db.remove(id).then(user => res.json(user));
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// server start
const port = 8080;
const host = "127.0.0.1";

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
