import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage';
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
import Rankings from './components/Rankings';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comics" element={<ComicList />} />
        <Route path="/comics/:id" element={<ComicDetail />} />
        <Route path="/comics/:comicId/chapters/:chapterId" element={<Reader />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/history" element={<History />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<UserManagement />} />
        <Route path="/dashboard/comics/new" element={<ComicForm />} />
        <Route path="/dashboard/comics/:id/edit" element={<ComicForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
