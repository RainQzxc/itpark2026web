import React, { useEffect, useState } from 'react';
import { API_BASE } from '../../lib/api';
import { Card, Input, Button } from '../components/AdminUI';

const emptyForm = {
  date: '',
  title: '',
  shortText: '',
  content: '',
  image: '',
};

const toDateInput = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
};

const NewsSettings = () => {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadNews = async () => {
    const res = await fetch(`${API_BASE}/api/news`, {
      credentials: 'include',
    });
    const data = await res.json();
    setNews(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditId(null);
  };

  const handleUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);

      const res = await fetch(`${API_BASE}/api/news/upload`, {
        method: 'POST',
        body: fd,
        credentials: 'include',
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Image upload failed');
      }

      handleChange('image', result.image);
    } catch (error) {
      alert(error.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) return alert('Please enter a title.');
    if (!form.image) return alert('Please upload an image before saving.');

    setLoading(true);
    try {
      const url = editId ? `${API_BASE}/api/news/${editId}` : `${API_BASE}/api/news`;
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Save failed');
      }

      alert(editId ? 'News updated.' : 'News created.');
      resetForm();
      await loadNews();
    } catch (error) {
      alert(error.message || 'Save failed.');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({
      date: toDateInput(item.date),
      title: item.title || '',
      shortText: item.shortText || '',
      content: item.content || '',
      image: item.image || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteNews = async (id) => {
    if (!window.confirm('Delete this news item?')) return;

    try {
      const res = await fetch(`${API_BASE}/api/news/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Delete failed');
      }

      if (editId === id) resetForm();
      await loadNews();
    } catch (error) {
      alert(error.message || 'Delete failed.');
    }
  };

  return (
    <>
      <Card title={editId ? 'Edit News' : 'Create News'}>
        <div className="settings-grid">
          <Input label="Date" type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} />
          <Input label="Title" value={form.title} onChange={e => handleChange('title', e.target.value)} />
        </div>

        <Input label="Short text" value={form.shortText} onChange={e => handleChange('shortText', e.target.value)} />

        <label>Content</label>
        <textarea rows="6" value={form.content} onChange={e => handleChange('content', e.target.value)} />

        <label>Image</label>
        <input type="file" accept="image/*" onChange={e => handleUpload(e.target.files[0])} />
        {uploading && <p>Uploading image...</p>}
        {form.image && <img src={form.image} className="preview-img" alt="News Preview" />}

        <div className="admin-actions">
          <Button onClick={handleSubmit} loading={loading}>{editId ? 'Update' : 'Create'}</Button>
          {editId && <button type="button" className="secondary-btn" onClick={resetForm}>Cancel</button>}
        </div>
      </Card>

      <Card title="Existing News">
        <table className="settings-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.length === 0 ? (
              <tr>
                <td colSpan="4">No news yet.</td>
              </tr>
            ) : (
              news.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={item.image || '/images/news.jpg'} className="table-thumb" alt={item.title} />
                  </td>
                  <td>{item.title}</td>
                  <td>{toDateInput(item.date) || '-'}</td>
                  <td>
                    <button type="button" className="edit-btn" onClick={() => startEdit(item)}>Edit</button>
                    <button type="button" className="delete-btn" onClick={() => deleteNews(item._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default NewsSettings;
