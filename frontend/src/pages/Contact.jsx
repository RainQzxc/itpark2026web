import { useEffect, useState } from "react";
import { API_BASE } from "../lib/api";

export default function VisionMission() {
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
        console.error("Vision mission load error:", err);
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  const hasTable =
    Array.isArray(data?.values) &&
    data.values.length > 0 &&
    Array.isArray(data?.strategies) &&
    data.strategies.length > 0;

  return (
    <section className="itp-section vision-page">
      {loading && <p style={{ color: "white" }}>Ачааллаж байна...</p>}

      {!loading && !data && (
        <p style={{ color: "red" }}>Алсын хараа, эрхэм зорилгын мэдээлэл татаж чадсангүй.</p>
      )}

      {data && (
        <div className="container">
          <div className="itp-block vision-intro">
            <h1 className="itp-title">{data.page_title || "Алсын хараа, эрхэм зорилго, үнэт зүйлс, стратегийн чиглэл"}</h1>
          </div>

          <div className="vision-summary">
            <div>
              <h2>{data.motto_title || "Уриа"}</h2>
              <p>{data.motto_text || ""}</p>
            </div>
            <div>
              <h2>{data.vision_title || "Алсын хараа"}</h2>
              <p>{data.vision_text || ""}</p>
            </div>
            <div>
              <h2>{data.mission_title || "Эрхэм зорилго"}</h2>
              <p>{data.mission_text || ""}</p>
            </div>
          </div>

          {hasTable ? (
            <div className="vision-table-wrap">
              <table className="vision-table">
                <tbody>
                  <tr>
                    <th>Үнэт зүйлс</th>
                    {data.values.map((value) => (
                      <td key={value} className="vision-value">{value}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>Стратеги</th>
                    {data.strategies.map((strategy) => (
                      <td key={strategy}>{strategy}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>Үндсэн чиглэл</th>
                    {(data.directions || []).map((direction) => (
                      <td key={direction.value}>
                        <ul>
                          {(direction.items || []).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <>
              <div className="itp-block">
                <h2 className="itp-title">{data.priority_title || "Үнэт зүйлс"}</h2>
                <ul>
                  {(data.priority_list || []).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="itp-block">
                <h2 className="itp-title">{data.strategy_title || "Стратегийн зорилго"}</h2>
                <p>{data.strategy_text || ""}</p>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
