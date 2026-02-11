export default function Footer() {
  return (
    <footer className="text-light section-dark">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-md-12">
            <div className="d-lg-flex align-items-center justify-content-between text-center">
              <div>
                <h3 className="fs-20" style={{ color: "#09E69A" }}>
                  Мэдээлэл, Технологийн Үндэсний Парк
                </h3>
                Улаанбаатар- 210646, Сvхбаатар дvvрэг, Бага тойруу-49
                <br />
                info@itpark.mn
              </div>

              <div>
                <img src="/images/002.png" className="w-150px" alt="IT Park" />
                <br />
                <div className="social-icons mb-sm-30 mt-4">
                  <a href="https://www.facebook.com/ITPARK.mn" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="https://www.instagram.com/itparkmn" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="https://x.com/ItparkM" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="https://youtube.com/@nationalitparkmongolia" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="fs-20">Холбоо Барих</h3>
                <p>
                  <i className="fa fa-globe me-2"></i>
                  <a href="http://itpark.mn" target="_blank" rel="noreferrer" className="text-light">
                    itpark.mn
                  </a>
                  <br />
                  Утас: (+976) 11-327123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="subfooter">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              Copyright 2025 - All Rights Reserved.{" "}
              <a href="#" className="custom-cursor-pointer">
                Developed by <img style={{ height: 40 }} src="#" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
