import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { comicsAPI } from '../api/comics';
import Navbar from './Navbar';
import './ComicDetail.css';

function ComicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comic, setComic] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComic();
  }, [id]);

  const loadComic = async () => {
    try {
      const { data } = await comicsAPI.getById(id);
      setComic(data);
      setChapters(data.chapters || []);
    } catch (error) {
      console.error('Failed to load comic:', error);
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

  if (!comic) return <div className="container mt-4"><h3>Comic not found</h3></div>;

  return (
    <div className="comic-detail-page">
      <Navbar />
      <div className="container">
        <button onClick={() => navigate('/comics')} className="btn btn-outline mb-3">
          ← Back to Comics
        </button>
        
        <div className="card mb-3">
          <div className="comic-detail-content">
            <img
              src={comic.cover_image || 'https://via.placeholder.com/220x320?text=No+Image'}
              alt={comic.title}
              className="detail-cover"
            />
            <div className="detail-info">
              <h1 className="detail-title">{comic.title}</h1>
              <p className="text-muted mb-2"><strong>Author:</strong> {comic.author}</p>
              <p className="text-muted mb-2"><strong>Rating:</strong> ★ {comic.average_rating}</p>
              <p className="mb-2">{comic.description}</p>
              <p className="text-muted">Views: {comic.views_count}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-3">
            <h2 className="mb-3">Chapters</h2>
            <div className="chapter-list">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  onClick={() => navigate(`/comics/${id}/chapters/${chapter.id}`)}
                  className="chapter-item"
                >
                  <strong>Chapter {chapter.chapter_number}:</strong> {chapter.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComicDetail;
