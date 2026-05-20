import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

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

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
  };

  const toggleMobileDropdown = (name) => {
    setMobileDropdown((current) => (current === name ? null : name));
  };

  return (
    <header className="itp-header">
      <div className="itp-nav-container">
        <div className="itp-logo">
          <Link to="/">
            <img src="/images/002.png" alt="IT Park Logo" />
          </Link>
        </div>

        {/* 🌐 Toggle icon (дараа нь mobile menu logic нэмнэ) */}
        <button
          className={`menu-toggle ${mobileOpen ? "is-open" : ""}`}
          id="menu-toggle"
          type="button"
          aria-label="Цэс"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span></span>
          <span></span>
        </button>

        <nav className="itp-mainnav">
          <ul>
            <li className="itp-nav-item has-megamenu">
              <Link to="/">Бидний тухай</Link>

              <div className="itp-megamenu apple-style">
                <div className="astanahub-grid">
                  <Link to="/director" className="itp-mega-icon-card">
                    <h4>Захирлын мэндчилгээ</h4>
                  </Link>
                  <Link to="/vision-mission" className="itp-mega-icon-card">
                    <h4>Алсын хараа, эрхэм зорилго</h4>
                  </Link>
                  <Link to="/staff" className="itp-mega-icon-card">
                    <h4>Алба хаагчдын мэдээлэл</h4>
                  </Link>
                  <Link to="/roadmap" className="itp-mega-icon-card">
                    <h4>Байгууллагын түүх</h4>
                  </Link>
                  <a href="#" className="itp-mega-icon-card">
                    <h4>Хууль эрх зүй</h4>
                  </a>
                </div>
              </div>
            </li>

            <li className="itp-nav-item has-megamenu">
              <Link to="/incubator">Инкубатор</Link>

              <div className="itp-megamenu apple-style">
                <div className="astanahub-grid">
                  <Link to="/incubator-service" className="itp-mega-icon-card">
                    <h4>Инкубатор хөтөлбөр</h4>
                  </Link>

                  <Link to="/incubator-program" className="itp-mega-icon-card">
                    <h4>Сонгон шалгаруулалт</h4>
                  </Link>

                  <Link to="/digital-incubator" className="itp-mega-icon-card">
                    <h4>Бүрдүүлэх материал</h4>
                  </Link>

                  <Link to="/coworking" className="itp-mega-icon-card">
                    <h4>Төсөл хөтөлбөр</h4>
                  </Link>

                  <a href="#" className="itp-mega-icon-card">
                    <h4>Хамтын оффис</h4>
                  </a>
                </div>
              </div>
            </li>

            <li className="itp-nav-item">
              <Link to="/news">Мэдээ мэдээлэл</Link>
            </li>

            <li className="itp-nav-item has-megamenu">
              <Link to="/training-center">Сургалтын төв</Link>

              <div className="itp-megamenu apple-style">
                <div className="astanahub-grid">
                  <Link to="/training-center" className="itp-mega-icon-card">
                    <h4>Мэргэшүүлэх сургалт </h4>
                  </Link>

                  <Link to="/it-engineer-exam" className="itp-mega-icon-card">
                    <h4>
                      Мэдээллийн технологийн<br />
                      <span className="sub-line">инженерийн шалгалт</span>
                    </h4>
                  </Link>

                  <Link to="/it-practical-skill-exam" className="itp-mega-icon-card">
                    <h4>
                      Компьютерын хэрэглээний<br />
                      <span className="sub-line">гэрчилгээ олгох шалгалт</span>
                    </h4>
                  </Link>

                  <Link to="/computer-usage-exam" className="itp-mega-icon-card">
                    <h4>
                      Мэдээллийн технологийн практик<br />
                      <span className="sub-line">ур чадварын шалгалт</span>
                    </h4>
                  </Link>
                </div>
              </div>
            </li>

            <li className="itp-nav-item">
              <Link to="/rent">Түрээс</Link>
            </li>
          </ul>
        </nav>

        <div className="de-flex-col">
          <a className="btn-main mx-2 fx-slide btn-swap" href="#">
            <span>ВИРТУАЛ БҮС</span>
          </a>

          {/* анхаарах: index_en.html биш /en route болгох боломжтой */}
          <a className="btn-main btn-line fx-slide" href="/index_en.html">
            <span>MN</span>
          </a>
        </div>

        <div className={`itp-mobile-menu ${mobileOpen ? "is-open" : ""}`}>
          <div className="itp-mobile-panel">
            <div className="mobile-menu-group">
              <button
                type="button"
                className="mobile-menu-heading"
                aria-expanded={mobileDropdown === "about"}
                onClick={() => toggleMobileDropdown("about")}
              >
                <span>Бидний тухай</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div className={`mobile-dropdown ${mobileDropdown === "about" ? "active" : ""}`}>
                <Link to="/director" onClick={closeMobileMenu}>Захирлын мэндчилгээ</Link>
                <Link to="/vision-mission" onClick={closeMobileMenu}>Алсын хараа, эрхэм зорилго</Link>
                <Link to="/staff" onClick={closeMobileMenu}>Алба хаагчдын мэдээлэл</Link>
                <Link to="/roadmap" onClick={closeMobileMenu}>Байгууллагын түүх</Link>
              </div>
            </div>

            <div className="mobile-menu-group">
              <button
                type="button"
                className="mobile-menu-heading"
                aria-expanded={mobileDropdown === "incubator"}
                onClick={() => toggleMobileDropdown("incubator")}
              >
                <span>Инкубатор</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div className={`mobile-dropdown ${mobileDropdown === "incubator" ? "active" : ""}`}>
                <Link to="/incubator" onClick={closeMobileMenu}>Инкубатор</Link>
                <Link to="/incubator-service" onClick={closeMobileMenu}>Инкубатор хөтөлбөр</Link>
                <Link to="/incubator-program" onClick={closeMobileMenu}>Сонгон шалгаруулалт</Link>
                <Link to="/digital-incubator" onClick={closeMobileMenu}>Бүрдүүлэх материал</Link>
              </div>
            </div>

            <Link className="mobile-menu-link" to="/news" onClick={closeMobileMenu}>Мэдээ мэдээлэл</Link>

            <div className="mobile-menu-group">
              <button
                type="button"
                className="mobile-menu-heading"
                aria-expanded={mobileDropdown === "training"}
                onClick={() => toggleMobileDropdown("training")}
              >
                <span>Сургалтын төв</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div className={`mobile-dropdown ${mobileDropdown === "training" ? "active" : ""}`}>
                <Link to="/training-center" onClick={closeMobileMenu}>Мэргэшүүлэх сургалт</Link>
                <Link to="/it-engineer-exam" onClick={closeMobileMenu}>Инженерийн шалгалт</Link>
                <Link to="/it-practical-skill-exam" onClick={closeMobileMenu}>Гэрчилгээ олгох шалгалт</Link>
                <Link to="/computer-usage-exam" onClick={closeMobileMenu}>Практик ур чадварын шалгалт</Link>
              </div>
            </div>

            <Link className="mobile-menu-link" to="/rent" onClick={closeMobileMenu}>Түрээс</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
