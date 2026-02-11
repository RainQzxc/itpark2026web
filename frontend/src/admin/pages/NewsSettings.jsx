import React from 'react';
import { useAdminForm } from '../../hooks/useAdminForm';
import { Card, Input, Button } from '../components/AdminUI';

const NewsSettings = () => {
  const { data, handleChange, handleUpload, handleSave, loading } = useAdminForm({
    date: '', title: '', content: '', image: ''
  }, '/api/news');

  return (
    <Card title="📰 Мэдээ оруулах">
      <div className="settings-grid">
        <Input label="Огноо" type="date" value={data.date} onChange={e => handleChange('date', e.target.value)} />
        <Input label="Гарчиг" value={data.title} onChange={e => handleChange('title', e.target.value)} />
      </div>

      <label>Мэдээний дэлгэрэнгүй</label>
      <textarea rows="6" value={data.content} onChange={e => handleChange('content', e.target.value)} />

      <label>Зураг</label>
      <input type="file" onChange={e => handleUpload(e.target.files[0])} />
      {data.image && <img src={data.image} className="preview-img" alt="News Preview" />}

      <Button onClick={() => handleSave()} loading={loading}>Хадгалах</Button>
    </Card>
  );
};

export default NewsSettings;