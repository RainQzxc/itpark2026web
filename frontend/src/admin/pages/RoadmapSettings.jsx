import React, { useState, useEffect } from 'react';
import { API_BASE } from '../../lib/api';
import { Card, Input, Button } from '../components/AdminUI';

const RoadmapSettings = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [form, setForm] = useState({ year: '', title: '', text: '' });

  useEffect(() => { fetchRoadmaps(); }, []);

  const fetchRoadmaps = async () => {
    const res = await fetch(`${API_BASE}/api/roadmap`);
    const data = await res.json();
    setRoadmaps(data);
  };

  const handleSave = async () => {
    // Текст доторх New Line-ийг <br/> болгож хадгалах логик
    const payload = { ...form, text: form.text.replace(/\n/g, "<br/>") };
    
    await fetch(`${API_BASE}/api/roadmap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include"
    });
    
    setForm({ year: '', title: '', text: '' });
    fetchRoadmaps();
    alert("Roadmap амжилттай нэмэгдлээ!");
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Устгах уу?")) return;
    await fetch(`${API_BASE}/api/roadmap/${id}`, { method: "DELETE", credentials: "include" });
    fetchRoadmaps();
  };

  return (
    <Card title="📌 Байгууллагын түүх – Roadmap Editor">
      <div className="settings-grid">
        <Input label="Он" value={form.year} onChange={e => setForm({...form, year: e.target.value})} placeholder="2003" />
        <Input label="Гарчиг" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Анхны инкубац" />
      </div>
      <label>Текст</label>
      <textarea 
        value={form.text} 
        onChange={e => setForm({...form, text: e.target.value})} 
        placeholder="Мөр бүрийг Enter дарж бичнэ"
        style={{minHeight: '120px'}}
      />
      <Button onClick={handleSave}>Хадгалах</Button>

      <h3 style={{marginTop: '30px'}}>📋 Одоо байгаа Roadmap-ууд:</h3>
      <table className="settings-table">
        <thead>
          <tr>
            <th>Он</th>
            <th>Гарчиг</th>
            <th>Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {roadmaps.map(rm => (
            <tr key={rm._id}>
              <td>{rm.year}</td>
              <td>{rm.title}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteItem(rm._id)}>🗑 Устгах</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default RoadmapSettings;