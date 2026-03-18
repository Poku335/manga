import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import Navbar from './Navbar';
import './Homepage.css';


window.DEBUG_HOMEPAGE = true;

export default function Homepage() {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [trendingRes, popularRes, genresRes] = await Promise.all([
        axios.get('/api/v1/comics/trending').catch(err => {
          console.error('Trending error:', err);
          return { data: [] };
        }),
        axios.get('/api/v1/comics/popular').catch(err => {
          console.error('Popular error:', err);
          return { data: [] };
        }),
        axios.get('/api/v1/genres').catch(err => {
          console.error('Genres error:', err);
          return { data: [] };
        })
      ]);

      setTrending(trendingRes.data || []);
      setPopular(popularRes.data || []);
      setGenres(genresRes.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load content. Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleComicClick = (comicId) => {
    navigate(`/comics/${comicId}`);
  };

  const handleGenreClick = (genreName) => {
    setSelectedGenre(genreName);
    navigate(`/comics?genre=${genreName}`);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="homepage-loading">
          <div className="spinner"></div>
          <p>Loading content...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="homepage">
      {}
      <section className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title"> ยินดีต้อนรับสู่โลกมังงะและนิยายออนไลน์</h1>
          <p className="hero-subtitle">ค้นหาและอ่านเรื่องราวที่โดดเด่นจากนักเขียนมากมาย</p>
          <div className="hero-search">
            <input
              type="text"
              placeholder="ค้นหานิยายหรือการ์ตูน..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/search?q=${e.target.value}`);
                }
              }}
            />
            <button onClick={() => navigate('/comics')}>ดูทั้งหมด</button>
          </div>
        </div>
        <div className="hero-background"></div>
      </section>

      {}
      {trending && trending.length > 0 && (
        <section className="trending-section">
          <div className="section-header">
            <h2>ตอนพิเศษที่กำลังมาแรง</h2>
            <a href="/comics?sort=trending">ดูเพิ่มเติม ›</a>
          </div>
          <div className="comic-grid">
            {trending.slice(0, 6).map((comic) => (
              <ComicCard key={`trending-${comic.id}`} comic={comic} onClickComic={handleComicClick} />
            ))}
          </div>
        </section>
      )}

      {}
      {genres && genres.length > 0 && (
        <section className="genre-section">
          <h2>🏷️ ประเภทเรื่อง</h2>
          <div className="genre-tags">
            {genres.slice(0, 12).map((genre) => (
              <button
                key={`tag-${genre.id}`}
                className={`genre-tag ${selectedGenre === genre.name ? 'active' : ''}`}
                onClick={() => handleGenreClick(genre.name)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </section>
      )}


      {}
      <section className="featured-section">
        <div className="section-header">
          <h2>การดูนิยายอดฮิต...ตลอดกาล</h2>
          <a href="/comics?sort=popular">ดูเพิ่มเติม ›</a>
        </div>
        <div className="comic-grid">
          {popular && popular.length > 0 ? (
            popular.slice(0, 6).map((comic) => (
              <ComicCard key={comic.id} comic={comic} onClickComic={handleComicClick} />
            ))
          ) : (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
              ไม่พบเรื่องยอดนิยม
            </p>
          )}
        </div>
      </section>

      {}
      {genres && genres.length > 0 && (
        genres.slice(0, 4).map((genre) => (
          <GenreSection
            key={`${genre.id}-${genre.name}`}
            genre={genre}
            onComicClick={handleComicClick}
          />
        ))
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      </div>
    </>
  );
}

function ComicCard({ comic, onClickComic }) {
  const defaultImage = 'https://via.placeholder.com/200x300?text=No+Image';

  if (!comic) {
    return null;
  }

  const viewCount = comic.views_count ? comic.views_count.toLocaleString() : '0';
  const bookmarkCount = comic.bookmarks_count || 0;
  
  
  const rating = comic.average_rating ? parseFloat(comic.average_rating) : 0;
  
  return (
    <div className="comic-card" onClick={() => onClickComic(comic.id)}>
      <div className="comic-image">
        <img src={comic.cover_image || defaultImage} alt={comic.title || 'Comic'} />
        <div className="comic-overlay">
          <button className="read-button">อ่านตอนนี้</button>
        </div>
        {rating && rating > 0 && (
          <div className="rating-badge">{rating.toFixed(1)}★</div>
        )}
      </div>
      <div className="comic-info">
        <h3 className="comic-title">{comic.title || 'Untitled'}</h3>
        {comic.primary_genre && (
          <p className="comic-genre">
            {comic.primary_genre}
            {comic.secondary_genre && ` x ${comic.secondary_genre}`}
          </p>
        )}
        <p className="comic-author">โดย {comic.author || 'Unknown'}</p>
        <div className="comic-stats">
          <span><span className="icon icon-history" aria-hidden="true"></span> {viewCount}</span>
          <span><span className="icon icon-bookmark" aria-hidden="true"></span> {bookmarkCount}</span>
        </div>
      </div>
    </div>
  );
}

function GenreSection({ genre, onComicClick }) {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!genre || !genre.name) {
      setLoading(false);
      return;
    }

    const fetchGenreComics = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/comics`, {
          params: { genre: genre.name }
        });
        setComics(res.data || []);
      } catch (err) {
        console.error(`Error fetching genre comics for ${genre.name}:`, err);
        setComics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreComics();
  }, [genre?.name, genre?.id]);

  if (loading || !comics || comics.length === 0) {
    return null;
  }

  return (
    <section className="featured-section">
      <div className="section-header">
        <h2>🤩 {genre.name}</h2>
        <a href={`/comics?genre=${genre.name}`}>ดูเพิ่มเติม ›</a>
      </div>
      <div className="comic-grid">
        {comics.slice(0, 6).map((comic) => (
          <ComicCard key={comic.id} comic={comic} onClickComic={onComicClick} />
        ))}
      </div>
    </section>
  );
}
