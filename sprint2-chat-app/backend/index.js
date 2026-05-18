const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "frontend")));

const messages = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const newMessage = {
    text: req.body.text,
  };

  messages.push(newMessage);

  res.json({
    success: true,
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});