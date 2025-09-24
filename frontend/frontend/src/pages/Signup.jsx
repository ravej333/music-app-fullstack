import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser, loginWithGoogle } from '../api/authApis.js'; // Import Google login function

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [validation, setValidation] = useState({
    length: false,
    number: false,
    match: false,
  });

  const navigate = useNavigate();

  // Validate password in real-time
  useEffect(() => {
    setValidation({
      length: password.length >= 8,
      number: /\d/.test(password),
      match: password && password === confirmPassword,
    });
  }, [password, confirmPassword]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validation.length || !validation.number || !validation.match) {
      setError("Please ensure all password requirements are met.");
      return;
    }
    setError('');
    setLoading(true);

    try {
      await signupUser(email, password);
      alert("Signup successful! Please check your email to verify your account.");
      navigate("/login"); // Redirect to login page after signup
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignup = async () => {
    setError('');
    try {
      await loginWithGoogle();
      // Supabase handles the redirect automatically
    } catch (err) {
      setError(err.message || "Google sign up failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSignup}>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div className="password-validation">
          <p className={validation.length ? 'valid' : 'invalid'}>✓ At least 8 characters</p>
          <p className={validation.number ? 'valid' : 'invalid'}>✓ Contains a number</p>
          <p className={validation.match ? 'valid' : 'invalid'}>✓ Passwords match</p>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      
      <div className="auth-divider">
        <span>OR</span>
      </div>
      
      <button onClick={handleGoogleSignup} className="google-login-btn">
        Continue with Google
      </button>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;