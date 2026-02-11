import React, { useEffect } from 'react';
import { useAdminForm } from '../../hooks/useAdminForm';
import { Card, Input, Button } from '../components/AdminUI';

const ContactSettings = () => {
  const { data, loadData, handleChange, handleSave, loading } = useAdminForm({
    vision_title: '', vision_text: '', mission_title: '', mission_text: '',
    priority_title: '', priority_list: '', duty_title: '', duty_text: '',
    strategy_title: '', strategy_text: ''
  }, '/api/contact');

  useEffect(() => { loadData(); }, []);

  const onSave = () => {
    // split хийхээс өмнө String мөн эсэхийг шалгана
    let list = data.priority_list;
    if (typeof list === 'string') {
        list = list.split('\n').map(s => s.trim()).filter(s => s !== "");
    }
    
    handleSave({ ...data, priority_list: list });
  };

  return (
    <Card title="Контент засвар">
      <div className="settings-grid">
        <Input label="Алсын хараа – Гарчиг" value={data.vision_title} onChange={e => handleChange('vision_title', e.target.value)} />
        <Input label="Эрхэм зорилго – Гарчиг" value={data.mission_title} onChange={e => handleChange('mission_title', e.target.value)} />
      </div>
      <textarea placeholder="Алсын хараа – Текст" value={data.vision_text} onChange={e => handleChange('vision_text', e.target.value)} />
      <textarea placeholder="Эрхэм зорилго – Текст" value={data.mission_text} onChange={e => handleChange('mission_text', e.target.value)} />
      
      <Input label="Тэргүүлэх чиглэл – Гарчиг" value={data.priority_title} onChange={e => handleChange('priority_title', e.target.value)} />
      
      {/* Энд join('\n') нэмсэн */}
      <textarea 
        placeholder="Чиглэлүүд (мөр бүрээр)" 
        value={Array.isArray(data.priority_list) ? data.priority_list.join('\n') : data.priority_list} 
        onChange={e => handleChange('priority_list', e.target.value)} 
      />

      <div className="settings-grid">
        <Input label="Чиг үүрэг – Гарчиг" value={data.duty_title} onChange={e => handleChange('duty_title', e.target.value)} />
        <Input label="Стратегийн зорилго – Гарчиг" value={data.strategy_title} onChange={e => handleChange('strategy_title', e.target.value)} />
      </div>
      <Button onClick={onSave} loading={loading}>Хадгалах</Button>
    </Card>
  );
};

export default ContactSettings;