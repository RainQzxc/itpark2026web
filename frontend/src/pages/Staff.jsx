import { useEffect, useMemo, useState } from "react";
import { API_BASE } from "../lib/api";

export default function Staff() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const endpoint = useMemo(() => `${API_BASE}/api/public/staff`, []);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(endpoint, {
          method: "GET",
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data?.message || "Staff API failed");
        if (!Array.isArray(data)) throw new Error("Invalid staff response");

        if (alive) setRows(data);
      } catch (e) {
        if (alive) setError(e.message || "STAFF LOAD FAILED");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [endpoint]);

  return (
    <section id="staff" className="itp-staff-section">
      <div className="container">
        <h2>АЛБАН ХААГЧДЫН МЭДЭЭЛЭЛ</h2>

        {loading && <p style={{ opacity: 0.8 }}>Уншиж байна...</p>}
        {error && <p style={{ color: "tomato" }}>❌ {error}</p>}

        <table className="itp-staff-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Байгууллага</th>
              <th>Албан тушаал</th>
              <th>Нэр</th>
              <th>Өрөө</th>
              <th>Ажлын утас</th>
              <th>И-Мэйл хаяг</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((item, index) => (
              <tr key={item._id || `${item.email}-${index}`}>
                <td>{index + 1}</td>
                <td>{item.organization || ""}</td>
                <td>{item.position || ""}</td>
                <td>{item.name || ""}</td>
                <td>{item.room || ""}</td>
                <td>{item.phone || ""}</td>
                <td>{item.email || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
