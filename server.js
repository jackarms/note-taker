const express = require("express");
const app = express();
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  let title = newNote.title;
  let text = newNote.text;
  console.log(text);
  newNote.forEach((note, index) => {
    fs.writeFileSync(
      path.join(__dirname, "/db/db.json"),
      JSON.stringify([{ title, text }], null, 2)
    );
  });
});

// app.delete("/api/notes/:id", (req, res) => {});

app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
