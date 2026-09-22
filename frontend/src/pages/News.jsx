import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../lib/api";

const getNewsPath = (post) => `/news/${post.slug || post._id}`;

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
  }, []);

  const dayMonth = (dateStr) => {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return { day: "", month: "" };
    return { day: d.getDate(), month: `${d.getMonth() + 1} сар` };
  };

  return (
    <div id="wrapper">
      <div className="itp-overlay"></div>

      <section className="news-index-section">
        <div className="container">
          <div className="news-index-heading">
            <span>IT Park</span>
            <h1>Мэдээ мэдээлэл</h1>
          </div>
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
                  <div key={post._id} className="col-lg-4 col-md-6">
                    <article
                      className="news-card news-index-card"
                      onClick={() => navigate(getNewsPath(post))}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && navigate(getNewsPath(post))}
                    >
                      <div className="news-card-media">
                        <img
                          src={post.image || "/images/news.jpg"}
                          alt={post.title}
                        />
                      </div>
                      <div className="meta">
                        <span className="date">{day} {month}</span>
                        <h3>{post.title}</h3>
                        <span className="news-card-link">Дэлгэрэнгүй <span aria-hidden="true">→</span></span>
                      </div>
                    </article>
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
