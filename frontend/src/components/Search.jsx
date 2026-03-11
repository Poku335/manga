import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchAPI } from '../api/search';
import Navbar from './Navbar';
import './Search.css';

function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const { data } = await searchAPI.search(query);
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <Navbar />
      
      <div className="search-container">
        <div className="search-header">
          <h1>🔍 ค้นหาการ์ตูน</h1>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาชื่อเรื่อง, ผู้แต่ง..."
              className="search-input"
            />
            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? '⏳' : '🔍'} ค้นหา
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="search-results">
            <h2>ผลการค้นหา ({results.length})</h2>
            <div className="results-grid">
              {results.map((comic) => (
                <div key={comic.id} className="result-card" onClick={() => navigate(`/comics/${comic.id}`)}>
                  <img src={comic.cover_image || 'https://via.placeholder.com/200x280'} alt={comic.title} />
                  <div className="result-info">
                    <h3>{comic.title}</h3>
                    <p>{comic.author}</p>
                    <div className="result-stats">
                      <span>⭐ {comic.average_rating}</span>
                      <span>👁 {comic.views_count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && results.length === 0 && query && (
          <div className="no-results">
            <p>😔 ไม่พบผลการค้นหาสำหรับ "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
