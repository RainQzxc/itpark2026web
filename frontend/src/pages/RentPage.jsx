import React, { useEffect, useState } from "react";
import { API_BASE } from "../lib/api";

export default function RentPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/rent`).then(res => res.json()).then(data => setRooms(data));
  }, []);

  return (
    <div id="wrapper" className="dark-scheme hero-full">
      <section className="py-5" style={{ background: "linear-gradient(180deg, #0E00A7 0%, #09E69A 100%)", minHeight: "100vh", color: "#fff" }}>
        <div className="container mt-5 pt-5">
          <h2 className="text-center fw-bold mb-5" style={{ color: "#09E69A" }}>Өрөөний түрээсийн төлөв</h2>
          <div className="row justify-content-center">
            <div className="col-lg-6 bg-dark p-0 rounded-4 overflow-hidden border border-secondary">
              <div className="d-flex bg-black p-3 fw-bold border-bottom border-secondary">
                <div style={{flex:1}}>Өрөөний дугаар</div>
                <div style={{flex:1, textAlign:'center'}}>Төлөв</div>
              </div>
              {rooms.map(room => (
                <div key={room._id} className="d-flex p-3 border-bottom border-secondary align-items-center">
                  <div style={{flex:1}} className="fs-5">№ {room.roomNumber}</div>
                  <div style={{flex:1, textAlign:'center'}}>
                    {room.isRented ? (
                      <span className="badge bg-danger rounded-pill px-3">Түрээсэлсэн</span>
                    ) : (
                      <span className="fs-4 fw-light text-secondary">Сул</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}