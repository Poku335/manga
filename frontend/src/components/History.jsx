import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { comicsAPI } from '../api/comics';
import Navbar from './Navbar';
import './History.css';

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const { data } = await comicsAPI.getHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to load history:', error);
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
    <div className="history-page">
      <Navbar />
      
      <div className="history-container">
        <div className="history-header">
          <h1><span className="icon icon-bookmark" aria-hidden="true"></span> ประวัติการอ่าน</h1>
          <p>การ์ตูนที่คุณอ่านล่าสุด</p>
        </div>

        {history.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><span className="icon icon-bookmark" aria-hidden="true"></span></div>
            <h2>ยังไม่มีประวัติการอ่าน</h2>
            <p>เริ่มอ่านการ์ตูนเพื่อบันทึกประวัติของคุณ</p>
            <button className="btn-browse" onClick={() => navigate('/comics')}>
              เรียกดูการ์ตูน
            </button>
          </div>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <div key={item.id} className="history-item" onClick={() => navigate(`/comics/${item.comic?.id}`)}>
                <img
                  src={item.comic?.cover_image || 'https://via.placeholder.com/150x220?text=No+Cover'}
                  alt={item.comic?.title || 'No title'}
                  className="history-cover"
                />
                <div className="history-details">
                  <h3>{item.comic?.title}</h3>
                  <p className="history-author">{item.comic?.author}</p>
                  {item.last_chapter && (
                    <div className="history-progress">
                      <span className="progress-badge">
                        อ่านถึงตอนที่ {item.last_chapter?.chapter_number}
                      </span>
                      <button 
                        className="btn-continue"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/comics/${item.comic?.id}/chapters/${item.last_chapter?.id}`);
                        }}
                      >
                        อ่านต่อ →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
