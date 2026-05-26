import { useEffect, useMemo, useState } from "react";
import { API_BASE } from "../lib/api";

// Хуучин JS дээр байсан profiles array-г React дээр шууд оруулна
const PROFILES = [
  {
    name: "Намсрай Авирмэд",
    year: "1972,1975-1976 онд ажиллаж байсан",
    title: "Албан тушаал:Захирлын албыг түр хавсран гүйцэтгэгч",
    img: "/images/director/z1.png",
    desc:
      "Товч намтар:\n1967-1972 онд Сайд нарын Зөвлөлийн Улсын төлөвлөгөөний комисст орлогч дарга,\n1972-1977 онд Шинжлэх ухаан, техникийн Улсын хорооны орлогч дарга, ШУТИС-ны захирлын үүрэг гүйцэтгэгч,\n1977-1983 онд Москвад Удирлагын асуудал судлах олон улсын эрдэм шинжилгээний ахлах ажилтан,\n1983-1990 онд Шинжлэх ухаан, дээд боловсролын Улсын хороонд хэлтсийн дарга тус тус хийж байв",
  },
  {
    name: "Насантогтох Хүүхэнжимээ",
    year: "1973-1980 онд ажиллаж байсан",
    title: "Албан тушаал: ШУТМТ-н Захирал",
    img: "/images/director/z2.png",
    desc:
      "Товч намтар:\n1973-1975, 1976-1980 онуудад ШУТМ-н Олон улсын төвийн гишүүн орнуудын Бүрэн эрхт төлөөлөгч,\n1973-1980 онуудад ШУТИС-ны захирал",
  },
  {
    name: "Бат Амгалан",
    year: "1979-1980 онд ажиллаж байсан",
    title: "Албан тушаал: Захирлын үүрэг гүйцэтгэгч",
    img: "/images/director/z3.png",
    desc:
      "Товч намтар:\n1972-1980 онд ШУТУХ-нд мэргэжилтэн\n1980-1982 онд ШУТИС-ийн орлогч дарга,Захирлын үүрэг гүйцэтгэгч \n1982-1996 онд ШУТИС-ны эрдэм шинжилгээний ажилтнаар ажиллаж байв.",
  },
  {
    name: "Түдэв Доржбал",
    year: "1981-1997 онд ажиллаж байсан",
    title: "Албан тушаал: Захирал",
    img: "/images/director/z4.png",
    desc:
      "Товч намтар:\n1974 оноос Тэр үеийн Аж үйлдвэрийн яамны харьяа Нүүрсний үйлдвэрлэлийн нэгдэлд инженер-эдийн засагч\n1978 оноос Шинжлэх ухаан, техникийн мэдээллийн төвд эрдэм шинжилгээний ажилтан \n1981 оноос Шинжлэх ухаан, техникийн мэдээллийн төвийн захирал \n2000 оноос Үйлдвэр худалдааны сайдын зөвлөх \n2005 оноос Орос-Монголын Монросцветмет нэгдлийн Техникийн захирлаар ажилласан байна\nЭдийн засгийн ухааны доктор, \nМонгол Улсын гавьяат эдийн засагч.",
  },
  {
    name: "Гэндэн Алтан-Оч",
    year: "1997-2002 онд ажиллаж байсан",
    title: "Албан тушаал: Гүйцэтгэх захирал",
    img: "/images/director/z5.png",
    desc:
      "Товч намтар:\nТехникийн кибернетикийн мэргэжлийн диплом-инженерийн цол\nЭдийн засгийн бизнесийн удирдлага-ын ухааны доктор\nМонголын Шинжлэх ухааны Үндэсний академийн академич\n Шатрын олон улсын шүүгч\nОлон улсын зохион байгуулагч\nОУШХ-ны мастер.",
  },
  {
    name: "Аюуш Батжаргал",
    year: "2002-2008 онд ажиллаж байсан",
    title: "Албан тушаал: Гүйцэтгэх захирал",
    img: "/images/director/z6.png",
    desc:
      "Товч намтар:\n1982-1987 онд Архангай аймгийн Багшийн сургуульд багш,хичээлийн эрхлэгч\n1987-1991 онд Сурган хүмүүжүүлэх ухааны хүрээлэн, Боловсролын асуудал судлах төвд эрдэм шинжилгээний ажилтан\n1991-2002 онд Боловсролын яаманд мэргэжилтэн, ахлах мэргэжилтэн, хэлтсийн дарга,газрын орлогч дарга\n2002-2008 онд МТҮП-ын Гүйцэтгэх захирал",
  },
  {
    name: "Батсүрэн Амгаланбат",
    year: "2008-2009 онд ажиллаж байсан",
    title: "Албан тушаал: Гүйцэтгэх захирал",
    img: "/images/director/z7.png",
    desc:
      "Товч намтар:\n2000-2004 онд Дэд бүтцийн яаманд мэргэжилтэн\n2004-2006 онд МТХХГ-т ахлах мэргэжилтэн\n2006-2008 онд БНХАУ-ын Бэйхан их сургуульд магистрын зэрэг хамгаалсан\n2008-2009 онд МТҮП-н захирал\n2011 оноос Япон Улсад Сансарын технологийн чиглэлээр докторантурт суралцаж байна.",
  },
  {
    name: "Ёндон Сүхбаатар",
    year: "2009 2012 онд ажиллаж байсан",
    title: "Албан тушаал: Гүйцэтгэх захирал",
    img: "/images/director/z8.png",
    desc:
      "Товч намтар:\n1988-1993 онд ОХУ-н Санкт-Петербург хотын ХУИС-ийг Эдийн засагч, зохион байгуулагч мэргэжлээр\n1993-1994 онд МҮЭХТЗ-ийн ҮҮХ-т менежер\n1994-2000 онд Цагаан шөнө ХЭАА-н эзэн, Мандахууд ХХК-ийн гүйцэтгэх захирал\n1998-1999 онд ТЗУХИ-ыг Төрийн удирдлагын менежерээр\n2002-2003 онд Удирдлагын академид төрийн удирдлагын магистр\n2000-2009 онд БЗД-ийн ЗДТГ-т хэлтсийн дарга, Тамгын газрын дарга, Засаг даргын орлогч\n2009-2012 онд МТҮП-н гүйцэтгэх захирал",
  },
  {
    name: "Цэрэндорж Түвшинтөр",
    year: "2012–2014 онд ажиллаж байсан",
    title: "Албан тушаал: Ерөнхий захирал",
    img: "/images/director/z9.png",
    desc:
      "Товч намтар:\n2003-2006 онд Ц.Түвшинтөр нь Берлиний Техникийн их сургуулийн харьяа, тархалттай хиймэл оюун ухааны лабораторит ахлах програм хангамжийн архитекторч, төслийн удирдагч, эрдэм шинжилгээний ажилтнаар тус тус ажилласан\n2006-2010 онд ХБНГУ-ын Карлсруэ хотын SEMANTIC WEB болон CLOUD COMPUTING –ийн чиглэлээр судалгаа шинжилгээ явуулдаг AIFB, компьютерийн ухааны судалгааны институт FZI зэрэг олон улсын тэргүүлэх судалгааны байгууллагуудад ажиллаж докторын зэрэг хамгаалсан\n2010 оны 1-р сараас 8 сар хүртэл FZI институтэд пост доктороор ажилласан\n2010-2011 онд Мобиком корпорацид Судалгаа, хөгжил хариуцсан захирал\n2011-2012 онд ”Скайтел” ХХК компанид Мэдээллийн технологийн газрын захирал\n2010 оноос Монгол улсын их сургуульд дэд профессор\n2012-2014 онд МТҮП-ын Ерөнхий захирлаар ажиллаж энэ хугацаанд “Монгол толгой– Силикон Хаус” төслийг зохиож, удирдсан",
  },
  {
    name: "Бавуужавын Мягмарнаран",
    year: "2014-2016 онд ажиллаж байсан",
    title: "Захирал.",
    img: "/images/director/z10.png",
    desc:
      "Товч намтар:\n1983 онд Улаанбаатар хотод төрсөн\n1990-2000 онд 10 жилийн дунд сургууль\n2000-2004 онд МУИС-ийн харъяа Мэдээллийн Технологийн сургуулийг Электроникийн инженер мэргэжлээр төгссөн\n2010-2012 онд Австрали Улсын Сидней хотын University of New South Wales их сургуульд Innovation management чиглэлээр мастерийн зэрэг хамгаалсан\n2004-2006 онд Эм Си Эс Электроникс ХХК-нд инженер\n2007-2010 онд Харилцаа холбооны зохицуулах хорооны Зохицуулалтын албанд Мэдээллийн технологийн зохицуулалт хариуцсан мэргэжилтэн\n2012-2014 оны 5-р сар хүртэл Мэдээллийн технологи, шуудан, харилцаа холбооны газарт Шинэчлэлийн бодлого, төлөвлөлтийн газрын дарга\n2014-оны 5-р сараас МТУП-ын Еренхий захирал",
  },
  { name: "Б.Буян-өлзий", year: "2014-2017онд ажиллаж байсан", title: "", img: "/images/director/z11.png", desc: "" },
  { name: "Ц.Содномдамба", year: "2017–2019 он ажиллаж байсан", title: "", img: "/images/director/z12.png", desc: "" },
  { name: "Э.Цогтгэрэл", year: "2019-2023 онд ажиллаж байсан", title: "", img: "/images/director/z13.png", desc: "" },
];

export default function DirectorPage() {
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const cacheBust = useMemo(() => Date.now(), []);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/director?ts=${Date.now()}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!alive) return;
        setDirector(data);
      } catch (e) {
        console.error("Director load error:", e);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const openModal = (p) => {
    setSelected(p);
    setOpen(true);
    document.body.style.overflow = "hidden"; // scroll lock
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
    document.body.style.overflow = ""; // unlock
  };

  return (
    <div id="wrapper" className="dark-scheme hero-full">
      {/* 🌟 Director + Team Section */}
      <section
        id="director-partners"
        className="py2"
        style={{
          background: "linear-gradient(180deg, #0E00A7 0%, #09E69A 100%)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container">
          {/* 🎓 Director Message */}
          <div className="row align-items-start g-5 mb-5 director-greeting-row">
            <div className="col-lg-5 text-center">
              <div className="director-sticky-image">
                <img
                  id="d_image"
                  src={
                    director?.image
                      ? `${director.image}?v=${cacheBust}`
                      : "/images/zolzaya.jpg"
                  }
                  alt="Director"
                  className="rounded-4 shadow-lg w-100"
                />
              </div>
            </div>

            <div className="col-lg-7">
              <h2
                id="d_title"
                className="fw-bold mb-3"
                style={{ color: "#09E69A" }}
              >
                {director?.title || "Мэндчилгээ"}
              </h2>

              <p
                id="d_text"
                style={{ fontSize: 16, lineHeight: 1.8 }}
                dangerouslySetInnerHTML={{
                  __html: loading ? "⏳ Уншиж байна..." : (director?.text || ""),
                }}
              />

              <p
                id="d_name"
                className="fw-bold mt-4 mb-0"
                style={{ color: "#09E69A" }}
              >
                {director?.name || ""}
              </p>
              <p id="d_position" className="text-light-50">
                {director?.position || ""}
              </p>
            </div>
          </div>

          {/* 🧑‍💼 Team Profiles */}
          <div className="partner-logos-wrapper mt-5">
            <h3 className="text-center fw-bold mb-4" style={{ color: "#09E69A" }}>
              Үе үеийн захиралууд
            </h3>

            <div className="profile-cards">
              {PROFILES.map((p, i) => (
                <div
                  key={i}
                  className="profile-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => openModal(p)}
                  onKeyDown={(e) => e.key === "Enter" && openModal(p)}
                >
                  <img src={p.img} alt={p.name} className="profile-photo" />
                  <div className="meta">
                    <span className="date">{p.year}</span>
                    <h4>{p.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Modal (Bootstrap биш, React modal) */}
      {open && (
        <div
          className="itp-modal-backdrop"
          onClick={closeModal}
          role="presentation"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <div
            className="custom-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            style={{
              width: "min(900px, 100%)",
              background: "rgba(20,20,20,0.85)",
              backdropFilter: "blur(14px)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.12)",
              overflow: "hidden",
            }}
          >
            <div
              className="modal-header border-0 d-flex justify-content-between align-items-center"
              style={{ padding: "14px 16px" }}
            >
              <h5 className="modal-title fw-bold" style={{ margin: 0 }}>
                {selected?.name || "Нэр"}
              </h5>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "transparent",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div className="modal-body" style={{ padding: 16 }}>
              <div className="d-flex flex-column flex-md-row align-items-start gap-4 mb-2">
                <img
                  src={selected?.img || "/images/placeholder.jpg"}
                  alt={selected?.name || "Profile"}
                  className="rounded-4 shadow-lg profile-modal-img"
                  style={{
                    width: 240,
                    maxWidth: "100%",
                    objectFit: "cover",
                    borderRadius: 16,
                  }}
                />
                <div>
                  <h5 className="modal-role" style={{ color: "#09E69A" }}>
                    {selected?.title || "Албан тушаал"}
                  </h5>
                  <p
                    className="modal-desc"
                    style={{ whiteSpace: "pre-line", lineHeight: 1.7, margin: 0 }}
                  >
                    {selected?.desc || ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
