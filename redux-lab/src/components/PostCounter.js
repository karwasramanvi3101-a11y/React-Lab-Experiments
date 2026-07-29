import React from "react";
import { useSelector } from "react-redux";

function PostCounter() {
  const posts = useSelector((state) => state.posts.posts);

  const instagram = posts.filter(
    (post) => post.platform === "Instagram"
  ).length;

  const twitter = posts.filter(
    (post) => post.platform === "Twitter"
  ).length;

  const facebook = posts.filter(
    (post) => post.platform === "Facebook"
  ).length;

  const linkedin = posts.filter(
    (post) => post.platform === "LinkedIn"
  ).length;

  return (
    <div className="counter">
      <h2>Total Posts: {posts.length}</h2>

      <p>📸 Instagram : {instagram}</p>
      <p>🐦 Twitter : {twitter}</p>
      <p>📘 Facebook : {facebook}</p>
      <p>💼 LinkedIn : {linkedin}</p>
    </div>
  );
}

export default PostCounter;