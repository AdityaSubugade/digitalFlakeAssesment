import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { loginApi } from "../../api";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../ForgotPassword/ForgotPassword";
import { LoginResponse } from "../../interface/interface";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response: LoginResponse = await loginApi(email, password);
      localStorage.setItem("token", response.token); // Store token in localStorage
      navigate("/home");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <div
      className="container d-flex ml-5 align-items-center bg-light"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          zIndex: 0,
          left: 0,
          top: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="public/image 5.png"
          style={{ height: "100%", width: "100%" }}
          alt="background"
        />
      </div>
      <div
        className="card shadow"
        style={{
          paddingTop: "60px",
          width: "500px",
          height: "80vh",
          zIndex: 1,
          marginLeft: "300px",
        }}
      >
        <div className="text-center mb-5">
          <img
            className="logoImg"
            src="public/image 4.png"
            alt="Logo"
            width="200px"
            height="80px"
          />
          <p className="text-muted">Welcome to Digitalflake admin</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className=" mb-4">
            <div className="input-group">
              <input
                className="input"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email" className="user-label ">
                Email-id
              </label>
            </div>
          </div>

          <div className="mb-3 position-relative">
            <div className="input-group position-relative">
              <input
                className="input with-icon"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                onClick={() => setShowPassword((prev) => !prev)}
                src="public/Vector.png"
                alt="Toggle Password Visibility"
                className="input-icon"
              />
              <label htmlFor="password" className="user-label">
                Password
              </label>
            </div>
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}

          <div className="forgotDiv text-end">
            <a className="customText " onClick={toggleForgotPassword}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="w-100 fw-bold" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>

      {showForgotPassword && (
        <ForgotPasswordModal toggleForgotPassword={toggleForgotPassword} />
      )}
    </div>
  );
};

export default Login;
