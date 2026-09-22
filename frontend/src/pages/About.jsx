import { Link } from "react-router-dom";

const SECTIONS = [
  { to: "/director", title: "Захирлын мэндчилгээ" },
  { to: "/vision-mission", title: "Алсын хараа, эрхэм зорилго" },
  { to: "/staff", title: "Алба хаагчдын мэдээлэл" },
  { to: "/roadmap", title: "Байгууллагын түүх" },
];

export default function About() {
  return (
    <section className="about-page">
      <div className="container">
        <div className="about-page-heading">
          <span>Мэдээллийн технологийн үндэсний парк</span>
          <h1>Бидний тухай</h1>
          <p>
            Байгууллагын удирдлага, алсын хараа, хамт олон болон түүхэн
            замналтай танилцана уу.
          </p>
        </div>

        <div className="about-page-grid">
          {SECTIONS.map((section) => (
            <Link key={section.to} to={section.to} className="about-page-card">
              <h2>{section.title}</h2>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
