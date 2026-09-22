import { useEffect, useState } from "react";
import { API_BASE } from "../lib/api";

const incubatorLogos = [
  "224 E-Source Studio 1.png",
  "ai rookies 1.png",
  "artumm 1.png",
  "binary systems 1.png",
  "clear corp 1.png",
  "enbotics 1.png",
  "event 1.png",
  "hackum, 1.png",
  "honmono comics 1.png",
  "lingors 1.png",
  "mazaal ai 1.png",
  "metacog 1.png",
  "nova hex 1.png",
  "onedayjob 1.png",
  "uyach 1.png",
  "virtual plus agency 1.png",
].map((file) => ({
  file,
  name: file.replace(/,? 1\.png$/i, ""),
}));

export default function Incubator() {
  // ---------- STATS ----------
  const [stats, setStats] = useState(null);

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
                <p  style={{ color: 'white' }}>Нийт компани</p>
              </div>

              <div className="stat-item">
                <i className="fa-solid fa-users"></i>
                <Counter value={stats?.totalJobs ?? 0} />
                <p style={{ color: 'white' }}>Нийт ажлын байр</p>
              </div>

              <div className="stat-item">
                <i className="fa-solid fa-trophy"></i>
                <Counter value={stats?.bestGraduates ?? 0} />
                <p  style={{ color: 'white' }}>Шилдэг төгсөгч</p>
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
                <span style={{ color: 'white' }}></span>
                <Counter value={stats?.activeIncubator ?? 0} />
                <p  style={{ color: 'white' }}>Инкубаторт байрлаж буй</p>
              </div>

              <div className="stat-item">
                <i className="fa-solid fa-user-group"></i>
                <span style={{ color: 'white' }}>
                  <Counter value={stats?.currentJobs ?? 0} />
                </span>
                <p  style={{ color: 'white' }}>Одоогийн ажлын байр</p>
              </div>

              <div className="stat-item">
                <i className="fa-solid fa-face-smile"></i>
                <Counter value={stats?.successfulGraduates ?? 0} />
                <p  style={{ color: 'white' }}>Амжилттай төгсөгч</p>
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

      {/* OUR INCUBATORS */}
      <section id="partners-section" className="incubator-showcase">
        <div className="container incubator-showcase-heading">
          <span>IT Park ecosystem</span>
          <h2>Бидний инкубаторууд</h2>
        </div>

        <div className="incubator-logo-marquee" aria-label="Бидний инкубатор компаниуд">
          <div className="incubator-logo-track">
            {[0, 1].map((copyIndex) => (
              <div
                className="incubator-logo-group"
                aria-hidden={copyIndex === 1}
                key={copyIndex}
              >
                {incubatorLogos.map((logo) => (
                  <div className="incubator-logo-item" key={`${copyIndex}-${logo.file}`}>
                    <img
                      src={`/images/incubator/bidnii incubators/${logo.file}`}
                      alt={copyIndex === 0 ? logo.name : ""}
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
