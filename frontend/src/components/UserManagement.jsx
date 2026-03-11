import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersAPI } from '../api/users';
import { useAuthStore } from '../store/authStore';
import Navbar from './Navbar';
import './UserManagement.css';

function UserManagement() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/comics');
      return;
    }
    loadUsers();
  }, [user, navigate]);

  const loadUsers = async () => {
    try {
      const { data } = await usersAPI.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBan = async (id) => {
    if (window.confirm('ต้องการแบนผู้ใช้นี้?')) {
      try {
        await usersAPI.ban(id);
        loadUsers();
      } catch (error) {
        console.error('Failed to ban user:', error);
      }
    }
  };

  const handleUnban = async (id) => {
    try {
      await usersAPI.unban(id);
      loadUsers();
    } catch (error) {
      console.error('Failed to unban user:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('ต้องการลบผู้ใช้นี้? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
      try {
        await usersAPI.delete(id);
        loadUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
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
    <div className="user-management-page">
      <Navbar />
      
      <div className="management-container">
        <div className="management-header">
          <h1>👥 จัดการผู้ใช้</h1>
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            ← กลับ Dashboard
          </button>
        </div>

        <div className="stats-summary">
          <div className="stat-box">
            <div className="stat-number">{users.length}</div>
            <div className="stat-label">ผู้ใช้ทั้งหมด</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{users.filter(u => u.role === 'admin').length}</div>
            <div className="stat-label">ผู้ดูแลระบบ</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{users.filter(u => u.status === 'banned').length}</div>
            <div className="stat-label">ถูกแบน</div>
          </div>
        </div>

        <div className="users-table-section">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ชื่อผู้ใช้</th>
                <th>อีเมล</th>
                <th>บทบาท</th>
                <th>สถานะ</th>
                <th>วันที่สมัคร</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td className="font-bold">{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-badge ${u.role}`}>
                      {u.role === 'admin' ? '👑 Admin' : '👤 User'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${u.status}`}>
                      {u.status === 'active' ? '✅ ใช้งาน' : '🚫 ถูกแบน'}
                    </span>
                  </td>
                  <td>{new Date(u.created_at).toLocaleDateString('th-TH')}</td>
                  <td>
                    <div className="action-btns">
                      {u.status === 'active' ? (
                        <button className="btn-ban" onClick={() => handleBan(u.id)}>
                          🚫 แบน
                        </button>
                      ) : (
                        <button className="btn-unban" onClick={() => handleUnban(u.id)}>
                          ✅ ปลดแบน
                        </button>
                      )}
                      <button className="btn-delete" onClick={() => handleDelete(u.id)}>
                        🗑️ ลบ
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
  );
}

export default UserManagement;
