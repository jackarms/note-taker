const express = require("express");
const app = express();
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");
const uniqid = require("uniqid");

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
  req.body.id = uniqid();
  const jsonNotes = req.body;
  db.push(jsonNotes);
  fs.writeFileSync("./db/db.json", JSON.stringify(db), null, 2);
  res.json(jsonNotes);
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const noteId = db.findIndex((p) => p.id == id);
  db.splice(noteId, 1);
  return res.send();
});

app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
