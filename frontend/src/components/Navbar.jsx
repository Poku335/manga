import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './Navbar.css';
import { useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <span className="brand-icon icon icon-home" aria-hidden="true"></span>
          <span className="brand-text">ReadRealm</span>
        </div>
        
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="icon icon-all" aria-hidden="true"></span>
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <button className="nav-link" onClick={() => { navigate('/'); setMobileMenuOpen(false); }}>
            <span className="icon icon-home" aria-hidden="true"></span>หน้าแรก
          </button>
          <button className="nav-link" onClick={() => { navigate('/comics'); setMobileMenuOpen(false); }}>
            <span className="icon icon-bookmark" aria-hidden="true"></span>ทั้งหมด
          </button>
          <button className="nav-link" onClick={() => { navigate('/rankings'); setMobileMenuOpen(false); }}>
            <span className="icon icon-ranking" aria-hidden="true"></span>จัดอันดับ
          </button>
          <button className="nav-link" onClick={() => { navigate('/search'); setMobileMenuOpen(false); }}>
            <span className="icon icon-search" aria-hidden="true"></span>ค้นหา
          </button>
          <button className="nav-link" onClick={() => { navigate('/bookmarks'); setMobileMenuOpen(false); }}>
            <span className="icon icon-bookmark" aria-hidden="true"></span>ที่บันทึก
          </button>
          <button className="nav-link" onClick={() => { navigate('/history'); setMobileMenuOpen(false); }}>
            <span className="icon icon-history" aria-hidden="true"></span>ประวัติ
          </button>
        </div>

        <div className="navbar-actions">
          {user?.role === 'admin' && (
            <button className="btn-action btn-dashboard" onClick={() => navigate('/dashboard')}>
              <span className="icon icon-dashboard" aria-hidden="true"></span>แดชบอร์ด
            </button>
          )}
          <button className="btn-action btn-profile" onClick={() => navigate('/profile')}>
            <span className="icon icon-user" aria-hidden="true"></span>{user?.username || 'User'}
          </button>
          {user ? (
            <button className="btn-action btn-logout" onClick={handleLogout}>
              <span className="icon icon-logout" aria-hidden="true"></span>ออกจากระบบ
            </button>
          ) : (
            <button className="btn-action btn-login" onClick={() => navigate('/login')}>
              <span className="icon icon-lock" aria-hidden="true"></span>เข้าสู่ระบบ
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
