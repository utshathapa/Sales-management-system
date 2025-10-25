import { useState } from "react";
import api from "../api/api";
import "../css/Signup.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match!");
      setMsgType("error");
      return;
    }

    try {
      const res = await api.post("/register", form);
      setMessage(res.data.message || "Registered successfully!");
      setMsgType("success");
      setForm({
        name: "",
        username: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        address: "",
        password: "",
        confirmPassword: "",
        role: "user",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
      setMsgType("error");
    }
  };

  return (
    <div className="signup-page-wrapper">
      <div className="signup-card">
        <h2>Create an Account</h2>
        {message && <p className={`message ${msgType}`}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          
    <div className="date-input-wrapper">
  <input
    type="date"
    name="dob"
    value={form.dob}
    onChange={handleChange}
    required
  />
  {!form.dob && <span className="placeholder">Date of Birth</span>}
</div>

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;