import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authAPI } from '../api/auth';
import Navbar from './Navbar';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await authAPI.getMe();
      setUser(data);
    } catch (error) {
      console.error('Failed to load profile:', error);
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
    <div className="profile-page">
      <Navbar />
      
      <div className="profile-container">
        <div className="profile-header">
          <h1><span className="icon icon-user" aria-hidden="true"></span> โปรไฟล์</h1>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="profile-info">
              <div className="info-row">
                <span className="info-label">ชื่อผู้ใช้:</span>
                <span className="info-value">{user?.username}</span>
              </div>
              <div className="info-row">
                <span className="info-label">อีเมล:</span>
                <span className="info-value">{user?.email}</span>
              </div>

            </div>
          </div>

          <div className="quick-links">
            <button className="link-card" onClick={() => navigate('/bookmarks')}>
              <div className="link-icon"><span className="icon icon-bookmark" aria-hidden="true"></span></div>
              <div className="link-text">
                <h3>บุ๊คมาร์ค</h3>
                <p>การ์ตูนที่บันทึกไว้</p>
              </div>
            </button>

            <button className="link-card" onClick={() => navigate('/history')}>
              <div className="link-icon"><span className="icon icon-bookmark" aria-hidden="true"></span></div>
              <div className="link-text">
                <h3>ประวัติการอ่าน</h3>
                <p>การ์ตูนที่อ่านล่าสุด</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
