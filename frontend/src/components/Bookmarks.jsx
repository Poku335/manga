import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { comicsAPI } from '../api/comics';
import Navbar from './Navbar';
import './Bookmarks.css';

function Bookmarks() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const { data } = await comicsAPI.getBookmarks();
      setBookmarks(data);
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="bookmarks-page">
      <Navbar />
      
      <div className="bookmarks-container">
        <div className="bookmarks-header">
          <h1><span className="icon icon-bookmark" aria-hidden="true"></span> บุ๊คมาร์ค</h1>
          <p>การ์ตูนที่คุณบันทึกไว้</p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><span className="icon icon-bookmark" aria-hidden="true"></span></div>
            <h2>ยังไม่มีบุ๊คมาร์ค</h2>
            <p>เริ่มบันทึกการ์ตูนที่คุณชอบเพื่ออ่านต่อในภายหลัง</p>
            <button className="btn-browse" onClick={() => navigate('/comics')}>
              เรียกดูการ์ตูน
            </button>
          </div>
        ) : (
          <div className="bookmarks-grid">
            {bookmarks.map((bookmark) => (
              <div key={bookmark.id} className="bookmark-card" onClick={() => navigate(`/comics/${bookmark.chapter?.comic?.id}/chapters/${bookmark.chapter?.id}`)}>
                <img
                  src={bookmark.chapter?.comic?.cover_image || 'https://via.placeholder.com/200x280?text=No+Image'}
                  alt={bookmark.chapter?.comic?.title}
                  className="bookmark-cover"
                />
                <div className="bookmark-info">
                  <h3>{bookmark.chapter?.comic?.title}</h3>
                  <p>ตอนที่ {bookmark.chapter?.chapter_number}: {bookmark.chapter?.title}</p>
                  <span className="bookmark-page">หน้า {bookmark.last_page}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
