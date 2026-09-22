import { Link } from "react-router-dom";

const ABOUT_LINKS = [
  ["/about", "Бидний тухай"],
  ["/director", "Захирлын мэндчилгээ"],
  ["/vision-mission", "Алсын хараа"],
  ["/staff", "Алба хаагчид"],
];

const SERVICE_LINKS = [
  ["/incubator", "Инкубатор"],
  ["/training-center", "Сургалтын төв"],
  ["/rent", "Түрээсийн үйлчилгээ"],
  ["/news", "Мэдээ мэдээлэл"],
];

export default function Footer() {
  return (
    <footer className="itp-site-footer">
      <div className="container">
        <div className="itp-footer-grid">
          <div className="itp-footer-contact">
            <p className="itp-footer-eyebrow">Мэдээлэл, технологийн үндэсний парк</p>
            <address>
              Улаанбаатар 210646, Сүхбаатар дүүрэг,
              <br />
              Бага тойруу 49
            </address>
            <a href="mailto:info@itpark.mn">info@itpark.mn</a>
            <a href="tel:+97611327123">(+976) 11-327123</a>
          </div>

          <div className="itp-footer-links">
            <p>Байгууллага</p>
            {ABOUT_LINKS.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
          </div>

          <div className="itp-footer-links">
            <p>Үйлчилгээ</p>
            {SERVICE_LINKS.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
          </div>

          <div className="itp-footer-brand">
            <Link to="/" aria-label="IT Park нүүр хуудас">
              <img src="/images/002.png" alt="IT Park Mongolia" />
            </Link>
            <div className="itp-footer-social" aria-label="Сошиал холбоосууд">
              <a href="https://www.facebook.com/ITPARK.mn" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/itparkmn" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://x.com/ItparkM" target="_blank" rel="noreferrer" aria-label="X"><i className="fa-brands fa-twitter"></i></a>
              <a href="https://youtube.com/@nationalitparkmongolia" target="_blank" rel="noreferrer" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>
        </div>

        <div className="itp-footer-bottom">
          <small>Copyright 2025 © IT Park. All rights reserved.</small>
          <a href="https://itpark.mn" target="_blank" rel="noreferrer">itpark.mn</a>
        </div>
      </div>
    </footer>
  );
}
