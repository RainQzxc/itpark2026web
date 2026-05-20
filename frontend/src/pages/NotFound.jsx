import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div className="not-found-inner">
        <span className="not-found-code">404</span>
        <h1>Хуудас олдсонгүй</h1>
        <p>
          Таны хайсан хуудас устсан, шилжсэн эсвэл хаяг буруу бичигдсэн байж
          магадгүй.
        </p>
        <Link to="/" className="btn-main fx-slide not-found-link">
          <span>Нүүр хуудас руу буцах</span>
        </Link>
      </div>
    </section>
  );
}
