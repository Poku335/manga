import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Login from './components/Login';
import Register from './components/Register';
import ComicList from './components/ComicList';
import ComicDetail from './components/ComicDetail';
import Reader from './components/Reader';
import Dashboard from './components/Dashboard';
import Search from './components/Search';
import UserManagement from './components/UserManagement';
import ComicForm from './components/ComicForm';
import Profile from './components/Profile';
import Bookmarks from './components/Bookmarks';
import History from './components/History';

function PrivateRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  try {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/comics" element={<PrivateRoute><ComicList /></PrivateRoute>} />
          <Route path="/comics/:id" element={<PrivateRoute><ComicDetail /></PrivateRoute>} />
          <Route path="/comics/:comicId/chapters/:chapterId" element={<PrivateRoute><Reader /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/bookmarks" element={<PrivateRoute><Bookmarks /></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/dashboard/users" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
          <Route path="/dashboard/comics/new" element={<PrivateRoute><ComicForm /></PrivateRoute>} />
          <Route path="/dashboard/comics/:id/edit" element={<PrivateRoute><ComicForm /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  } catch (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: '#f7fafc',
        padding: '20px'
      }}>
        <h1 style={{color: '#e53e3e', marginBottom: '16px'}}>Error Loading App</h1>
        <p style={{color: '#718096'}}>{error.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }
}

export default App;
