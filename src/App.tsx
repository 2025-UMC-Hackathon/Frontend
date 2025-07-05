import { Routes, Route } from 'react-router-dom';
import Splash from './pages/splashpage';
import Home from './pages/homepage';
import My from './pages/mypage';
import Signup from './pages/signuppage';
import Login from './pages/loginpage';
import Community from './pages/communitypage';
import Chat from './pages/chatpage';
import './App.css';

export default function App() {
  return (
    <Routes>
      {/* 나중에, 스플래쉬 페이지에서 useEffect 3초를 걸고 /home으로 이동하도록 하고 스플래쉬 경로를 /로 하는 작업 필요!! */}
      {/* 당장 스플래쉬 화면이 중요한 것은 아니니 일단은 home을 /경로로 삼았습니다. */}
      <Route path="/splash" element={<Splash />} />
      <Route path="/" element={<Home />} />
      <Route path="/my" element={<My />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/community" element={<Community />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}
