import { useNavigate } from "react-router-dom";

function Landing() {

  const navigate = useNavigate();

  return (
    <div className="landing-page">

      <div className="landing-content">

        <h1>Post Management System</h1>

        <p>
          Welcome to the secure JWT-based
          Post Management System.
        </p>

        <p>
          Login according to your assigned role
          and manage posts securely.
        </p>

        <button
          className="primary-button"
          onClick={() => navigate("/login")}
        >
          Login to System
        </button>

      </div>

    </div>
  );
}

export default Landing;