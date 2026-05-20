import { useLocation, useRoutes } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Analytics } from "@vercel/analytics/react";
import { routes } from "./lib/routes";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default function App() {
  const location = useLocation();
  const routeElements = useRoutes(routes);

  // /admin-аар эхэлсэн ЭСВЭЛ яг /login зам дээр байвал "true" болно
  const isAuthOrAdmin = useMemo(() => {
    const path = location.pathname.toLowerCase();
    return path.startsWith("/admin") || path === "/login";
  }, [location.pathname]);

  useEffect(() => {
    if (!isAuthOrAdmin) {
      // Энгийн хэрэглэгчийн хуудаснууд
      const t = setTimeout(() => {
        window.dispatchEvent(new Event("load"));
        window.dispatchEvent(new Event("resize"));
        document.body.className = "dark-scheme hero-full";
      }, 100);
      return () => clearTimeout(t);
    } else {
      // Логин болон Админ хуудасны body класс
      document.body.className = "admin-body"; 
    }
  }, [isAuthOrAdmin]);

  return (
    <div className={isAuthOrAdmin ? "app-shell app-shell-auth" : "app-shell"}>
      {/* Login болон Admin биш үед л Header харагдана */}
      {!isAuthOrAdmin && <Header />}

      <main className="app-main">
        {routeElements}
      </main>

      {/* Login болон Admin биш үед л Footer харагдана */}
      {!isAuthOrAdmin && <Footer />}
      <Analytics />
    </div>
  );
}
