import React, { useEffect, useState } from 'react';
import { API_BASE } from '../../lib/api';
import { Card, Input, Button } from '../components/AdminUI';

const StaffSettings = () => {
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({ organization: '', position: '', name: '', room: '', phone: '', email: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchStaff(); }, []);

const fetchStaff = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/staff`, { credentials: "include" });
    const data = await res.json();

    if (Array.isArray(data)) {
      setStaff(data);
    } else {
      console.error("Data is not an array:", data);
      setStaff([]); 
    }
  } catch (error) {
    console.error("Fetch error:", error);
    setStaff([]);
  }
};

// ... JSX хэсэгт map хийхийн өмнө шалгах (сонголтоор)
{Array.isArray(staff) && staff.map(s => (
  <tr key={s._id}>
     {/* ... */}
  </tr>
))}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_BASE}/api/staff/${editId}` : `${API_BASE}/api/staff`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include"
    });
    
    setForm({ organization: '', position: '', name: '', room: '', phone: '', email: '' });
    setEditId(null);
    fetchStaff();
    alert("Амжилттай!");
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Устгах уу?")) return;
    await fetch(`${API_BASE}/api/staff/${id}`, { method: "DELETE", credentials: "include" });
    fetchStaff();
  };

  return (
    <Card title="👤 Алба хаагчид">
      <form onSubmit={handleSubmit} className="settings-grid">
        <Input label="Байгууллага" value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} required />
        <Input label="Албан тушаал" value={form.position} onChange={e => setForm({...form, position: e.target.value})} required />
        <Input label="Нэр" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <Input label="Өрөө" value={form.room} onChange={e => setForm({...form, room: e.target.value})} />
        <Input label="Ажлын утас" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        <Input label="И-Мэйл" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <Button type="submit">{editId ? "Шинэчлэх" : "Хадгалах"}</Button>
      </form>

      <table className="settings-table" style={{marginTop: '30px'}}>
        <thead>
          <tr>
            <th>Нэр</th>
            <th>Албан тушаал</th>
            <th>Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.position}</td>
              <td>
                <button className="edit-btn" onClick={() => { setForm(s); setEditId(s._id); }}>✏</button>
                <button className="delete-btn" onClick={() => deleteItem(s._id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default StaffSettings;