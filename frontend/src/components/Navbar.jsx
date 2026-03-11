import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate('/comics')}>
          📚 Comic Reader
        </div>
        
        <div className="navbar-menu">
          <button className="nav-link" onClick={() => navigate('/comics')}>หน้าแรก</button>
          <button className="nav-link">Action</button>
          <button className="nav-link" onClick={() => navigate('/search')}>🔍 ค้นหา</button>
          <button className="nav-link">Fantasy</button>
          <button className="nav-link">Comedy</button>
        </div>

        <div className="navbar-actions">
          {user?.role === 'admin' && (
            <button className="btn-register" onClick={() => navigate('/dashboard')}>
              📊 Dashboard
            </button>
          )}
          <button className="btn-register" onClick={() => navigate('/profile')}>
            👤 โปรไฟล์
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            ออกจากระบบ
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
