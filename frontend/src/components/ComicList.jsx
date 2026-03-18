import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import Navbar from './Navbar';
import './ComicList.css';

function ComicList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [comics, setComics] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'recent');

  useEffect(() => {
    loadGenres();
    loadComics();
  }, [selectedGenre, sortBy]);

  const loadGenres = async () => {
    try {
      const { data } = await axios.get('/api/v1/genres');
      setGenres(data);
    } catch (error) {
      console.error('Failed to load genres:', error);
    }
  };

  const loadComics = async () => {
    try {
      setLoading(true);
      
      const params = {
        sort: sortBy,
        ...(selectedGenre && { genre: selectedGenre })
      };

      const { data } = await axios.get('/api/v1/comics', { params });
      setComics(data);
    } catch (error) {
      console.error('Failed to load comics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (genreName) => {
    setSelectedGenre(genreName);
    navigate(`/comics?genre=${genreName}&sort=${sortBy}`);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    navigate(`/comics?sort=${sort}${selectedGenre ? `&genre=${selectedGenre}` : ''}`);
  };

  if (loading && comics.length === 0) {
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
        <h1 className="page-title"><span className="icon icon-bookmark" aria-hidden="true"></span> ค้นหาการ์ตูนและนิยาย</h1>
        
        {}
        <div className="filters-section">
          <div className="filter-group">
            <label><span className="icon icon-bookmark" aria-hidden="true"></span> ประเภท:</label>
            <select 
              value={selectedGenre} 
              onChange={(e) => handleGenreChange(e.target.value)}
              className="filter-select"
            >
              <option value="">ทั้งหมด</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label><span className="icon icon-all" aria-hidden="true"></span> เรียงลำดับ:</label>
            <select 
              value={sortBy} 
              onChange={(e) => handleSortChange(e.target.value)}
              className="filter-select"
            >
              <option value="recent">ล่าสุด</option>
              <option value="popular">ยอดนิยม</option>
              <option value="trending">เรื่องยอดฮิต</option>
            </select>
          </div>
        </div>

        {comics.length > 0 ? (
          <div className="comic-grid">
            {comics.map((comic) => (
              <div 
                key={comic.id} 
                className="comic-card" 
                onClick={() => navigate(`/comics/${comic.id}`)}
              >
                <div className="comic-image-wrapper">
                  <img
                    src={comic.cover_image || 'https://via.placeholder.com/180x240?text=No+Image'}
                    alt={comic.title}
                    className="comic-cover"
                  />
                  <div className="comic-overlay-list">
                    <button className="read-button-list">อ่าน</button>
                  </div>
                  {comic.average_rating > 0 && (
                    <div className="rating-badge-list">★ {comic.average_rating.toFixed(1)}</div>
                  )}
                </div>
                <div className="comic-info">
                  <h3 className="comic-title">{comic.title}</h3>
                  {(comic.primary_genre || comic.secondary_genre) && (
                    <p className="comic-genre">
                      {comic.primary_genre}
                      {comic.secondary_genre && ` x ${comic.secondary_genre}`}
                    </p>
                  )}
                  <p className="comic-author">โดย {comic.author || 'Unknown'}</p>
                  <div className="comic-stats">
                    <span><span className="icon icon-history" aria-hidden="true"></span> {comic.views_count?.toLocaleString() || 0}</span>
                    <span><span className="icon icon-bookmark" aria-hidden="true"></span> {comic.bookmarks_count || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-comics">
            <p>ไม่พบการ์ตูนหรือนิยาย</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComicList;
