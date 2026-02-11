import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const API_BASE = useMemo(() => {
    return import.meta.env.VITE_API_BASE || "http://localhost:5050";
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      window.dispatchEvent(new Event("load"));
      window.dispatchEvent(new Event("resize"));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!id) return;
    let alive = true;

    async function loadDetailAndRelated() {
      setLoading(true);
      setErr("");

      try {
        const [resDetail, resList] = await Promise.all([
          fetch(`${API_BASE}/api/news/${id}`),
          fetch(`${API_BASE}/api/news`),
        ]);

        const data = await resDetail.json();
        const list = await resList.json();

        if (!alive) return;

        setDetail(data);
        setRelated(
          (Array.isArray(list) ? list : [])
            .filter((n) => n._id !== id)
            .slice(0, 5)
        );
      } catch (e) {
        console.error("NEWS DETAIL ERROR:", e);
        if (!alive) return;
        setErr("⚠️ Мэдээний дэлгэрэнгүй татахад алдаа гарлаа.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadDetailAndRelated();
    return () => {
      alive = false;
    };
  }, [API_BASE, id]);

  const formatLong = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div id="wrapper" className="news-detail-page">
      <div className="itp-overlay"></div>

      <main className="container news-detail-layout">
        {/* ARTICLE */}
        <article className="news-article">
          {loading ? (
            <div className="news-content">Loading...</div>
          ) : err ? (
            <div className="news-content" style={{ color: "red" }}>
              {err}
            </div>
          ) : !detail ? (
            <div className="news-content" style={{ color: "white" }}>
              Not found.
            </div>
          ) : (
            <>
              <div className="news-hero">
                <img
                  id="detail-image"
                  src={detail.image || "/images/placeholder.jpg"}
                  alt="News"
                />
              </div>

              <div className="news-meta">
                <span id="detail-date">{formatLong(detail.date)}</span>
                <span className="dot">•</span>
                <span className="source">IT Park News</span>
              </div>

              <h1 id="detail-title" className="news-title">
                {detail.title}
              </h1>

              {/* ⚠️ backend дээр content HTML байгаа тул dangerouslySetInnerHTML хэрэглэнэ */}
              <div
                id="detail-content"
                className="news-content"
                dangerouslySetInnerHTML={{
                  __html: detail.content || "",
                }}
              />
            </>
          )}
        </article>

        {/* SIDEBAR */}
        <aside className="news-sidebar">
          <h5 className="sidebar-title">Бусад мэдээ</h5>

          <div id="related-news" className="sidebar-list">
            {related.map((n) => (
              <div
                key={n._id}
                className="sidebar-item"
                onClick={() => navigate(`/news/${n._id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/news/${n._id}`)}
              >
                <img src={n.image || "/images/placeholder.jpg"} alt={n.title} />
                <div>
                  <h6>{n.title}</h6>
                  <small>{new Date(n.date).toLocaleDateString()}</small>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
