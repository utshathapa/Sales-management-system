import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
import "../css/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // 'success' or 'error'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://127.0.0.1:8080/api/login", form);
      const { user, token, message } = res.data;

      login(token, user);

      setMessage(message);
      setMsgType("success");

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      setMessage(errorMessage);
      setMsgType("error");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <h2>Login</h2>

        {message && <p className={`status-message ${msgType}`}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <a href="#" className="forgot-password">
            Forgot password?
          </a>

         <button
  type="button"
  className="link-button underline-link"
  onClick={() => navigate("/signup")}
>
  Don't have an account? Sign up
</button>
          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
