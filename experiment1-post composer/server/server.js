const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let posts = [];

// Publish a post
app.post("/publish", (req, res) => {
  const newPost = {
    id: Date.now(),
    platform: req.body.platform,
    content: req.body.content,
    time: new Date().toLocaleString(),
  };

  posts.push(newPost);

  res.json({
    success: true,
    message: "Post Published Successfully!",
  });
});

// Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Delete all posts
app.delete("/posts", (req, res) => {
  posts = [];
  res.json({
    success: true,
    message: "Posts cleared",
  });
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});