import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { validateEmail, forgotPasswordApi } from "../../api/auth";

interface ForgotPasswordProps {
  toggleForgotPassword: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  toggleForgotPassword,
}) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/");
    toggleForgotPassword();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await forgotPasswordApi(email);
      console.log("Password reset email sent successfully");
      toggleForgotPassword();
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send reset password email"
      );
    }
  };

  return (
    <div className="forgot-overlay">
      <div className="forgot-content">
        <div className="forgot-header">
          <h5 className="customText">Did you forget password?</h5>
        </div>
        <div className="customText">
          <label htmlFor="email" className="forgot-labels">
            Enter your email address and we’ll send you a link to restore
            password
          </label>
        </div>
        <div className="formGrid">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <p className="plabels">Email Address</p>
              <input
                type="email"
                id="email"
                className={`form-control ${error ? "is-invalid" : ""}`}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && (
                <div
                  className="invalid-feedback"
                  style={{ color: "red", fontSize: "14px" }}
                >
                  {error}
                </div>
              )}
            </div>
            <button type="submit" className=" w-100">
              Request reset link
            </button>
          </form>
        </div>

        <div className="labels mt-3 font-size-3">
          <a onClick={handleBackToLogin}>Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
