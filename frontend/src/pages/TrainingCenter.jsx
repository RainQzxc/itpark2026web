import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../lib/api";
import { Modal } from "bootstrap";

export default function TrainingCenter() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  // selected training id
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);

  // form state
  const [form, setForm] = useState({
    lastname: "",
    name: "",
    register: "",
    email: "",
    phone1: "",
    phone2: "",
    company: "",
    position: "",
    confirm: false,
  });

  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  // load trainings
  useEffect(() => {
    let mounted = true;

    async function loadTraining() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/training`);
        const data = await res.json();
        if (!mounted) return;
        setTrainings(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setTrainings([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadTraining();
    return () => {
      mounted = false;
    };
  }, []);

  // init bootstrap modal (once)
  useEffect(() => {
    if (!modalRef.current) return;

    // create instance
    bsModalRef.current = Modal.getOrCreateInstance(modalRef.current, {
      backdrop: true,
      keyboard: true,
    });

    return () => {
      try {
        bsModalRef.current?.hide();
      } catch {}
      try {
        bsModalRef.current?.dispose?.();
      } catch {}
      bsModalRef.current = null;
    };
  }, []);

  const setField = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const resetForm = () => {
    setForm({
      lastname: "",
      name: "",
      register: "",
      email: "",
      phone1: "",
      phone2: "",
      company: "",
      position: "",
      confirm: false,
    });
  };

  const openRegister = (trainingId) => {
    setSelectedTrainingId(trainingId);

    // state update-г хүлээлгүйгээр modal open хийхэд зүгээр,
    // учир нь submit дээр trainingId state ашиглана.
    bsModalRef.current?.show();
  };

  const closeRegister = () => {
    bsModalRef.current?.hide();
  };

  const validate = () => {
    if (!form.confirm) return "Та бүртгэлийн нөхцөлийг зөвшөөрнө үү.";

    const required = ["lastname", "name", "register", "email", "phone1", "company", "position"];
    for (const k of required) {
      if (!String(form[k]).trim()) return "❗ Бүх талбарыг бүрэн бөглөнө үү.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) return "❗ Зөв форматтай имэйл оруулна уу.";

    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(form.phone1.trim())) return "❗ Утас 1 — 8 оронтой тоо байх ёстой.";
    if (form.phone2.trim() && !phoneRegex.test(form.phone2.trim())) return "❗ Утас 2 — 8 оронтой тоо байх ёстой.";

    if (!selectedTrainingId) return "❗ Сургалт сонгогдоогүй байна. Дахин оролдоно уу.";

    return null;
  };

  const submitRegister = async () => {
    const msg = validate();
    if (msg) return alert(msg);

    try {
      const body = {
        trainingId: selectedTrainingId,
        lastname: form.lastname.trim(),
        name: form.name.trim(),
        register: form.register.trim(),
        email: form.email.trim(),
        phone1: form.phone1.trim(),
        phone2: form.phone2.trim(),
        company: form.company.trim(),
        position: form.position.trim(),
      };

      const res = await fetch(`${API_BASE}/api/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert("🎉 Бүртгэл амжилттай илгээгдлээ!");
        resetForm();
        setSelectedTrainingId(null);
        closeRegister();
      } else {
        alert("❌ Алдаа гарлаа! Дахин оролдоно уу.");
      }
    } catch (e) {
      console.error(e);
      alert("❌ Алдаа гарлаа! Дахин оролдоно уу.");
    }
  };

  return (
    <>
      <section className="section-dark relative py-5 training-page-section">
        <div className="container text-center">
          <h2 className="itp-page-title">🎓 Сургалтын төв</h2>

          <p className="itp-page-desc">
            Бид мэдээллийн технологийн салбарын мэргэжилтнүүдэд зориулсан мэргэжүүлэх сургалтуудыг тогтмол зохион байгуулдаг.
          </p>

          <h2 className="itp-section-title mt-5">📘 Явагдаж буй сургалтууд</h2>

          <div className="itp-horizontal-slider" id="trainingList">
            {loading && <div style={{ opacity: 0.8, padding: 16 }}>Loading...</div>}

            {!loading && trainings.length === 0 && (
              <div style={{ opacity: 0.8, padding: 16 }}>Одоогоор сургалт алга байна.</div>
            )}

            {!loading &&
              trainings.map((t) => (
                <div key={t._id} style={{ display: "inline-block" }}>
                  <Link to={`/training/${t._id}`} className="itp-news-card itp-card-link">
                    <img src={t.image} className="itp-news-img" alt={t.title} />
                    <div className="itp-news-content">
                      <div className="itp-news-date">
                        {t?.duration?.start} – {t?.duration?.end}
                      </div>
                      <div className="itp-news-title">{t.title}</div>
                    </div>
                  </Link>

                  <div style={{ marginTop: 10, textAlign: "center" }}>
                    <button
                      type="button"
                      className="btn-main btn-line fx-slide"
                      onClick={() => openRegister(t._id)}
                    >
                      <span>БҮРТГҮҮЛЭХ</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* REGISTER MODAL */}
      <div className="modal fade" id="regModal" ref={modalRef} tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content reg-box">
            <button type="button" className="reg-close-btn" data-bs-dismiss="modal" onClick={closeRegister}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            <h3 className="reg-title">
              <i className="fa-solid fa-graduation-cap"></i> Сургалтад бүртгүүлэх
            </h3>

            <p className="reg-sub">Дараах мэдээллийг үнэн зөв бөглөнө үү.</p>

            <div className="reg-form">
              <div className="reg-input">
                <i className="fa-solid fa-user"></i>
                <input value={form.lastname} onChange={(e) => setField("lastname", e.target.value)} placeholder="Овог" />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-user"></i>
                <input value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Нэр" />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-id-card"></i>
                <input value={form.register} onChange={(e) => setField("register", e.target.value)} placeholder="Регистр" />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-envelope"></i>
                <input value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="Имэйл" />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-phone"></i>
                <input value={form.phone1} onChange={(e) => setField("phone1", e.target.value)} placeholder="Утас 1" />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-phone"></i>
                <input value={form.phone2} onChange={(e) => setField("phone2", e.target.value)} placeholder="Утас 2" />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-building"></i>
                <input value={form.company} onChange={(e) => setField("company", e.target.value)} placeholder="Ажилын газар" />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-briefcase"></i>
                <input value={form.position} onChange={(e) => setField("position", e.target.value)} placeholder="Албан тушаал" />
              </div>
            </div>

            <div className="reg-conditions">
              <p><b>Бүртгэлийн нөхцөл:</b></p>
              <ul>
                <li>Сургалтад хамрагдагсад сургалтын явцад 60%-аас дээш ирцтэй байвал сертификат авна.</li>
                <li>Сургалтын төлбөрийг сургалт эхлэхээс өмнө төлсөн байна.</li>
                <li>Бүртгэл сургалт эхлэхээс 24 цагийн өмнө хаагдана.</li>
              </ul>

              <label className="reg-check">
                <input
                  type="checkbox"
                  checked={form.confirm}
                  onChange={(e) => setField("confirm", e.target.checked)}
                />
                Зөвшөөрөх
              </label>
            </div>

            <button type="button" className="reg-submit" onClick={submitRegister}>
              БҮРТГҮҮЛЭХ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
