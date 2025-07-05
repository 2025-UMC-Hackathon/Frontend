import { Routes, Route } from 'react-router-dom';
import Home from './pages/homepage';
import My from './pages/mypage';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/my" element={<My />} />
    </Routes>
  );
}
