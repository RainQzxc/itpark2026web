const API_BASE = process.env.NEWS_API_BASE || "https://itpark2026web.onrender.com";
const SITE_TITLE = "Мэдээллийн Технологийн Үндэсний Парк";
const SITE_URL = "https://www.itpark.mn";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const stripHtml = (value = "") => String(value).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const absoluteUrl = (value, fallback) => {
  if (!value) return fallback;
  try {
    return new URL(value, SITE_URL).toString();
  } catch {
    return fallback;
  }
};

const injectMeta = (html, meta) => {
  const headClose = html.indexOf("</head>");
  if (headClose === -1) return html;

  const cleaned = html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+(?:name|property)=["'](?:description|og:[^"']+|twitter:[^"']+)["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "");

  const tags = `
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <link rel="canonical" href="${escapeHtml(meta.url)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${escapeHtml(SITE_TITLE)}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:url" content="${escapeHtml(meta.url)}" />
    <meta property="og:image" content="${escapeHtml(meta.image)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(meta.image)}" />
    <meta property="og:image:alt" content="${escapeHtml(meta.title)}" />
    <meta property="og:locale" content="mn_MN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${escapeHtml(meta.image)}" />
  `;

  return cleaned.replace("</head>", `${tags}\n  </head>`);
};

export default async function handler(req, res) {
  const slug = String(req.query.slug || "").trim();
  const host = req.headers.host || "www.itpark.mn";
  const protocol = host.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  try {
    const [articleRes, indexRes] = await Promise.all([
      fetch(`${API_BASE}/api/news/${encodeURIComponent(slug)}`),
      fetch(`${origin}/`),
    ]);

    let article = articleRes.ok ? await articleRes.json() : null;

    if (!article) {
      const listRes = await fetch(`${API_BASE}/api/news`);
      const list = listRes.ok ? await listRes.json() : [];
      article = Array.isArray(list)
        ? list.find((item) => item.slug === slug || item._id === slug)
        : null;
    }

    if (!article) {
      res.status(404).send("News not found");
      return;
    }

    const html = await indexRes.text();
    const url = `${SITE_URL}/news/${article.slug || slug}`;
    const title = article.title || SITE_TITLE;
    const description =
      stripHtml(article.shortText || article.content).slice(0, 180) ||
      SITE_TITLE;
    const image = absoluteUrl(article.image, `${SITE_URL}/images/news.jpg`);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=300");
    res.status(200).send(injectMeta(html, { title, description, image, url }));
  } catch (error) {
    res.status(500).send(error?.message || "News metadata error");
  }
}
