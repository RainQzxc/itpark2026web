import { useEffect } from "react";

export default function DigitalIncubator() {
  // HTML дээр байсан header scroll effect (scrolled class нэмдэг)
  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector(".itp-header");
      if (!header) return;
      if (window.scrollY > 50) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section-padding itp-info-section">
      <div className="container">
        <div className="itp-info-wrap">
          <div className="itp-info-eyebrow">Инкубатор</div>

          <h1 className="itp-info-title">
            Инкубаторын хөтөлбөрийн сонгон шалгаруулалтад оролцохын тулд дараах
            материалыг бүрдүүлнэ
          </h1>

          <p className="itp-info-subtitle">
            Доорх материалыг бүрдүүлээд цахим болон биет хэлбэрээр ирүүлнэ.
            Дутуу материалтай тохиолдолд бүртгэл баталгаажихгүй.
          </p>

          <ul className="itp-info-list">
            <li>Хөтөлбөрт элсэхийг хүссэн өргөдөл</li>

            <li>
              Хавсралтын дагуу боловсруулсан бизнес төлөвлөгөө{" "}
              <a
                href="/downloads/havsralt.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                /хавсралт-8/
              </a>
            </li>

            <li>
              Хэрэв хуулийн этгээд бол улсын бүртгэлийн гэрчилгээний хуулбар;
              иргэн/баг бол гишүүдийн иргэний үнэмлэхний хуулбар
            </li>

            <li>Бүртгэлийн хураамж төлсөн баримтыг ирүүлэх</li>
            <li>
              Ирүүлсэн баримт бичгүүдийг цахим болон биет хэлбэрээр хүлээн авч
              битүүмжилнэ
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
