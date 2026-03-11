import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { comicsAPI } from '../api/comics';
import Navbar from './Navbar';
import './ComicForm.css';

function ComicForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    status: 'draft',
    cover_image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      loadComic();
    }
  }, [id]);

  const loadComic = async () => {
    try {
      const { data } = await comicsAPI.getById(id);
      setFormData({
        title: data.title || '',
        description: data.description || '',
        author: data.author || '',
        status: data.status || 'draft',
        cover_image: data.cover_image || ''
      });
    } catch (error) {
      console.error('Failed to load comic:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEdit) {
        await comicsAPI.update(id, formData);
      } else {
        await comicsAPI.create(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.errors?.join(', ') || 'Failed to save comic');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comic-form-page">
      <Navbar />
      
      <div className="form-container">
        <div className="form-header">
          <h1>{isEdit ? '✏️ แก้ไขการ์ตูน' : '➕ เพิ่มการ์ตูนใหม่'}</h1>
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            ← ยกเลิก
          </button>
        </div>

        <form onSubmit={handleSubmit} className="comic-form">
          <div className="form-grid">
            <div className="form-group">
              <label>ชื่อเรื่อง *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input"
                placeholder="ชื่อการ์ตูน"
              />
            </div>

            <div className="form-group">
              <label>ผู้แต่ง *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="input"
                placeholder="ชื่อผู้แต่ง"
              />
            </div>

            <div className="form-group full-width">
              <label>คำอธิบาย</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea"
                rows="5"
                placeholder="เรื่องย่อของการ์ตูน"
              />
            </div>

            <div className="form-group">
              <label>URL รูปปก</label>
              <input
                type="url"
                name="cover_image"
                value={formData.cover_image}
                onChange={handleChange}
                className="input"
                placeholder="https://example.com/cover.jpg"
              />
            </div>

            <div className="form-group">
              <label>สถานะ</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select"
              >
                <option value="draft">📝 แบบร่าง</option>
                <option value="published">✅ เผยแพร่</option>
              </select>
            </div>
          </div>

          {formData.cover_image && (
            <div className="preview-section">
              <label>ตัวอย่างปก:</label>
              <img src={formData.cover_image} alt="Preview" className="cover-preview" />
            </div>
          )}

          {error && (
            <div className="alert alert-error">{error}</div>
          )}

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard')}>
              ยกเลิก
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? '⏳ กำลังบันทึก...' : isEdit ? '💾 บันทึกการแก้ไข' : '➕ เพิ่มการ์ตูน'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ComicForm;
