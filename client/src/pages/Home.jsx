import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="stack gap-16">
      <section className="hero">
        <div className="stack gap-12">
          <span className="badge">fitness tracker</span>
          <h1 className="heroTitle">Track workouts, metrics, and progress in one place</h1>
          <p className="heroText">
            Create workouts with exercises and sets, log daily metrics, and view analytics like weekly summaries and top exercises.
          </p>

          <div className="row gap-10 wrap">
            {token ? (
              <>
                <Link className="btn primary" to="/workouts">Go to Workouts</Link>
                <Link className="btn" to="/analytics">Open Analytics</Link>
              </>
            ) : (
              <>
                <Link className="btn primary" to="/register">Get started</Link>
                <Link className="btn" to="/login">Login</Link>
              </>
            )}
          </div>
        </div>

        <div className="heroCard">
          <div className="stat">
            <div className="statNum">15+</div>
            <div className="statLabel">REST endpoints</div>
          </div>
          <div className="stat">
            <div className="statNum">JWT</div>
            <div className="statLabel">secure auth</div>
          </div>
          <div className="stat">
            <div className="statNum">2</div>
            <div className="statLabel">aggregation reports</div>
          </div>

          <div className="divider"></div>

          <div className="muted">
            Tip: after login, start with Workouts → add items → add sets. Then log Metrics and check Analytics.
          </div>
        </div>
      </section>

      <section className="grid3">
        <div className="card">
          <div className="cardTitle">Workouts</div>
          <div className="muted">Create workouts, add exercises and sets, edit and delete easily.</div>
        </div>

        <div className="card">
          <div className="cardTitle">Metrics</div>
          <div className="muted">Track daily values (weight, steps, sleep, water) and keep history.</div>
        </div>

        <div className="card">
          <div className="cardTitle">Analytics</div>
          <div className="muted">Weekly summary + top exercises from aggregation pipelines.</div>
        </div>
      </section>
    </div>
  );
}
