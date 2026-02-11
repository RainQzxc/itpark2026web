import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../lib/api";
import { Modal } from "bootstrap";

export default function TrainingDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const [t, setT] = useState(null);
  const [loading, setLoading] = useState(true);

  // modal + form
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

  // load training detail
  useEffect(() => {
    let mounted = true;

    async function loadTrainingDetail() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/training/${id}`);
        if (!res.ok) throw new Error("Training not found");
        const data = await res.json();
        if (!mounted) return;
        setT(data);
      } catch (e) {
        console.error(e);
        alert("❌ Сургалтын мэдээлэл ачаалж чадсангүй.");
        nav("/training-center");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (id) loadTrainingDetail();

    return () => {
      mounted = false;
    };
  }, [id, nav]);

  // init bootstrap modal (once)
  useEffect(() => {
    if (!modalRef.current) return;

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

  const openRegister = () => bsModalRef.current?.show();
  const closeRegister = () => bsModalRef.current?.hide();

  const validate = () => {
    if (!form.confirm) return "❗ Та бүртгэлийн нөхцөлийг зөвшөөрнө үү.";

    const required = ["lastname", "name", "register", "email", "phone1", "company", "position"];
    for (const k of required) {
      if (!String(form[k]).trim()) return "❗ Бүх талбарыг бүрэн бөглөнө үү.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim()))
      return "❗ Зөв форматтай имэйл оруулна уу. (Жишээ: test@gmail.com)";

    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(form.phone1.trim()))
      return "❗ Утасны дугаар 8 оронтой байх ёстой.";

    if (form.phone2.trim() && !phoneRegex.test(form.phone2.trim()))
      return "❗ Утас 2 — 8 оронтой байх ёстой.";

    return null;
  };

  const submitRegister = async () => {
    const msg = validate();
    if (msg) return alert(msg);

    try {
      const body = {
        trainingId: id,
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
        closeRegister();
      } else {
        alert("❌ Алдаа гарлаа. Дахин оролдоно уу.");
      }
    } catch (e) {
      console.error(e);
      alert("❌ Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: "90px 0", opacity: 0.85 }}>
        Loading...
      </div>
    );
  }
  if (!t) return null;

  const durationText = `${t?.duration?.start || "-"} - ${t?.duration?.end || "-"}`;

  return (
    <>
      <div className="detail-container">
        <Link to="/training-center" className="back-btn">
          ← Буцах
        </Link>

        <div className="detail-header">
          <img
            src={t.image}
            alt={t.title}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: 420,
              objectFit: "contain",
              background: "#0d1b2a",
              borderRadius: 12,
              padding: 10,
              border: "1px solid #1bddea55",
            }}
          />

          <div>
            <h2 className="detail-title">{t.title}</h2>
            <p
              className="detail-desc"
              dangerouslySetInnerHTML={{ __html: t.longDesc || t.shortDesc || "" }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <h3 className="section-title">Сургалтын багш нар</h3>
            <p
              className="detail-desc"
              dangerouslySetInnerHTML={{ __html: t.teacher || "Багшийн мэдээлэл ороогүй" }}
            />

            <h3 className="section-title">Тавигдах шаардлага</h3>
            <ul className="detail-desc">
              {(t.requirements || []).map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>

            <h3 className="section-title">Сургалтын хөтөлбөр</h3>
            <table className="table table-bordered">
              <tbody>
                {(t.program || []).map((p, i) => (
                  <tr key={i}>
                    <td style={{ width: 40 }}>{i + 1}</td>
                    <td>{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center">
              <button type="button" className="btn-apply" onClick={openRegister}>
                БҮРТГҮҮЛЭХ
              </button>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="info-card">
              <div>
                <i className="fa fa-calendar"></i> <b>Хугацаа:</b> <span>{durationText}</span>
              </div>
              <div>
                <i className="fa fa-user"></i> <b>Түвшин:</b> <span>{t.level || "-"}</span>
              </div>
              <div>
                <i className="fa fa-money-bill"></i> <b>Төлбөр:</b> <span>{t.price || "-"}</span>
              </div>
              <div>
                <i className="fa fa-certificate"></i> <b>Сертификат:</b>{" "}
                <span>{t.certificate ? "Байгаа" : "Байхгүй"}</span>
              </div>
              <div>
                <i className="fa fa-coffee"></i> <b>Цайны завсарлага:</b>{" "}
                <span>{t.lunch ? "Байгаа" : "Байхгүй"}</span>
              </div>
              <div>
                <i className="fa fa-clock"></i> <b>Төлөв:</b>{" "}
                <span>{t.status === "closed" ? "Хаагдсан" : "Нээлттэй"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REGISTER MODAL */}
      <div className="modal fade" id="regModal" ref={modalRef} tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content reg-box">
            <button
              type="button"
              className="reg-close-btn"
              data-bs-dismiss="modal"
              onClick={closeRegister}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <h3 className="reg-title">
              <i className="fa-solid fa-graduation-cap"></i> Сургалтад бүртгүүлэх
            </h3>

            <p className="reg-sub">Дараах мэдээллийг үнэн зөв бөглөнө үү.</p>

            <div className="reg-form">
              <div className="reg-input">
                <i className="fa-solid fa-user"></i>
                <input
                  value={form.lastname}
                  onChange={(e) => setField("lastname", e.target.value)}
                  placeholder="Овог"
                />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-user"></i>
                <input
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Нэр"
                />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-id-card"></i>
                <input
                  value={form.register}
                  onChange={(e) => setField("register", e.target.value)}
                  placeholder="Регистр"
                />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-envelope"></i>
                <input
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="Имэйл"
                />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-phone"></i>
                <input
                  value={form.phone1}
                  onChange={(e) => setField("phone1", e.target.value)}
                  placeholder="Утас 1"
                />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-phone"></i>
                <input
                  value={form.phone2}
                  onChange={(e) => setField("phone2", e.target.value)}
                  placeholder="Утас 2"
                />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-building"></i>
                <input
                  value={form.company}
                  onChange={(e) => setField("company", e.target.value)}
                  placeholder="Ажилын газар"
                />
              </div>

              <div className="reg-input">
                <i className="fa-solid fa-briefcase"></i>
                <input
                  value={form.position}
                  onChange={(e) => setField("position", e.target.value)}
                  placeholder="Албан тушаал"
                />
              </div>
            </div>

            <div className="reg-conditions">
              <p>
                <b>Бүртгэлийн нөхцөл:</b>
              </p>
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
