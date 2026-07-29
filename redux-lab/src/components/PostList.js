import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../features/posts/postsSlice";

function PostList() {
  const dispatch = useDispatch();

  const { posts, filter, search } = useSelector(
    (state) => state.posts
  );

  const filteredPosts = posts.filter((post) => {
    const matchPlatform =
      filter === "All" || post.platform === filter;

    const matchSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchPlatform && matchSearch;
  });

  return (
    <div className="post-list">
      <h2>Posts</h2>

      {filteredPosts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        filteredPosts.map((post) => (
          <div className="post-card" key={post.id}>
            <h3>{post.platform}</h3>

            <p>{post.title}</p>

            <small>Posted on: {post.createdAt}</small>

            <br />
            <br />

            <button
              onClick={() => dispatch(deletePost(post.id))}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;