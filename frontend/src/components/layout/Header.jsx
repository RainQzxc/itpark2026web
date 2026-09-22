import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const VIRTUAL_ZONE_URL = "https://e-business.mn/home";
const E_ZASAG_URL = "https://e-zasag.mn/";

const NAV_ITEMS = [
  { to: "/about", label: "Бидний тухай" },
  { to: "/incubator", label: "Инкубатор" },
  { to: "/news", label: "Мэдээ мэдээлэл" },
  { to: "/training-center", label: "Сургалтын төв" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector(".itp-header");
    const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 50);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="itp-header">
      <div className="itp-nav-container">
        <div className="itp-logo">
          <Link to="/" onClick={closeMobileMenu}>
            <img src="/images/logo-light/2.webp" alt="IT Park Logo" />
          </Link>
        </div>

        <button
          className={`menu-toggle ${mobileOpen ? "is-open" : ""}`}
          id="menu-toggle"
          type="button"
          aria-label="Цэс"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span></span>
          <span></span>
        </button>

        <nav className="itp-mainnav" aria-label="Үндсэн цэс">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li className="itp-nav-item" key={item.to}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="de-flex-col itp-header-actions">
          <a
            className="itp-ezasag-button"
            href={E_ZASAG_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="e-zasag.mn"
          >
            <img src="/images/e-zasag/logo-dark.png" alt="e-zasag.mn" />
          </a>
          <a
            className="btn-main mx-2 fx-slide btn-swap"
            href={VIRTUAL_ZONE_URL}
            target="_blank"
            rel="noreferrer"
          >
            <span>ВИРТУАЛ БҮС</span>
          </a>
        </div>

        <div
          id="mobile-navigation"
          className={`itp-mobile-menu ${mobileOpen ? "is-open" : ""}`}
          aria-hidden={!mobileOpen}
        >
          <div className="itp-mobile-panel">
            {NAV_ITEMS.map((item) => (
              <NavLink
                className="mobile-menu-link"
                key={item.to}
                to={item.to}
                onClick={closeMobileMenu}
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mobile-menu-actions">
              <a
                className="mobile-action-card mobile-action-ezasag"
                href={E_ZASAG_URL}
                target="_blank"
                rel="noreferrer"
                onClick={closeMobileMenu}
              >
                <img className="mobile-ezasag-logo" src="/images/e-zasag/logo-dark.png" alt="e-zasag.mn" />
              </a>
              <a
                className="mobile-action-card mobile-action-virtual"
                href={VIRTUAL_ZONE_URL}
                target="_blank"
                rel="noreferrer"
                onClick={closeMobileMenu}
              >
                ВИРТУАЛ БҮС
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
