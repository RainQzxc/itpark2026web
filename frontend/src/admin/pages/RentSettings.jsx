import React, { useEffect, useState } from 'react';
import { API_BASE } from '../../lib/api';

const RentSettings = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoomNumber, setNewRoomNumber] = useState("");

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/rent`);
      const data = await res.json();
      setRooms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Дата татахад алдаа гарлаа:", err);
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  // Шинэ өрөө нэмэх функц
  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (!newRoomNumber) return;

    try {
      const res = await fetch(`${API_BASE}/api/rent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomNumber: newRoomNumber }),
        credentials: "include"
      });
      if (res.ok) {
        setNewRoomNumber("");
        fetchRooms();
      }
    } catch (err) {
      console.error("Өрөө нэмэхэд алдаа гарлаа:", err);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/rent/${id}/toggle`, { 
        method: "PUT", 
        credentials: "include" 
      });
      if (res.ok) fetchRooms();
    } catch (err) {
      console.error("Алдаа:", err);
    }
  };

  return (
    <div className="notify-container p-4">
      <h2 className="mb-4">🔑 Өрөө түрээсийн удирдлага</h2>
      
      {/* Өрөө нэмэх хэсэг */}
      <div className="card p-3 mb-4 shadow-sm border-0 bg-light">
        <form onSubmit={handleAddRoom} className="d-flex gap-2">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Өрөөний дугаар (Жишээ нь: 101)" 
            value={newRoomNumber}
            onChange={(e) => setNewRoomNumber(e.target.value)}
          />
          <button type="submit" className="btn btn-primary px-4 text-nowrap">
            + Өрөө нэмэх
          </button>
        </form>
      </div>

      <div id="notifyList">
        {rooms.length === 0 && <p className="text-muted text-center">Одоогоор өрөө бүртгэгдээгүй байна.</p>}
        {rooms.map((r) => (
          <div key={r._id} className="notify-item d-flex justify-content-between align-items-center p-3 mb-2 bg-white rounded shadow-sm border">
            <div className="notify-info">
              <div style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Өрөө №{r.roomNumber}</div>
              <div className={r.isRented ? "text-danger" : "text-success"}>
                {r.isRented ? "🔴 Түрээсэлсэн" : "🟢 Сул (X)"}
              </div>
            </div>
            <button 
              className={`btn ${r.isRented ? 'btn-outline-success' : 'btn-outline-danger'}`}
              onClick={() => toggleStatus(r._id)}
            >
              {r.isRented ? "Сул болгох" : "Түрээслэх"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentSettings;