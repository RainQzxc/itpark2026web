import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../lib/api";


export default function Home() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  // 1) Template js-үүд route дээр дахин init болох боломж (quick re-init)
  useEffect(() => {
    // React DOM render дууссаны дараа
    const t = setTimeout(() => {
      window.dispatchEvent(new Event("load"));
      window.dispatchEvent(new Event("resize"));
    }, 0);

    return () => clearTimeout(t);
  }, []);

  // 2) Home news fetch (хуучин inline script-ийн оронд)
  useEffect(() => {
    let alive = true;

    async function loadHomeNews() {
      try {
        const res = await fetch(`${API_BASE}/api/news`);
        const data = await res.json();
        if (!alive) return;
        setNews(Array.isArray(data) ? data : []);
      } catch (e) {
        console.log("NEWS LOAD ERROR", e);
      }
    }

    loadHomeNews();
    return () => {
      alive = false;
    };
  }, [API_BASE]);

  // 3) YouTube autoplay intersection observer (хуучин inline script-ийн оронд)
  useEffect(() => {
    const iframe = document.getElementById("aboutVideo");
    if (!iframe) return;

    const id = iframe.dataset.embed || "1rRbHu96gbs";
    const base = `https://www.youtube.com/embed/${id}?playsinline=1&rel=0&modestbranding=1`;
    const play = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`;

    iframe.src = base;

    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!started) {
              started = true;
              iframe.src = play;
            }
          } else {
            iframe.src = base;
            started = false;
          }
        });
      },
      { threshold: 0.5 }
    );

    io.observe(iframe);
    return () => io.disconnect();
  }, []);

  const toDayMonth = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
    return `${day} ${month}`;
  };

  const openNews = (id) => {
    // чи NewsDetails route-оо /news/:id гэж хийвэл ингэнэ:
    // navigate(`/news/${id}`);
    // Одоогийнхоо хийсэн route-оос хамаараад өөрчилж болно.
    navigate(`/news/${id}`);
  };

  return (
    <div id="wrapper">
      <div className="float-text show-on-scroll">
        <span>
          <a href="#">Scroll to top</a>
        </span>
      </div>

      {/* page preloader */}
      <div id="de-loader"></div>

      {/* overlay */}
      <div className="itp-overlay"></div>

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


      {/* ABOUT */}
      <section id="section-about" className="bg-dark section-dark text-light">
        <div className="container">
          <div className="row gx-5 align-items-center justify-content-between">
            <div className="col-lg-6">
              <div className="me-lg-5 pe-lg-5 py-2 my-">
                <h2 className="wow fadeInUp" data-wow-delay=".4s">
                  Алсын хараа, эрхэм зорилго, үнэт зүйлс, стратегийн чиглэл
                </h2>
                <p className="wow fadeInUp" data-wow-delay=".6s">
                  Гарааны бизнес болон өндөр технологийг хөгжүүлэх,дамжуулах,
                  чадварлаг хүний нөөцийг мэргэшүүлэх, салбарын эко системийг
                  төгөлдөржүүлж олон улсад тэргүүлэгч цөм байгууллага болох.
                </p>

                <ul className="ul-check">
                  <li className="wow fadeInUp" data-wow-delay=".8s">
                    <strong style={{ color: "#09E69A" }}>Хамтын зүтгэл</strong>
                    <br />
                    Дэлхийд хүлээн зевшөөрөгдсөн технологийн цогцолбор байгууллага
                    болох
                  </li>
                  <li className="wow fadeInUp" data-wow-delay=".9s">
                    <strong style={{ color: "#09E69A" }}>Хариуцлага</strong>
                    <br />
                    Тогтвортой бодлого баримталж зорилгоо биелүүлэх
                  </li>
                  <li className="wow fadeInUp" data-wow-delay="1s">
                    <strong style={{ color: "#09E69A" }}>
                      Чадварлаг хүний нөөц
                    </strong>
                    <br />
                    Олон улсын шаардлагад нийцсэн мэдлэг ур чадвар бүхий Монгол
                    хунийг бэлтгэх
                  </li>
                  <li className="wow fadeInUp" data-wow-delay="1s">
                    <strong style={{ color: "#09E69A" }}>
                      Гарааны бизнесийн эко систем
                    </strong>
                    <br />
                    Өрсөлдөх чадвар бүхий гарааны компаниудыг дэлхийн зах зээлд
                    гаргах
                  </li>
                  <li className="wow fadeInUp" data-wow-delay="1s">
                    <strong style={{ color: "#09E69A" }}>
                      Инновацийн соёл
                    </strong>
                    <br />
                    Технологийн дэвшлийг эдийн засгийн эргэлтэнд оруулах,
                    нутагшуулах
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-media media-stack wow fadeInUp">
                {/* YouTube video */}
                <div className="yt-wrap">
                  <iframe
                    id="aboutVideo"
                    data-embed="1rRbHu96gbs"
                    src="https://www.youtube.com/embed/1rRbHu96gbs?rel=0&modestbranding=1&playsinline=1"
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Lottie */}
                <div className="lottie-wrap wow scaleIn">
                  <lottie-player
                    src="/images/misc/tech-loading.json"
                    background="transparent"
                    speed="1"
                    style={{ width: "100%", height: "260px" }}
                    loop
                    autoplay
                  ></lottie-player>
                </div>
              </div>
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

        <div
          className="text-dark d-flex py-4 lh-1 rot-min-1 mt-min-20"
          style={{ background: "#ffffff" }}
        >
          <div className="de-marquee-list-2 wow fadeInRight" data-wow-duration="3s">
            <span className="fs-60 mx-3">
              Мэдлэг ур чадвараар тал нутгийн цахиурын хөндийг бүтээнэ.
            </span>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news-section" className="news-section text-light">
        <div className="container text-center">
          <h2 className="section-title">Мэдээ мэдээлэл</h2>

          {/* хуучин "dynamic-news-slider" */}
          <div className="news-slider" id="dynamic-news-slider">
            {news.map((n) => (
              <div
                key={n._id}
                className="news-card"
                onClick={() => openNews(n._id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openNews(n._id)}
              >
                <img
                  src={n.image || "/images/news.jpg"}
                  alt={n.title}
                />
                <div className="meta">
                  <span className="date">{toDayMonth(n.date)}</span>
                  <h4>{n.title}</h4>
                  {n.shortText ? (
                    <p className="excerpt">
                      {n.shortText.substring(0, 100)}
                      {n.shortText.length > 100 ? "..." : ""}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {/* хуучин "home-news-container" (одоо хэрэглээгүй, үлдээж болно) */}
          <div className="row g-4" id="home-news-container"></div>

          <a className="btn-main mx-2 fx-slide" href="/news" style={{ color: "#ffffff" }}>
            <span>Бүгдийг харах</span>
          </a>
        </div>
      </section>

      {/* PARTNERS */}
      <section
        id="partners-section"
        className="bg-dark section-dark pt-80 relative jarallax"
        aria-label="section"
      >
        <div className="container">
          <div className="row g-4">
            <div className="col-md-12 wow fadeInUp text-center">
              <div className="partner-logos-wrapper">
                <div className="partner-logos">
                  {/* Logo багц 1 */}
                  <a href="#" className="partner-card">
                    <img src="/images/partners/1.png" className="partner-logo" alt="Кибер төв" />
                  </a>
                  <a href="#" className="partner-card">
                    <img src="/images/partners/2.png" className="partner-logo" alt="E-Mongolia" />
                  </a>
                  <a href="#" className="partner-card">
                    <img src="/images/partners/3.png" className="partner-logo" alt="MIAT" />
                  </a>
                  <a href="#" className="partner-card">
                    <img src="/images/partners/4.png" className="partner-logo" alt="ХХЗХ" />
                  </a>
                  <a href="#" className="partner-card">
                    <img src="/images/partners/5.png" className="partner-logo" alt="Datacenter" />
                  </a>
                  <a href="#" className="partner-card">
                    <img src="/images/partners/6.png" className="partner-logo" alt="Монгол шуудан" />
                  </a>

                  {/* Logo багц 2 */}
                  <a href="#" className="partner-card">
                    <img src="/images/partners/1.png" className="partner-logo" alt="Кибер төв" />
                  </a>
                  <a href="#" className="partner-card">
                    <img src="/images/partners/2.png" className="partner-logo" alt="E-Mongolia" />
                  </a>
                  <a href="#" className="partner-card">
                    <img src="/images/partners/3.png" className="partner-logo" alt="MIAT" />
                  </a>
                  <a href="#" className="partner-card">
                    <img src="/images/partners/4.png" className="partner-logo" alt="ХХЗХ" />
                  </a>
                  <a href="#" className="partner-card">
                    <img src="/images/partners/5.png" className="partner-logo" alt="Datacenter" />
                  </a>
                  <a href="#" className="partner-card">
                    <img src="/images/partners/6.png" className="partner-logo" alt="Монгол шуудан" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* LOCATION */}
      <section id="section-venue" className="text-light">
        <div className="container relative z-2">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-6 text-center">
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Байршил</h2>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-sm-6">
              {/* 3D МОДЕЛИЙГ ТҮР ХААВ - GitHub push-д саад болохгүй */}
              {/* <model-viewer
                src="/images/misc/IT_Park_scale_fixed.glb"
                camera-controls
                auto-rotate
                environment-image="neutral"
                exposure="1.1"
                shadow-intensity="0.8"
                camera-orbit="0deg 70deg 0.9m"
                camera-target="0m 0m 0m"
                field-of-view="22deg"
                style={{ width: "100%", height: 420, borderRadius: 16 }}
              ></model-viewer> 
              */}

              {/* Модельгүй үед харагдах түр зураг эсвэл placeholder */}
              <div 
                className="d-flex align-items-center justify-content-center"
                style={{ 
                  width: "100%", 
                  height: 420, 
                  borderRadius: 16, 
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px dashed rgba(255, 255, 255, 0.2)" 
                }}
              >
                <div className="text-center">
                  <i className="fa-solid fa-cube fa-3x mb-3" style={{ opacity: 0.3 }}></i>
                  <p style={{ opacity: 0.5 }}>3D Модель удахгүй нэмэгдэнэ...</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12 d-flex justify-content-center">
              <div
                className="location-text w-100"
                style={{
                  backgroundImage: "url('/images/misc/bg-texture.webp')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  padding: "40px 30px",
                  borderRadius: 16,
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  maxWidth: "100%",
                }}
              >
                <h3 className="mb-3">Мэдээлэл, Технологийн Үндэсний Парк</h3>

                <p>
                  Улаанбаатар хотын төвд байрлах{" "}
                  <strong>
                    Мэдээлэл, Технологийн Үндэсний
                    <br />
                    Парк
                  </strong>{" "}
                  нь мэдээллийн технологийн гарааны бизнес
                  <br />
                  энтрепренёруудын өсөлт хөгжлийг дэмжих инновацийн төв юм.
                </p>

                <p>
                  Манай байр нь <strong>Сүхбаатар дүүргийн Бага тойруу-49</strong>{" "}
                  хаяанд байрлах
                  <br />
                  бөгөөд нийтийн тээврээр болон явганаар ирэхэд маш тохиромжтой.
                </p>

                <a
                  className="btn-main mx-2 btn-maps"
                  href="https://maps.google.com/?q=IT+Park+Mongolia"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: "#1400F5",
                    fontWeight: 600,
                    padding: "10px 18px",
                    borderRadius: 8,
                    display: "inline-flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  <i className="fa-solid fa-location-dot me-2"></i>
                  <span>Google Maps дээр харах</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="section-faq" className="text-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <h2 className="wow fadeInUp" data-wow-delay=".2s">
                Түгээмэл асуулт хариултууд
              </h2>
            </div>

            <div className="col-lg-7">
              <div className="accordion s2 wow fadeInUp">
                <div className="accordion-section">
                  <div className="accordion-section-title" data-tab="#accordion-a1">
                    Топсит гэж юу вэ?
                  </div>
                  <div className="accordion-section-content" id="accordion-a1">
                    Мэдээлэл харилцаа холбооны салбарын инженер, техникийн ажилтан,
                    програм хангамж хөгжүүлэгчдэд болон их дээд сургуулийн оюутан
                    суралцагчдын практик ур чадварыг тодорхойлох — Мэдээллийн
                    технологийн салбарын болон боловсролын системийн хөгжлийн
                    түвшинг нэмэгдүүлэх.
                  </div>

                  <div className="accordion-section-title" data-tab="#accordion-a3">
                    ICDL-ийн шалгалтын тухай
                  </div>
                  <div className="accordion-section-content" id="accordion-a3">
                    "Олон улсын компьютерийн хэрэглээний гэрчилгээ" (ICDL) шалгалт нь
                    олон улсын стандартын шалгуурт тулгуурлан хэрэглэгчдийн компьютерийн
                    хэрэглээний ур чадвар, мэдлэг, практикийг үнэлдэг шалгалт юм.
                  </div>

                  <div className="accordion-section-title" data-tab="#accordion-a4">
                    МТ-ийн сургалтууд
                  </div>
                  <div className="accordion-section-content" id="accordion-a4">
                    Мобайл апп хөгжүүлэлт, iOS, Android, Oracle, PHP & MySQL, Java,
                    Cpanel, Firewall, Сүлжээ, Active Directory, VMware, Мэдээллийн аюулгүй байдал,
                    Компьютерийн хэрэглээ, МТИШ-ын бэлтгэх сургалт гэх мэт.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal (хийж үлдээв — index.js bootstrap modal init байвал ажиллана) */}
      <div className="modal fade rounded-1" id="eventModal" tabIndex="-1">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header d-flex flex-row justify-content-end">
              <button
                id="close"
                type="button"
                className="btn-close"
                style={{ backgroundColor: "white" }}
                aria-label="Close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6">
                  <img
                    id="eventPoster"
                    className="img-fluid w-100"
                    style={{
                      aspectRatio: "1/1",
                      objectFit: "cover",
                      borderRadius: 20,
                    }}
                    alt="Event poster"
                  />
                </div>
                <div className="col-lg-6">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <h3 id="eventModalLabel" style={{ color: "#09E69A" }}></h3>
                      <div className="d-flex flex-row mb-4">
                        <span className="event-line" id="eventFormat"></span>
                        <span className="comp" id="eventOrg"></span>
                      </div>
                      <p id="eventDesc" style={{ color: "white" }}></p>
                      <div className="primary-separator"></div>

                      <span style={{ fontWeight: 300, color: "white" }} id="eventLocation"></span>
                      <span id="eventTime" style={{ color: "#09E69A", fontWeight: 700 }}></span>
                      <div className="primary-separator"></div>

                      <div className="d-flex flex-row">
                        <a
                          id="orgWeb"
                          className="btn-main btn-line"
                          style={{
                            width: 40,
                            height: 40,
                            paddingLeft: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingTop: 6,
                          }}
                          href="#section-schedule"
                        >
                          <i className="fa-solid fa-globe fa-2x"></i>
                        </a>

                        <a
                          id="orgFb"
                          className="btn-main btn-line"
                          style={{
                            width: 40,
                            height: 40,
                            paddingLeft: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingTop: 6,
                            marginLeft: 6,
                            marginRight: 6,
                          }}
                          href="#section-schedule"
                        >
                          <i className="fa-brands fa-facebook-f fa-2x"></i>
                        </a>

                        <a className="cursor-pointer" id="orgPhone"></a>
                      </div>
                    </div>

                    <div className="d-flex flex-row mt-4">
                      <a id="orgPaidAmount" className="btn-main btn-line">
                        <span></span>
                      </a>
                      <div>
                        <a id="orgLink" className="btn-main custom-cursor-pointer mx-2" style={{ width: "100%" }}>
                          <span></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
