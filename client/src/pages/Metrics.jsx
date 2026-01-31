import React, { useEffect, useState } from "react";
import http from "../api/http";

export default function Metrics() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [weightKg, setWeightKg] = useState("");
  const [steps, setSteps] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [waterMl, setWaterMl] = useState("");
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  const load = async () => {
    const res = await http.get("/metrics");
    setItems(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    setErr("");
    try {
      await http.post("/metrics", {
        date: new Date(date),
        weightKg: weightKg === "" ? undefined : Number(weightKg),
        steps: steps === "" ? undefined : Number(steps),
        sleepHours: sleepHours === "" ? undefined : Number(sleepHours),
        waterMl: waterMl === "" ? undefined : Number(waterMl)
      });
      await load();
    } catch (e) {
      setErr(e?.response?.data?.error || "Failed to save metric");
    }
  };

  return (
    <div>
      <h2>Metrics</h2>
      {err && <div style={{ color: "crimson" }}>{err}</div>}

      <div style={{ display: "grid", gap: 8, maxWidth: 360 }}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder="weightKg" />
        <input value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="steps" />
        <input value={sleepHours} onChange={(e) => setSleepHours(e.target.value)} placeholder="sleepHours" />
        <input value={waterMl} onChange={(e) => setWaterMl(e.target.value)} placeholder="waterMl" />
        <button onClick={save}>Save (upsert)</button>
      </div>

      <h3 style={{ marginTop: 16 }}>History</h3>
      <ul>
        {items.map((m) => (
          <li key={m._id}>
            {new Date(m.date).toISOString().slice(0, 10)} | weight: {m.weightKg ?? "-"} | steps: {m.steps ?? "-"}
          </li>
        ))}
      </ul>
    </div>
  );
}