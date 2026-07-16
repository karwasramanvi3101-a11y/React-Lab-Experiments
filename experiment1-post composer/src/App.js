import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [platform, setPlatform] = useState("Twitter");
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const limits = {
    Twitter: 280,
    Instagram: 2200,
    Facebook: 63206,
    LinkedIn: 3000,
  };

  const limit = limits[platform];
  const remaining = limit - post.length;

  const isValid = remaining >= 0 && post.trim() !== "";

  const loadPosts = async () => {
    const response = await fetch("http://localhost:5000/posts");
    const data = await response.json();
    setPosts(data);
  };

  const publishPost = async () => {
    if (!isValid) return;

    await fetch("http://localhost:5000/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        platform,
        content: post,
      }),
    });

    setPost("");

    loadPosts();
  };

  useEffect(() => {
    const initialize = async () => {
      // Delete previous session posts
      await fetch("http://localhost:5000/posts", {
        method: "DELETE",
      });

      // Load empty list
      loadPosts();
    };

    initialize();
  }, []);

  let message = "";
  let color = "green";

  if (remaining < 0) {
    message = "Character limit exceeded!";
    color = "red";
  } else if (remaining <= 20) {
    message = "Warning: Near character limit";
    color = "orange";
  } else {
    message = "Ready to Publish";
  }

  return (
    <div className="container">
      <h1>Social Media Post Composer</h1>

      <label>Select Platform</label>
      <br />
      <br />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>Twitter</option>
        <option>Instagram</option>
        <option>Facebook</option>
        <option>LinkedIn</option>
      </select>

      <br />
      <br />

      <textarea
        rows="7"
        placeholder="Write your post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <h3>
        Characters: {post.length}/{limit}
      </h3>

      <h3 style={{ color }}>{message}</h3>

      <button disabled={!isValid} onClick={publishPost}>
        Publish
      </button>

      <hr />

      <h2>Published Posts</h2>

      {posts.length === 0 ? (
        <p>No Posts Published Yet.</p>
      ) : (
        posts.map((item) => (
          <div key={item.id} className="postCard">
            <h3>{item.platform}</h3>
            <p>{item.content}</p>
            <small>{item.time}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default App;