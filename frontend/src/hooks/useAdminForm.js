import { useState } from 'react';
import { API_BASE } from '../lib/api';

export const useAdminForm = (initialState, endpoint, options = {}) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const savePath = options.savePath ?? "/save";
  const saveMethod = options.saveMethod ?? "POST";

  const loadData = async () => {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      credentials: "include",
    });
    const result = await res.json();
    setData(result);
  };

  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleUpload = async (file) => {
    if (!file) return { success: false, error: "No file selected" };

    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(`${API_BASE}${endpoint}/upload`, {
      method: "POST",
      body: fd,
      credentials: "include",
    });
    const result = await res.json();
    if (result.success) handleChange('image', result.image);
    if (!res.ok || !result.success) {
      throw new Error(result.error || "Image upload failed");
    }
    return result;
  };

 const handleSave = async (customData) => {
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE}${endpoint}${savePath}`, {
      method: saveMethod,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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
