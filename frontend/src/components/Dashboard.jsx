import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { comicsAPI } from '../api/comics';
import { useAuthStore } from '../store/authStore';
import Navbar from './Navbar';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [comics, setComics] = useState([]);
  const [stats, setStats] = useState({
    totalComics: 0,
    totalViews: 0,
    totalUsers: 0
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/comics');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    try {
      const { data } = await comicsAPI.getAll();
      setComics(data);
      setStats({
        totalComics: data.length,
        totalViews: data.reduce((sum, comic) => sum + comic.views_count, 0),
        totalUsers: 100
      });
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('ต้องการลบการ์ตูนนี้?')) {
      try {
        await comicsAPI.delete(id);
        loadData();
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>📊 Admin Dashboard</h1>
          <button className="btn-create" onClick={() => navigate('/dashboard/comics/new')}>
            ➕ เพิ่มการ์ตูนใหม่
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <div className="stat-value">{stats.totalComics}</div>
              <div className="stat-label">การ์ตูนทั้งหมด</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👁</div>
            <div className="stat-info">
              <div className="stat-value">{stats.totalViews.toLocaleString()}</div>
              <div className="stat-label">ยอดเข้าชมรวม</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <div className="stat-value">{stats.totalUsers}</div>
              <div className="stat-label">สมาชิกทั้งหมด</div>
            </div>
          </div>
        </div>

        <div className="table-section">
          <div className="section-header">
            <h2>จัดการการ์ตูน</h2>
            <button className="btn-users" onClick={() => navigate('/dashboard/users')}>
              👥 จัดการผู้ใช้
            </button>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ปก</th>
                  <th>ชื่อเรื่อง</th>
                  <th>ผู้แต่ง</th>
                  <th>สถานะ</th>
                  <th>ยอดเข้าชม</th>
                  <th>คะแนน</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {comics.map((comic) => (
                  <tr key={comic.id}>
                    <td>
                      <img src={comic.cover_image || 'https://via.placeholder.com/60x80'} alt={comic.title} className="table-thumb" />
                    </td>
                    <td className="font-bold">{comic.title}</td>
                    <td>{comic.author}</td>
                    <td>
                      <span className={`status-badge ${comic.status}`}>
                        {comic.status === 'published' ? '✅ เผยแพร่' : '📝 แบบร่าง'}
                      </span>
                    </td>
                    <td>{comic.views_count}</td>
                    <td>⭐ {comic.average_rating}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-edit" onClick={() => navigate(`/dashboard/comics/${comic.id}/edit`)}>
                          ✏️
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(comic.id)}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
