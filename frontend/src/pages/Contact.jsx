import { useEffect, useState } from "react";
import { API_BASE } from "../lib/api";

export default function Contact() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    fetch(`${API_BASE}/api/contact?ts=${Date.now()}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((json) => {
        if (!alive) return;
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Contact load error:", err);
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="itp-section">
      {loading && <p style={{ color: "white" }}>⏳ Ачаалж байна...</p>}

      {!loading && !data && (
        <p style={{ color: "red" }}>⚠️ Contact дата татаж чадсангүй.</p>
      )}

      {data && (
        <>
          <div className="itp-block">
            <h2 className="itp-title" id="vision_title">
              {data.vision_title || "АЛСЫН ХАРАА"}
            </h2>
            <p id="vision_text">{data.vision_text || ""}</p>
          </div>

          <div className="itp-block">
            <h2 className="itp-title" id="mission_title">
              {data.mission_title || "ЭРХЭМ ЗОРИЛГО"}
            </h2>
            <p id="mission_text">{data.mission_text || ""}</p>
          </div>

          <div className="itp-block">
            <h2 className="itp-title" id="priority_title">
              {data.priority_title || "Манай төвийн үндсэн тэргүүлэх чиглэлүүд:"}
            </h2>

            <ul id="priority_list">
              {(data.priority_list || []).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="itp-block">
            <h2 className="itp-title" id="duty_title">
              {data.duty_title || "ЧИГ ҮҮРЭГ"}
            </h2>
            <p id="duty_text">{data.duty_text || ""}</p>
          </div>

          <div className="itp-block">
            <h2 className="itp-title" id="strategy_title">
              {data.strategy_title || "СТРАТЕГИЙН ЗОРИЛГО"}
            </h2>
            <p id="strategy_text">{data.strategy_text || ""}</p>
          </div>
        </>
      )}
    </section>
  );
}
