import { useState } from 'react';
import { API_BASE } from '../lib/api';

export const useAdminForm = (initialState, endpoint) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    const res = await fetch(`${API_BASE}${endpoint}`);
    const result = await res.json();
    setData(result);
  };

  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleUpload = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(`${API_BASE}${endpoint}/upload`, { method: "POST", body: fd });
    const result = await res.json();
    if (result.success) handleChange('image', result.image);
    return result;
  };

 const handleSave = async (customData) => {
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE}${endpoint}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customData || data)
    });
    
    if (res.ok) {
      alert("Амжилттай хадгаллаа!");
      // ЭНЭ МӨРИЙГ НЭМ: Хадгалсны дараа шинэ өгөгдлийг Backend-ээс дахин татаж авна
      await loadData(); 
    }
  } catch (error) {
    console.error("Хадгалах үед алдаа гарлаа:", error);
  } finally {
    setLoading(false);
  }
};

  return { data, setData, loadData, handleChange, handleUpload, handleSave, loading };
};