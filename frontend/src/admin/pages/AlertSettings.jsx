import React, { useEffect, useState } from 'react';
import { API_BASE } from '../../lib/api';

const AlertSettings = () => {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    const res = await fetch(`${API_BASE}/api/alerts`, { credentials: "include" });
    const data = await res.json();
    setAlerts(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000); // 30 сек тутам шинэчилнэ
    return () => clearInterval(interval);
  }, []);

  const markRead = async (id) => {
    await fetch(`${API_BASE}/api/alerts/${id}/read`, { method: "PUT", credentials: "include" });
    fetchAlerts();
  };

  return (
    <div className="notify-container">
      <h2>🔔 Сургалтын бүртгэлийн мэдэгдлүүд</h2>
      <div id="notifyList">
        {alerts.map((a) => (
          <div key={a._id} className={`notify-item ${a.read ? "notify-read" : ""}`} onClick={() => markRead(a._id)}>
            <div className="notify-info">
              <div style={{fontWeight: 'bold'}}>👤 {a.name} — {a.phone}</div>
              <div className="notify-small">📧 {a.email} | 🎓 {a.trainingId}</div>
              <div className="notify-small">📅 {new Date(a.createdAt).toLocaleString()}</div>
            </div>
            {!a.read && <div className="notify-badge">Шинэ</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertSettings;