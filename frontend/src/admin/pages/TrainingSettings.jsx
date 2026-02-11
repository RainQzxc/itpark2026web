import React, { useEffect, useState } from 'react';
import { useAdminForm } from '../../hooks/useAdminForm';
import { Card, Input, Button } from '../components/AdminUI';
import { API_BASE } from '../../lib/api';

const TrainingSettings = () => {
  const [trainings, setTrainings] = useState([]);
  const { data, setData, handleChange, handleUpload, handleSave, loading } = useAdminForm({
    title: '', shortDesc: '', startDate: '', endDate: '', price: '', 
    certificate: 'true', lunch: 'true', teacher: '', teacherBio: '', 
    requirements: '', program: '', image: ''
  }, '/api/training');

  useEffect(() => { fetchTrainings(); }, []);

  const fetchTrainings = async () => {
    const res = await fetch(`${API_BASE}/api/training`);
    const list = await res.json();
    setTrainings(list);
  };

  const onSave = async () => {
    const payload = {
      ...data,
      duration: { start: data.startDate, end: data.endDate },
      requirements: data.requirements.split('\n').filter(x => x.trim()),
      program: data.program.split('\n').filter(x => x.trim()),
      certificate: data.certificate === 'true',
      lunch: data.lunch === 'true'
    };
    await handleSave(payload);
    fetchTrainings();
  };

  return (
    <Card title="🎓 Сургалтын төв">
      <div className="settings-grid">
        <Input label="Гарчиг" value={data.title} onChange={e => handleChange('title', e.target.value)} />
        <Input label="Төлбөр" value={data.price} onChange={e => handleChange('price', e.target.value)} />
        <Input label="Эхлэх" type="date" value={data.startDate} onChange={e => handleChange('startDate', e.target.value)} />
        <Input label="Дуусах" type="date" value={data.endDate} onChange={e => handleChange('endDate', e.target.value)} />
      </div>

      <textarea placeholder="Товч тайлбар" value={data.shortDesc} onChange={e => handleChange('shortDesc', e.target.value)} />
      
      <div className="settings-grid">
        <div>
          <label>Сертификат</label>
          <select value={data.certificate} onChange={e => handleChange('certificate', e.target.value)}>
            <option value="true">✓ Байгаа</option>
            <option value="false">✗ Байхгүй</option>
          </select>
        </div>
        <div>
          <label>Цайны завсарлага</label>
          <select value={data.lunch} onChange={e => handleChange('lunch', e.target.value)}>
            <option value="true">✓ Байгаа</option>
            <option value="false">✗ Байхгүй</option>
          </select>
        </div>
      </div>

      <Input label="Сургагч багш" value={data.teacher} onChange={e => handleChange('teacher', e.target.value)} />
      <textarea placeholder="Багшийн танилцуулга" value={data.teacherBio} onChange={e => handleChange('teacherBio', e.target.value)} />

      <textarea placeholder="Шаардлага (мөр бүрээр)" value={data.requirements} onChange={e => handleChange('requirements', e.target.value)} />
      <textarea placeholder="Хөтөлбөр (мөр бүрээр)" value={data.program} onChange={e => handleChange('program', e.target.value)} />

      <input type="file" onChange={e => handleUpload(e.target.files[0])} />
      <Button onClick={onSave} loading={loading}>Хадгалах</Button>

      {/* Хүснэгт хэсгийг энд Staff-тай адилхан нэмж болно */}
    </Card>
  );
};

export default TrainingSettings;