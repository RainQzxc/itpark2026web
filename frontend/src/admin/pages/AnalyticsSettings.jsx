const VERCEL_ANALYTICS_URL = "https://vercel.com/rainqzxcs-projects/frontend/analytics";

export default function AnalyticsSettings() {
  return (
    <section className="analytics-page">
      <div className="analytics-header">
        <div>
          <p className="analytics-eyebrow">Vercel Web Analytics</p>
          <h1>Сайтын аналитик</h1>
          <p>
            Хуудасны үзэлт, хэрэглэгчийн төхөөрөмж, улс, referrer зэрэг мэдээллийг
            Vercel dashboard дээрээс шууд харна.
          </p>
        </div>
        <a
          className="analytics-open-btn"
          href={VERCEL_ANALYTICS_URL}
          target="_blank"
          rel="noreferrer"
        >
          <i className="fas fa-chart-line"></i>
          Analytics нээх
        </a>
      </div>

      <div className="analytics-grid">
        <article className="analytics-card">
          <i className="fas fa-signal"></i>
          <h2>Tracking идэвхтэй</h2>
          <p>
            `@vercel/analytics` нэмэгдсэн тул Vercel дээр deploy хийсний дараа
            page view автоматаар бүртгэгдэнэ.
          </p>
        </article>

        <article className="analytics-card">
          <i className="fas fa-clock"></i>
          <h2>Өгөгдөл гарч ирэх хугацаа</h2>
          <p>
            Шинэ deploy live болсны дараа analytics dashboard дээр мэдээлэл
            харагдахад бага зэрэг хугацаа шаардагдаж болно.
          </p>
        </article>

        <article className="analytics-card">
          <i className="fas fa-lock"></i>
          <h2>Нэвтрэлт шаардлагатай</h2>
          <p>
            Vercel analytics нь таны Vercel account дээр хамгаалагдсан байдаг тул
            admin panel дотор шууд embed хийх боломжгүй.
          </p>
        </article>
      </div>
    </section>
  );
}
