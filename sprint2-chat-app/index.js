const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const messages = [];

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
  console.log("Server started");
});