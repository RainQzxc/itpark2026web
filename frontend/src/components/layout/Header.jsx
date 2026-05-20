import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const aboutLinks = [
  { to: "/director", label: "Захирлын мэндчилгээ" },
  { to: "/vision-mission", label: "Алсын хараа, эрхэм зорилго" },
  { to: "/staff", label: "Алба хаагчдын мэдээлэл" },
  { to: "/roadmap", label: "Байгууллагын түүх" },
];

const incubatorLinks = [
  { to: "/incubator-service", label: "Инкубатор хөтөлбөр" },
  { to: "/incubator-program", label: "Сонгон шалгаруулалт" },
  { to: "/digital-incubator", label: "Бүрдүүлэх материал" },
  { to: "/coworking", label: "Төсөл хөтөлбөр" },
];

const trainingLinks = [
  { to: "/training-center", label: "Мэргэшүүлэх сургалт" },
  { to: "/it-engineer-exam", label: "Мэдээллийн технологийн инженерийн шалгалт" },
  { to: "/it-practical-skill-exam", label: "Компьютерын хэрэглээний гэрчилгээ олгох шалгалт" },
  { to: "/computer-usage-exam", label: "Мэдээллийн технологийн практик ур чадварын шалгалт" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector(".itp-header");

    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 50) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const renderMegaLinks = (links) => (
    <div className="itp-megamenu apple-style">
      <div className="astanahub-grid">
        {links.map((item) => (
          <Link key={item.to} to={item.to} className="itp-mega-icon-card" onClick={closeMenu}>
            <h4>{item.label}</h4>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <header className={`itp-header ${isMenuOpen ? "mobile-open" : ""}`}>
      <div className="itp-nav-container">
        <div className="itp-logo">
          <Link to="/" onClick={closeMenu}>
            <img src="/images/002.png" alt="IT Park Logo" />
          </Link>
        </div>

        <button
          className="menu-toggle"
          id="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>

        <nav className={`itp-mainnav ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li className="itp-nav-item has-megamenu">
              <Link to="/" onClick={closeMenu}>Бидний тухай</Link>
              {renderMegaLinks(aboutLinks)}
            </li>

            <li className="itp-nav-item has-megamenu">
              <Link to="/incubator" onClick={closeMenu}>Инкубатор</Link>
              {renderMegaLinks(incubatorLinks)}
            </li>

            <li className="itp-nav-item">
              <Link to="/news" onClick={closeMenu}>Мэдээ мэдээлэл</Link>
            </li>

            <li className="itp-nav-item has-megamenu">
              <Link to="/training-center" onClick={closeMenu}>Сургалтын төв</Link>
              {renderMegaLinks(trainingLinks)}
            </li>

            <li className="itp-nav-item">
              <Link to="/rent" onClick={closeMenu}>Түрээс</Link>
            </li>
          </ul>
        </nav>

        <div className="de-flex-col">
          <a className="btn-main mx-2 fx-slide btn-swap" href="#">
            <span>ВИРТУАЛ БҮС</span>
          </a>

          <a className="btn-main btn-line fx-slide" href="/index_en.html">
            <span>MN</span>
          </a>
        </div>
      </div>
    </header>
  );
}
