import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  logout
} from "../utils/auth";


function Dashboard() {

  const navigate = useNavigate();

  // Get logged-in user from JWT
  const user = getCurrentUser();


  // -----------------------------
  // POSTS
  // -----------------------------

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome Post",
      content: "This is the first post."
    },
    {
      id: 2,
      title: "JWT Authentication",
      content:
        "This system uses JWT-based authentication."
    }
  ]);


  // -----------------------------
  // FORM DATA
  // -----------------------------

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);


  // -----------------------------
  // CHECK LOGIN
  // -----------------------------

  if (!user) {

    navigate("/login");

    return null;

  }


  // -----------------------------
  // ROLE PERMISSIONS
  // -----------------------------

  const canCreate =
    user.role === "Admin";

  const canEdit =
    user.role === "Admin" ||
    user.role === "Editor";

  const canDelete =
    user.role === "Admin";


  // -----------------------------
  // CREATE POST
  // -----------------------------

  const addPost = () => {

    if (!title.trim() || !content.trim()) {

      alert("Please enter title and content.");

      return;

    }


    const newPost = {

      id: Date.now(),

      title: title,

      content: content

    };


    setPosts([
      ...posts,
      newPost
    ]);


    setTitle("");

    setContent("");

  };


  // -----------------------------
  // DELETE POST
  // -----------------------------

  const deletePost = (id) => {

    setPosts(
      posts.filter(
        (post) => post.id !== id
      )
    );

  };


  // -----------------------------
  // START EDIT
  // -----------------------------

  const startEdit = (post) => {

    setEditingId(post.id);

    setTitle(post.title);

    setContent(post.content);

  };


  // -----------------------------
  // UPDATE POST
  // -----------------------------

  const updatePost = () => {

    if (!title.trim() || !content.trim()) {

      alert("Please enter title and content.");

      return;

    }


    setPosts(

      posts.map((post) =>

        post.id === editingId

          ? {
              ...post,
              title: title,
              content: content
            }

          : post

      )

    );


    setEditingId(null);

    setTitle("");

    setContent("");

  };


  // -----------------------------
  // LOGOUT
  // -----------------------------

  const handleLogout = () => {

    logout();

    navigate("/login");

  };


  // -----------------------------
  // DASHBOARD UI
  // -----------------------------

  return (

    <div className="dashboard">


      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <h1>
            Post Composer
          </h1>

          <p>
            Logged in as:
            <strong>
              {" "}{user.username}
            </strong>
          </p>

          <p>
            Role:
            <strong>
              {" "}{user.role}
            </strong>
          </p>

        </div>


        <button
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>



      {/* PERMISSION MESSAGE */}

      <div className="info-box">

        {user.role === "Admin" && (

          <p>
            <strong>Admin Access:</strong>{" "}
            You can create, view, edit,
            and delete posts.
          </p>

        )}


        {user.role === "Editor" && (

          <p>
            <strong>Editor Access:</strong>{" "}
            You can view and edit posts.
            You cannot create or delete posts.
          </p>

        )}


        {user.role === "Viewer" && (

          <p>
            <strong>Viewer Access:</strong>{" "}
            You have read-only access.
          </p>

        )}

      </div>



      {/* CREATE / EDIT FORM */}

      {canCreate && (

        <div className="composer">

          <h2>

            {editingId
              ? "Edit Post"
              : "Create New Post"}

          </h2>


          <input

            type="text"

            placeholder="Post title"

            value={title}

            onChange={(e) =>
              setTitle(e.target.value)
            }

          />


          <textarea

            placeholder="Write your post..."

            value={content}

            onChange={(e) =>
              setContent(e.target.value)
            }

          />


          {editingId ? (

            <button
              onClick={updatePost}
            >
              Update Post
            </button>

          ) : (

            <button
              onClick={addPost}
            >
              Create Post
            </button>

          )}

        </div>

      )}



      {/* EDITOR FORM */}

      {!canCreate &&
        canEdit && (

          <div className="info-box">

            <p>
              Select an existing post
              below to edit it.
            </p>

          </div>

        )}



      {/* POSTS */}

      <div className="posts">

        <h2>
          Available Posts
        </h2>


        {posts.map((post) => (

          <div
            className="post-card"
            key={post.id}
          >

            <h3>
              {post.title}
            </h3>


            <p>
              {post.content}
            </p>


            <div>


              {/* EDIT BUTTON */}

              {canEdit && (

                <button
                  onClick={() =>
                    startEdit(post)
                  }
                >
                  Edit
                </button>

              )}


              {/* DELETE BUTTON */}

              {canDelete && (

                <button
                  onClick={() =>
                    deletePost(post.id)
                  }
                >
                  Delete
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Dashboard;