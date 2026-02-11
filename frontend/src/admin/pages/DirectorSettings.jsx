import React, { useEffect } from 'react';
import { useAdminForm } from '../../hooks/useAdminForm';
import { Card, Input, Button } from '../components/AdminUI';

const DirectorSettings = () => {
  const { data, loadData, handleChange, handleUpload, handleSave, loading } = 
    useAdminForm({ title: '', name: '', position: '', text: '', image: '' }, '/api/director');

  useEffect(() => { loadData(); }, []);

  return (
    <Card title="Захирлын мэндчилгээ засвар">
      <div className="settings-grid">
        <Input label="Гарчиг" value={data.title} onChange={e => handleChange('title', e.target.value)} />
        <Input label="Нэр" value={data.name} onChange={e => handleChange('name', e.target.value)} />
        <Input label="Албан тушаал" value={data.position} onChange={e => handleChange('position', e.target.value)} />
      </div>
      <label>Текст</label>
      <textarea value={data.text} onChange={e => handleChange('text', e.target.value)} />
      
      <label>Зураг</label>
      {data.image && <img src={data.image} className="preview-img" alt="Preview" />}
      <input type="file" onChange={e => handleUpload(e.target.files[0])} />

      <Button onClick={() => handleSave()} loading={loading}>Хадгалах</Button>
    </Card>
  );
};

export default DirectorSettings;