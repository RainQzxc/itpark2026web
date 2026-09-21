import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE } from "../lib/api";
import { sanitizeHtml } from "../lib/sanitizeHtml";

const getNewsPath = (post) => `/news/${post.slug || post._id}`;
const getAbsoluteNewsUrl = (post) => `${window.location.origin}${getNewsPath(post)}`;

const stripHtml = (value = "") => value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const hasHtml = (value = "") => /<\/?[a-z][\s\S]*>/i.test(value);

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatNewsContent = (value = "") => {
  const content = String(value || "").trimEnd();
  if (!content.trim()) return "";
  if (hasHtml(content)) return content;

  return content
    .split(/\n\s*\n/g)
    .map((block) => {
      const isIndented = /^\s+/.test(block);
      const html = escapeHtml(block.trim()).replace(/\n/g, "<br />");
      return `<p class="${isIndented ? "news-paragraph is-indented" : "news-paragraph"}">${html}</p>`;
    })
    .join("");
};

const setMetaTag = (selector, attrName, attrValue, content) => {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

export default function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
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

        const list = await resList.json();
        const allNews = Array.isArray(list) ? list : [];
        const data = resDetail.ok
          ? await resDetail.json()
          : allNews.find((item) => item.slug === id || item._id === id);

        if (!alive) return;
        if (!data || data.error) {
          setDetail(null);
          setErr("Мэдээ олдсонгүй.");
          return;
        }

        setDetail(data);
        const currentId = data?._id || id;
        const currentSlug = data?.slug || id;
        setRelated(allNews.filter((n) => n._id !== currentId && n.slug !== currentSlug).slice(0, 5));
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

  useEffect(() => {
    if (!detail) return;

    const url = getAbsoluteNewsUrl(detail);
    const title = detail.title || "Мэдээллийн Технологийн Үндэсний Парк";
    const description =
      stripHtml(detail.shortText || detail.content).slice(0, 180) ||
      "Мэдээллийн Технологийн Үндэсний Парк";
    const image = detail.image || `${window.location.origin}/images/news.jpg`;

    document.title = title;
    setMetaTag('meta[name="description"]', "name", "description", description);
    setMetaTag('meta[property="og:title"]', "property", "og:title", title);
    setMetaTag('meta[property="og:description"]', "property", "og:description", description);
    setMetaTag('meta[property="og:image"]', "property", "og:image", image);
    setMetaTag('meta[property="og:url"]', "property", "og:url", url);
    setMetaTag('meta[property="og:type"]', "property", "og:type", "article");
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", image);
  }, [detail]);

  const formatLong = (dateStr) => {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return "";
    return `${d.getMonth() + 1} сарын ${d.getDate()}`;
  };

  const shareNews = () => {
    if (!detail) return;
    const url = getAbsoluteNewsUrl(detail);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const copyNewsLink = async () => {
    if (!detail) return;
    const url = getAbsoluteNewsUrl(detail);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy news link", url);
    }
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
                  src={detail.image || "/images/news.jpg"}
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

              <div className="news-share-row">
                <button type="button" className="news-share-btn" onClick={shareNews}>
                  <i className="fa-brands fa-facebook-f"></i>
                  <span>Share</span>
                </button>
                <button type="button" className="news-share-btn news-share-btn-light" onClick={copyNewsLink}>
                  <i className="fa-solid fa-link"></i>
                  <span>{copied ? "Copied" : "Copy link"}</span>
                </button>
              </div>

              <div
                id="detail-content"
                className="news-content"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(formatNewsContent(detail.content)),
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
                onClick={() => navigate(getNewsPath(n))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(getNewsPath(n))}
              >
                <img src={n.image || "/images/news.jpg"} alt={n.title} />
                <div>
                  <h6>{n.title}</h6>
                  <small>{formatLong(n.date)}</small>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
