import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginUser, loginWithGoogle } from "../api/authApis.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to previous page after login, or default to homepage
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
      // Supabase handles the redirect automatically
    } catch (err) {
      setError(err.message || "Google login failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Log In</h2>
      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div className="auth-divider">
        <span>OR</span>
      </div>

      <button onClick={handleGoogleLogin} className="google-login-btn">
        Continue with Google
      </button>

      <p>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;