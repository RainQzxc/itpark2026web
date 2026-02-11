import { useEffect } from "react";

export default function IncubatorProgram() {
  useEffect(() => {
    // Template js-үүд SPA дээр route солигдоход ажиллахгүй байх тохиолдол байдаг
    // (чи App.jsx дээр load/resize dispatch хийсэн тул энэ optional)
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <section className="itp-timeline-section">
      <div className="container">
        <div className="itp-tl">
          {/* Head */}
          <div className="itp-tl-head">
            <h1>Сонгон шалгаруулалт</h1>
            <p>
              Шүүгчид хүсэлт гаргагчийн бизнес төлөвлөгөөнд үнэлгээ өгөхдөө Innovation Readiness Level (IRL)
              үнэлгээний аргыг ашиглана.
            </p>
          </div>

          {/* Timeline items */}
          <div className="itp-tl-items">
            {/* 1 */}
            <article className="itp-tl-item">
              <div className="itp-tl-date">Үнэлгээний шалгуур</div>
              <div className="itp-tl-dot" aria-hidden="true"></div>

              <div className="itp-tl-card">
                <h3>Innovation Readiness Level (IRL)</h3>
                <ul className="itp-tl-list">
                  <li>Technology Readiness Level (TRL)</li>
                  <li>Customer Readiness Level (CRL)</li>
                  <li>Business Model Readiness Level (BRL)</li>
                  <li>IPR Readiness Level (IPRL)</li>
                  <li>Team Readiness Level (TMRL)</li>
                  <li>Funding Readiness Level (FRL)</li>
                </ul>
              </div>
            </article>

            {/* 2 */}
            <article className="itp-tl-item">
              <div className="itp-tl-date">Үндсэн инкубатор</div>
              <div className="itp-tl-dot" aria-hidden="true"></div>

              <div className="itp-tl-card">
                <h3>Оролцогчид тавигдах шаардлага</h3>

                <div className="itp-tl-step">
                  <span className="itp-tl-step-badge">Алхам 1</span>
                  <p>
                    Хөгжүүлэх гэж буй бүтээгдэхүүн, үйлчилгээ нь мэдээллийн технологи, дэвшилтэт технологи, инновацад
                    суурилсан шинэлэг санаа бүхий эдийн засгийн үр ашигтай бизнесийг дотоод, гадаадын зах зээлд
                    нэвтрүүлэх зорилготой иргэн, баг, хуулийн этгээд байна.
                  </p>
                </div>

                <div className="itp-tl-step">
                  <span className="itp-tl-step-badge">Алхам 2</span>
                  <p>
                    Хөтөлбөрт дэмжлэг авах хугацаандаа мөрдөх, хагас жил тутмын үйл ажиллагаанд нь хяналт тавих боломжтой
                    бизнес төлөвлөгөөтэй байна.
                  </p>
                </div>

                <div className="itp-tl-step">
                  <span className="itp-tl-step-badge">Алхам 3</span>
                  <p>Өмнө нь паркийн инкубаторын хөтөлбөрт хамрагдаж байгаагүй байна.</p>
                </div>
              </div>
            </article>

            {/* 3 */}
            <article className="itp-tl-item">
              <div className="itp-tl-date">Ахисан түвшин</div>
              <div className="itp-tl-dot" aria-hidden="true"></div>

              <div className="itp-tl-card">
                <h3>Оролцогчид тавигдах шаардлага</h3>

                <div className="itp-tl-step">
                  <span className="itp-tl-step-badge">Алхам 1</span>
                  <p>
                    Мэдээллийн технологи, дэвшилтэт технологи, инновацад суурилсан шинэлэг санаа бүхий эдийн засгийн үр
                    ашигтай бизнес эрхэлж буй хуулийн этгээд байна.
                  </p>
                </div>

                <div className="itp-tl-step">
                  <span className="itp-tl-step-badge">Алхам 2</span>
                  <p>
                    Хөтөлбөрт дэмжлэг авах хугацаандаа мөрдөх, хагас жил тутмын үйл ажиллагаанд нь хяналт тавих боломж
                    бүхий бизнес төлөвлөгөөтэй байна.
                  </p>
                </div>
              </div>
            </article>

            {/* 4 */}
            <article className="itp-tl-item">
              <div className="itp-tl-date">Дараах үйлчилгээ</div>
              <div className="itp-tl-dot" aria-hidden="true"></div>

              <div className="itp-tl-card">
                <h3>Оролцогчид тавигдах шаардлага</h3>

                <div className="itp-tl-step">
                  <span className="itp-tl-step-badge">Алхам 1</span>
                  <p>
                    Хөгжүүлэх гэж буй бүтээгдэхүүн, үйлчилгээ нь мэдээллийн технологи, дэвшилтэт технологи, инновацад
                    суурилсан шинэлэг санаа бүхий эдийн засгийн үр ашигтай бизнесийг дотоод, гадаадын зах зээлд
                    нэвтрүүлэх зорилготой иргэн, баг, хуулийн этгээд байна.
                  </p>
                </div>

                <div className="itp-tl-step">
                  <span className="itp-tl-step-badge">Алхам 2</span>
                  <p>Компанийн үйл ажиллагаа тогтворжсон, санхүүгийн хувьд нэмэх баланстай байна.</p>
                </div>

                <div className="itp-tl-step">
                  <span className="itp-tl-step-badge">Алхам 3</span>
                  <p>Парктай хамтран төсөл, хөтөлбөр боловсруулах, тэдгээрийн үр шимийг хуваалцах боломжтой байна.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
