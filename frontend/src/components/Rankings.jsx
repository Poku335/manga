import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import Navbar from './Navbar';
import './Rankings.css';

export default function Rankings() {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState({
    topRated: [],
    mostViewed: [],
    mostBookmarked: []
  });
  const [activeTab, setActiveTab] = useState('topRated');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    try {
      setLoading(true);

      const [trendings] = await Promise.all([
        axios.get('/api/v1/comics/trending')
      ]);

      const allComics = trendings.data;
      
      setRankings({
        topRated: allComics.sort((a, b) => b.average_rating - a.average_rating).slice(0, 20),
        mostViewed: allComics.sort((a, b) => b.views_count - a.views_count).slice(0, 20),
        mostBookmarked: allComics.sort((a, b) => b.bookmarks_count - a.bookmarks_count).slice(0, 20)
      });
    } catch (err) {
      console.error('Error fetching rankings:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentData = () => {
    return rankings[activeTab];
  };

  if (loading) {
    return (
      <div className="rankings-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="rankings-page">
      <Navbar />
      <div className="rankings-container">
        <h1 className="rankings-title"><span className="icon icon-ranking" aria-hidden="true"></span> จัดอันดับ</h1>

      <div className="rankings-tabs">
        <button
          className={`tab-button ${activeTab === 'topRated' ? 'active' : ''}`}
          onClick={() => setActiveTab('topRated')}
        >
          ★ ยอดคะแนน
        </button>
        <button
          className={`tab-button ${activeTab === 'mostViewed' ? 'active' : ''}`}
          onClick={() => setActiveTab('mostViewed')}
        >
          <span className="icon icon-history" aria-hidden="true"></span> ยอดเข้าชม
        </button>
        <button
          className={`tab-button ${activeTab === 'mostBookmarked' ? 'active' : ''}`}
          onClick={() => setActiveTab('mostBookmarked')}
        >
          <span className="icon icon-bookmark" aria-hidden="true"></span> ยอดบันทึก
        </button>
      </div>

      <div className="rankings-list">
        {getCurrentData().map((comic, index) => (
          <RankingItem
            key={comic.id}
            comic={comic}
            rank={index + 1}
            onClickComic={() => navigate(`/comics/${comic.id}`)}
          />
        ))}
      </div>
      </div>
    </div>
  );
}

function RankingItem({ comic, rank, onClickComic }) {
  const defaultImage = 'https://via.placeholder.com/150x220?text=No+Cover';

  return (
    <div className="ranking-item" onClick={onClickComic}>
      <div className="rank-number">#{rank}</div>
      <div className="ranking-image">
        <img src={comic.cover_image || defaultImage} alt={comic.title} />
      </div>
      <div className="ranking-info">
        <h3 className="ranking-title">{comic.title}</h3>
        {(comic.primary_genre || comic.secondary_genre) && (
          <p className="ranking-genre">
            {comic.primary_genre}
            {comic.secondary_genre && ` x ${comic.secondary_genre}`}
          </p>
        )}
        <p className="ranking-author">โดย {comic.author || 'Unknown'}</p>
        <div className="ranking-stats">
          <span>★ {comic.average_rating?.toFixed(1) || 0}</span>
          <span><span className="icon icon-history" aria-hidden="true"></span> {comic.views_count?.toLocaleString() || 0}</span>
          <span><span className="icon icon-bookmark" aria-hidden="true"></span> {comic.bookmarks_count || 0}</span>
        </div>
      </div>
    </div>
  );
}
