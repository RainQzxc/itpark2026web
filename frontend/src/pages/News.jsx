import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../lib/api";

export default function News() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  useEffect(() => {
    const t = setTimeout(() => {
      window.dispatchEvent(new Event("load"));
      window.dispatchEvent(new Event("resize"));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(`${API_BASE}/api/news`);
        const data = await res.json();
        if (!alive) return;
        setPosts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("NEWS LOAD ERROR:", e);
        if (!alive) return;
        setErr("⚠️ Мэдээ татахад алдаа гарлаа.");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [API_BASE]);

  const dayMonth = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.toLocaleString("en", { month: "short" }).toUpperCase();
    return { day, month };
  };

  return (
    <div id="wrapper">
      <div className="itp-overlay"></div>

      <section>
        <div className="container">
          <div className="row g-4" id="news-container">
            {loading ? (
              <p style={{ color: "white" }}>⏳ Мэдээ ачаалж байна...</p>
            ) : err ? (
              <p style={{ color: "red" }}>{err}</p>
            ) : posts.length === 0 ? (
              <p style={{ color: "white" }}>Одоогоор мэдээ алга.</p>
            ) : (
              posts.map((post) => {
                const { day, month } = dayMonth(post.date);

                return (
                  <div key={post._id} className="col-lg-4 col-md-6 mb-4">
                    <div
                      className="d-block hover relative rounded-20 overflow-hidden text-light"
                      onClick={() => navigate(`/news/${post._id}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && navigate(`/news/${post._id}`)}
                      style={{
                        cursor: "pointer",
                        background: "rgba(0,0,0,0.4)",
                        borderRadius: 20,
                      }}
                    >
                      <div
                        className="abs z-2 bg-color rounded-2 text-white p-3 pb-2 m-4 text-center fw-600"
                        style={{ background: "#0E00A7", borderRadius: 12 }}
                      >
                        <h4 className="fs-36 mb-0 lh-1">{day}</h4>
                        <span>{month}</span>
                      </div>

                      <img
                        src={post.image || "/images/news.jpg"}
                        className="w-100 hover-scale-1-1"
                        style={{
                          objectFit: "cover",
                          height: 300,
                          borderRadius: 20,
                        }}
                        alt={post.title}
                      />

                      <div
                        className="absolute start-0 bottom-0 p-4 z-2"
                        style={{
                          background:
                            "linear-gradient(to top,rgba(0,0,0,0.7),transparent)",
                          borderRadius: 20,
                        }}
                      >
                        <h4>{post.title}</h4>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
