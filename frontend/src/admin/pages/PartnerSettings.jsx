import React, { useEffect, useState } from 'react';
import { useAdminForm } from '../../hooks/useAdminForm';
import { Card, Input, Button } from '../components/AdminUI';
import { API_BASE } from '../../lib/api';

const PartnerSettings = () => {
  const [partners, setPartners] = useState([]);
  const { data, handleChange, handleUpload, handleSave, loading } = useAdminForm({
    title: 'Үндсэн Инкубатор', name: '', image: ''
  }, '/api/partners');

  useEffect(() => { /* fetch partners logic */ }, []);

  return (
    <Card title="🤝 Хамтрагч байгууллагууд">
      <label>Инкубаторын төрөл</label>
      <select value={data.title} onChange={e => handleChange('title', e.target.value)}>
        <option value="Үндсэн Инкубатор">Үндсэн Инкубатор</option>
        <option value="Цахим Инкубатор">Цахим Инкубатор</option>
      </select>

      <Input label="Байгууллагын нэр" value={data.name} onChange={e => handleChange('name', e.target.value)} />
      
      <label>Лого (PNG)</label>
      <input type="file" onChange={e => handleUpload(e.target.files[0])} />
      {data.image && <img src={data.image} style={{width: '120px'}} alt="Partner" />}

      <Button onClick={() => handleSave()} loading={loading}>Хадгалах</Button>
    </Card>
  );
};

export default PartnerSettings;