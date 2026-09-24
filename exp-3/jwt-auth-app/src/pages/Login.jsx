import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../utils/auth";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    setError("");

    const user = login(
      username,
      password
    );

    if (user) {

      // Login successful
      navigate("/dashboard");

    } else {

      // Login failed
      setError(
        "Invalid username or password"
      );

    }
  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h1>System Login</h1>

        <p className="subtitle">
          Enter your credentials to access
          the system
        </p>


        {/* AVAILABLE PROFILES */}

        <div className="profiles">

          <h3>
            AVAILABLE PROFILES & PERMISSIONS
          </h3>


          {/* ADMIN */}

          <div className="profile">

            <strong>
              Admin:
            </strong>{" "}
            admin_user

            <span>
              <b>Pass:</b> admin123
            </span>

            <p>
              Access: Can create, edit,
              view, and delete posts.
            </p>

          </div>


          {/* EDITOR */}

          <div className="profile">

            <strong>
              Editor:
            </strong>{" "}
            editor_user

            <span>
              <b>Pass:</b> edit123
            </span>

            <p>
              Access: Can view and edit
              posts only.
            </p>

          </div>


          {/* VIEWER */}

          <div className="profile">

            <strong>
              Viewer:
            </strong>{" "}
            viewer_user

            <span>
              <b>Pass:</b> view123
            </span>

            <p>
              Access: Read-only.
              Cannot create, edit, or delete.
            </p>

          </div>

        </div>


        {/* LOGIN FORM */}

        <form onSubmit={handleLogin}>

          <label>
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username..."
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />


          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />


          {/* ERROR MESSAGE */}

          {error && (
            <p className="error">
              {error}
            </p>
          )}


          <button
            type="submit"
            className="login-button"
          >
            Authenticate
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;