import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navGroups = [
  {
    key: "about",
    label: "Бидний тухай",
    to: "/",
    items: [
      { label: "Захирлын мэндчилгээ", to: "/director" },
      { label: "Алсын хараа, эрхэм зорилго", to: "/vision-mission" },
      { label: "Алба хаагчдын мэдээлэл", to: "/staff" },
      { label: "Байгууллагын түүх", to: "/roadmap" },
      { label: "Хууль эрх зүй", to: "#" },
    ],
  },
  {
    key: "incubator",
    label: "Инкубатор",
    to: "/incubator",
    items: [
      { label: "Инкубатор хөтөлбөр", to: "/incubator-service" },
      { label: "Сонгон шалгаруулалт", to: "/incubator-program" },
      { label: "Бүрдүүлэх материал", to: "/digital-incubator" },
      { label: "Төсөл хөтөлбөр", to: "/coworking" },
      { label: "Хамтын оффис", to: "#" },
    ],
  },
  {
    key: "training",
    label: "Сургалтын төв",
    to: "/training-center",
    items: [
      { label: "Мэргэшүүлэх сургалт", to: "/training-center" },
      { label: "Мэдээллийн технологийн инженерийн шалгалт", to: "/it-engineer-exam" },
      { label: "Компьютерын хэрэглээний гэрчилгээ олгох шалгалт", to: "/it-practical-skill-exam" },
      { label: "Мэдээллийн технологийн практик ур чадварын шалгалт", to: "/computer-usage-exam" },
    ],
  },
];

const simpleLinks = [
  { label: "Мэдээ мэдээлэл", to: "/news" },
  { label: "Түрээс", to: "/rent" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

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
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (key) => {
    setOpenDropdown((current) => (current === key ? null : key));
  };

  const renderNavItem = (item) => {
    if (item.to === "#") {
      return (
        <a href={item.to} className="itp-mega-icon-card" onClick={closeMobileMenu} key={item.label}>
          <h4>{item.label}</h4>
        </a>
      );
    }

    return (
      <Link to={item.to} className="itp-mega-icon-card" onClick={closeMobileMenu} key={item.label}>
        <h4>{item.label}</h4>
      </Link>
    );
  };

  return (
    <header className="itp-header">
      <div className="itp-nav-container">
        <div className="itp-logo">
          <Link to="/" onClick={closeMobileMenu}>
            <img src="/images/002.png" alt="IT Park Logo" />
          </Link>
        </div>

        <button
          className="menu-toggle"
          id="menu-toggle"
          type="button"
          aria-label="Цэс нээх"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`} />
        </button>

        <nav className={`itp-mainnav ${isMenuOpen ? "active" : ""}`}>
          <ul>
            {navGroups.slice(0, 2).map((group) => (
              <li className="itp-nav-item has-megamenu" key={group.key}>
                <div className="mobile-nav-row">
                  <Link to={group.to} onClick={closeMobileMenu}>
                    {group.label}
                  </Link>
                  <button
                    className="mobile-submenu-toggle"
                    type="button"
                    aria-label={`${group.label} дэд цэс`}
                    aria-expanded={openDropdown === group.key}
                    onClick={() => toggleDropdown(group.key)}
                  >
                    <i className={`fa-solid ${openDropdown === group.key ? "fa-chevron-up" : "fa-chevron-down"}`} />
                  </button>
                </div>

                <div className="itp-megamenu apple-style">
                  <div className="astanahub-grid">{group.items.map((item) => renderNavItem(item))}</div>
                </div>

                <div className={`mobile-dropdown ${openDropdown === group.key ? "active" : ""}`}>
                  {group.items.map((item) =>
                    item.to === "#" ? (
                      <a href={item.to} onClick={closeMobileMenu} key={item.label}>
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.to} onClick={closeMobileMenu} key={item.label}>
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </li>
            ))}

            <li className="itp-nav-item">
              <Link to={simpleLinks[0].to} onClick={closeMobileMenu}>
                {simpleLinks[0].label}
              </Link>
            </li>

            {navGroups.slice(2).map((group) => (
              <li className="itp-nav-item has-megamenu" key={group.key}>
                <div className="mobile-nav-row">
                  <Link to={group.to} onClick={closeMobileMenu}>
                    {group.label}
                  </Link>
                  <button
                    className="mobile-submenu-toggle"
                    type="button"
                    aria-label={`${group.label} дэд цэс`}
                    aria-expanded={openDropdown === group.key}
                    onClick={() => toggleDropdown(group.key)}
                  >
                    <i className={`fa-solid ${openDropdown === group.key ? "fa-chevron-up" : "fa-chevron-down"}`} />
                  </button>
                </div>

                <div className="itp-megamenu apple-style">
                  <div className="astanahub-grid">{group.items.map((item) => renderNavItem(item))}</div>
                </div>

                <div className={`mobile-dropdown ${openDropdown === group.key ? "active" : ""}`}>
                  {group.items.map((item) => (
                    <Link to={item.to} onClick={closeMobileMenu} key={item.label}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </li>
            ))}

            <li className="itp-nav-item">
              <Link to={simpleLinks[1].to} onClick={closeMobileMenu}>
                {simpleLinks[1].label}
              </Link>
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
