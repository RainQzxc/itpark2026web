import { useEffect, useMemo, useState } from "react";
import { API_BASE } from "../lib/api";

export default function Incubator() {
  // ---------- STATS ----------
  const [stats, setStats] = useState(null);

  // ---------- PARTNERS ----------
  const [partners, setPartners] = useState([]);

  const mainIncubator = useMemo(
    () => partners.filter((p) => p?.title === "Үндсэн Инкубатор" && p?.image),
    [partners]
  );
  const digitalIncubator = useMemo(
    () => partners.filter((p) => p?.title === "Цахим Инкубатор" && p?.image),
    [partners]
  );

  // ---------- load stats ----------
  useEffect(() => {
    let alive = true;

    fetch(`${API_BASE}/api/stats`)
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        setStats(data || null);
      })
      .catch((e) => console.error("Stats load error:", e));

    return () => {
      alive = false;
    };
  }, []);

  // ---------- load partners ----------
  useEffect(() => {
    let alive = true;

    fetch(`${API_BASE}/api/partners`)
      .then((r) => r.json())
      .then((list) => {
        if (!alive) return;
        setPartners(Array.isArray(list) ? list : []);
      })
      .catch((e) => console.error("Partners load error:", e));

    return () => {
      alive = false;
    };
  }, []);

  // ---------- animated counter ----------
  const Counter = ({ value = 0 }) => {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
      const target = Number(value) || 0;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 80));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setDisplay(target);
          clearInterval(timer);
        } else {
          setDisplay(current);
        }
      }, 20);

      return () => clearInterval(timer);
    }, [value]);

    return <span className="count">{display}</span>;
  };

  return (
    <div id="wrapper">
      <div className="float-text show-on-scroll">
        <span>
          <a href="#">Scroll to top</a>
        </span>
      </div>

<section
  id="section-hero"
  className="section-dark no-top no-bottom text-light relative"
  style={{ overflow: "hidden" }}
>
  {/* Background video */}
  <video
    className="itp-hero-video"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
  >
    <source src="/video/rend.mp4" type="video/mp4" />
  </video>

  <div className="itp-backdrop"></div>
  <div className="sw-overlay op-8"></div>

  <div className="abs abs-centered z-2 w-80">
    <div className="container wow scaleIn" data-wow-duration="3s">
      <div className="row">
        <div className="col-lg-12 text-center">
          <br />
          <img src="/images/004.png" className="w-400px d-block mx-auto" alt="" />
          <div className="spacer-single"></div>

          <a className="btn-main mx-2 fx-slide" href="#" style={{ color: "#fff" }}>
            <span>Инкубаторт бүртгүүлэх</span>
          </a>

          {/* зөвлөмж: SPA дээр Link ашигла */}
          <a className="btn-main btn-line mx-2 fx-slide" href="/incubator">
            <span>Инкубатор</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* STATS */}
      <section id="incubator-stats" className="gradient-inherited">
        <div className="container text-center">
          <h2 className="section-title">Шинэ бүтээлч санаатай энтрепренёруудыг урьж байна</h2>
          <p className="subtitle">Инкубатор – Тал нутгийн цахим хөгжлийн хурдасгуур</p>

          <div className="stats-wrapper">
            {/* Left */}
            <div className="stats-column left">
              <div className="stat-item">
                <i className="fa-solid fa-building-circle-check"></i>
                <Counter value={stats?.totalCompanies ?? 0} />
                <p>Нийт компани</p>
              </div>

              <div className="stat-item">
                <i className="fa-solid fa-users"></i>
                <Counter value={stats?.totalJobs ?? 0} />
                <p>Нийт ажлын байр</p>
              </div>

              <div className="stat-item">
                <i className="fa-solid fa-trophy"></i>
                <Counter value={stats?.bestGraduates ?? 0} />
                <p>Шилдэг төгсөгч</p>
              </div>
            </div>

            {/* Center */}
            <div className="stats-center">
              <img src="/images/image 1.png" alt="idea" className="center-img" />
            </div>

            {/* Right */}
            <div className="stats-column right">
              <div className="stat-item">
                <i className="fa-solid fa-rocket"></i>
                <Counter value={stats?.activeIncubator ?? 0} />
                <p>Инкубаторт байрлаж буй</p>
              </div>

              <div className="stat-item">
                <i className="fa-solid fa-user-group"></i>
                <Counter value={stats?.currentJobs ?? 0} />
                <p>Одоогийн ажлын байр</p>
              </div>

              <div className="stat-item">
                <i className="fa-solid fa-face-smile"></i>
                <Counter value={stats?.successfulGraduates ?? 0} />
                <p>Амжилттай төгсөгч</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMAL TEXT GRID */}
      <section className="itp-minimal">
        <div className="itp-minimal__container">
          <h2 className="itp-minimal__title">
            <span className="itp-minimal__accent">IT Park нь стартап</span> инновац
            <br />
            технологийн бизнесүүдийг дэмжих үндэсний экосистем юм.
          </h2>

          <div className="itp-minimal__grid">
            <div className="itp-minimal__item">
              <span className="itp-minimal__bar" aria-hidden="true"></span>
              <p className="itp-minimal__text">
                Стартапын нас,
                <br />
                туршлагаас үл хамааран эхний <br />
                алхмаас нь дэмжинэ.
              </p>
            </div>

            <div className="itp-minimal__item">
              <span className="itp-minimal__bar" aria-hidden="true"></span>
              <p className="itp-minimal__text">
                We improve the
                <br />
                success rate of our
                <br />
                startups.
              </p>
            </div>

            <div className="itp-minimal__item">
              <span className="itp-minimal__bar" aria-hidden="true"></span>
              <p className="itp-minimal__text">
                We give startups a
                <br />
                huge fundraising
                <br />
                advantage.
              </p>
            </div>

            <div className="itp-minimal__item">
              <span className="itp-minimal__bar" aria-hidden="true"></span>
              <p className="itp-minimal__text">
                Our companies have
                <br />
                a track record of
                <br />
                becoming billion
                <br />
                dollar companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="section-dark p-0" aria-label="section">
        <div className="bg-color text-light d-flex py-4 lh-1 rot-2">
          <div className="de-marquee-list-1 wow fadeInLeft" data-wow-duration="3s">
            <span className="fs-60 mx-3">Тал нутгийн цахим хөгжлийн хурдасгуур</span>
          </div>
        </div>

        <div className="text-dark d-flex py-4 lh-1 rot-min-1 mt-min-20" style={{ background: "#ffffff" }}>
          <div className="de-marquee-list-2 wow fadeInRight" data-wow-duration="3s">
            <span className="fs-60 mx-3">Мэдлэг ур чадвараар тал нутгийн цахиурын хөндийг бүтээнэ.</span>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners-section" className="gradient-inherited">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-12 text-center">
              <div className="partner-logos-wrapper">
                <h2 className="section-title wow fadeInUp">Үндсэн Инкубатор</h2>
                <div className="partner-logos" id="main-incubator">
                  {mainIncubator.map((p) => (
                    <a key={p._id || p.image} href={p.link || "#"} className="partner-card">
                      <img src={p.image} className="partner-logo" alt={p.name || "partner"} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="partner-logos-wrapper mt-5">
                <h2 className="section-title wow fadeInUp">Цахим Инкубатор</h2>
                <div className="partner-logos" id="digital-incubator">
                  {digitalIncubator.map((p) => (
                    <a key={p._id || p.image} href={p.link || "#"} className="partner-card">
                      <img src={p.image} className="partner-logo" alt={p.name || "partner"} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
