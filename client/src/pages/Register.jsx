import React, { useState } from "react";
import http from "../api/http";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await http.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/workouts");
    } catch (e2) {
      setErr(e2?.response?.data?.error || "Register failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {err && <div style={{ color: "crimson" }}>{err}</div>}
      <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
        <button>Create account</button>
      </form>
    </div>
  );
}