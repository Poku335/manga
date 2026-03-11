import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { comicsAPI } from '../api/comics';
import './Reader.css';

function Reader() {
  const { comicId, chapterId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChapter();
  }, [comicId, chapterId]);

  const loadChapter = async () => {
    try {
      const { data } = await comicsAPI.getChapter(comicId, chapterId);
      setChapter(data);
      setPages(data.pages || []);
      
      await comicsAPI.updateHistory(comicId, chapterId);
    } catch (error) {
      console.error('Failed to load chapter:', error);
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
    <div className="reader-page">
      <div className="reader-header">
        <button onClick={() => navigate(`/comics/${comicId}`)} className="btn-back">
          ← Back
        </button>
        <h2 className="reader-title">
          Chapter {chapter?.chapter_number}: {chapter?.title}
        </h2>
        <div style={{width: '80px'}}></div>
      </div>

      <div className="reader-content">
        {pages.map((page) => (
          <img
            key={page.id}
            src={page.image_url}
            alt={`Page ${page.page_number}`}
            className="reader-page-img"
          />
        ))}
      </div>
    </div>
  );
}

export default Reader;
