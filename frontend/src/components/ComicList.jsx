import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { comicsAPI } from '../api/comics';
import Navbar from './Navbar';
import './ComicList.css';

function ComicList() {
  const navigate = useNavigate();
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComics();
  }, []);

  const loadComics = async () => {
    try {
      const { data } = await comicsAPI.getAll();
      setComics(data);
    } catch (error) {
      console.error('Failed to load comics:', error);
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
    <div className="comic-list-page">
      <Navbar />
      
      <div className="comic-list-container">
        <h1 className="page-title">การ์ตูนทั้งหมด</h1>
        
        <div className="comic-grid">
          {comics.map((comic) => (
            <div key={comic.id} className="comic-card" onClick={() => navigate(`/comics/${comic.id}`)}>
              <img
                src={comic.cover_image || 'https://via.placeholder.com/180x240/f5f5f5/999?text=No+Image'}
                alt={comic.title}
                className="comic-cover"
              />
              <div className="comic-info">
                <h3 className="comic-title">{comic.title}</h3>
                <p className="comic-author">{comic.author}</p>
                <div className="comic-stats">
                  <span>⭐ {comic.average_rating}</span>
                  <span>👁 {comic.views_count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComicList;
