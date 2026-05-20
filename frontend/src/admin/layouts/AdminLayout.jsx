import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/admin.css";

const MENU_STRUCTURE = [
  {
    title: "Бидний тухай",
    icon: "fas fa-info-circle",
    subMenu: [
      { name: "Захирлын мэндчилгээ", path: "director-settings" },
      { name: "Алсын хараа", path: "contact-settings" },
      { name: "Алба хаагчид", path: "staff-settings" },
    ],
  },
  {
    title: "Инкубатор",
    icon: "fas fa-rocket",
    subMenu: [
      { name: "Статистик", path: "stats-settings" },
      { name: "Хамтрагчид", path: "partner-settings" },
    ],
  },
  { title: "Мэдээ мэдээлэл", icon: "fas fa-newspaper", path: "news-settings" },
  { title: "Сургалтын төв", icon: "fas fa-graduation-cap", path: "training-settings" },
  { title: "Аналитик", icon: "fas fa-chart-line", path: "analytics" },
  { title: "Мэдэгдэл", icon: "fas fa-bell", path: "alert-settings", hasBadge: true },
  { title: "Түрээсийн удирдлага", icon: "fas fa-key", path: "rent-settings" },
];

const AdminLayout = () => {
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSubMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="admin-container">
      <aside className="side-bar">
        <div className="user-profile">
          <div className="avatar">
            <img src="/images/003.png" alt="Admin" />
          </div>
          <div className="user-info">
            <span className="role">IT PARK MONGOLIA</span>
            <span className="name">Admin Panel</span>
          </div>
        </div>

        <nav className="menu">
          {MENU_STRUCTURE.map((item) => {
            const isSubMenuOpen = openMenus[item.title];

            return (
              <div className="item" key={item.title}>
                {item.subMenu ? (
                  <>
                    <button
                      type="button"
                      className={`sub-btn ${isSubMenuOpen ? "active-parent" : ""}`}
                      onClick={() => toggleSubMenu(item.title)}
                    >
                      <span>
                        <i className={item.icon}></i> {item.title}
                      </span>
                      <i className={`fas fa-chevron-right arrow ${isSubMenuOpen ? "rotate" : ""}`}></i>
                    </button>
                    <div className={`sub-menu-wrapper ${isSubMenuOpen ? "show" : ""}`}>
                      {item.subMenu.map((sub) => (
                        <Link key={sub.path} to={`/admin/${sub.path}`} className="sub-item">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={`/admin/${item.path}`}
                    className={`sub-item-link ${location.pathname.includes(item.path) ? "active-link" : ""}`}
                  >
                    <i className={item.icon}></i>
                    <span>{item.title}</span>
                    {item.hasBadge && <span className="notif-badge">0</span>}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="back-btn-container">
          <button className="logout-btn" onClick={() => navigate("/login")}>
            <i className="fas fa-sign-out-alt"></i> Гарах
          </button>
        </div>
      </aside>

      <main id="content-area">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
