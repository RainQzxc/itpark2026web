import { NavLink, useLocation } from "react-router-dom";

const SECTIONS = [
  {
    paths: ["/about", "/director", "/vision-mission", "/staff", "/roadmap"],
    label: "Бидний тухай",
    links: [
      { to: "/about", label: "Бидний тухай", end: true },
      { to: "/director", label: "Захирлын мэндчилгээ" },
      { to: "/vision-mission", label: "Алсын хараа, эрхэм зорилго" },
      { to: "/staff", label: "Алба хаагчдын мэдээлэл" },
      { to: "/roadmap", label: "Байгууллагын түүх" },
    ],
  },
  {
    paths: ["/incubator", "/incubator-service", "/incubator-program", "/digital-incubator"],
    label: "Инкубатор",
    links: [
      { to: "/incubator", label: "Инкубатор", end: true },
      { to: "/incubator-service", label: "Инкубатор хөтөлбөр" },
      { to: "/incubator-program", label: "Сонгон шалгаруулалт" },
      { to: "/digital-incubator", label: "Бүрдүүлэх материал" },
    ],
  },
  {
    test: (path) => path === "/training-center" || path.startsWith("/training/"),
    label: "Сургалтын төв",
    links: [{ to: "/training-center", label: "Сургалтууд", end: true }],
  },
];

export default function SectionSubnav() {
  const { pathname } = useLocation();
  const path = pathname.toLowerCase();
  const section = SECTIONS.find((item) => item.paths?.includes(path) || item.test?.(path));

  if (!section) return null;

  return (
    <nav className="about-subnav section-subnav" aria-label={`${section.label} дэд цэс`}>
      <div className="about-subnav-inner section-subnav-inner">
        {section.links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
