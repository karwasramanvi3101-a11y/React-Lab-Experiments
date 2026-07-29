import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postsSlice";

function AddPost() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Instagram");

  const words =
    title.trim() === "" ? 0 : title.trim().split(/\s+/).length;

  const handleAdd = () => {
    if (title.trim() === "") {
      alert("Please enter a post!");
      return;
    }

    if (words > 20) {
      alert("Maximum 20 words allowed!");
      return;
    }

    dispatch(
      addPost({
        id: Date.now(),
        title,
        platform,
        createdAt: new Date().toLocaleString(),
      })
    );

    setTitle("");
    setPlatform("Instagram");
  };

  return (
    <div className="add-post">
      <h2>Create Post</h2>

      <textarea
        rows="4"
        placeholder="Write your post..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <p>
        Words: <b>{words}</b>/20
      </p>

      <label>Select Platform</label>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option value="Instagram">📸 Instagram</option>
        <option value="Twitter">🐦 Twitter</option>
        <option value="Facebook">📘 Facebook</option>
        <option value="LinkedIn">💼 LinkedIn</option>
      </select>

      <button onClick={handleAdd} disabled={words > 20}>
        Add Post
      </button>
    </div>
  );
}

export default AddPost;