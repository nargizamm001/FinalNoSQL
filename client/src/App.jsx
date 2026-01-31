import React from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Workouts from "./pages/Workouts.jsx";
import WorkoutDetails from "./pages/WorkoutDetails.jsx";
import Metrics from "./pages/Metrics.jsx";
import Analytics from "./pages/Analytics.jsx";

function Protected({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16, fontFamily: "Arial" }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <Link to="/">Home</Link>
        {token && (
          <>
            <Link to="/workouts">Workouts</Link>
            <Link to="/metrics">Metrics</Link>
            <Link to="/analytics">Analytics</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </header>

      <Routes>
        <Route path="/" element={<div>Fitness Tracker Web App</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/workouts"
          element={
            <Protected>
              <Workouts />
            </Protected>
          }
        />
        <Route
          path="/workouts/:id"
          element={
            <Protected>
              <WorkoutDetails />
            </Protected>
          }
        />
        <Route
          path="/metrics"
          element={
            <Protected>
              <Metrics />
            </Protected>
          }
        />
        <Route
          path="/analytics"
          element={
            <Protected>
              <Analytics />
            </Protected>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}