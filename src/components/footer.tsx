import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquareText, MessageCircle, User } from 'lucide-react';

// 기존 Footer가 NaviBar의 역할입니다.
export default function Footer() {
	const navigate = useNavigate();
	const location = useLocation();

	const isActive = (path: string) => location.pathname === path ? 'bg-[#D9D9D9]' : '';

	return (
		<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[400px] bg-white p-3 text-center z-50 border-t flex justify-around items-center">
			<div
				onClick={() => navigate('/')}
				className={`flex flex-col items-center cursor-pointer p-2 rounded ${isActive('/')}`}
			>
				<MessageSquareText className="w-6 h-6" />
				<span className="text-sm mt-1">커뮤니티</span>
			</div>
			<div
				onClick={() => navigate('/chat')}
				className={`flex flex-col items-center cursor-pointer p-2 rounded ${isActive('/chat')}`}
			>
				<MessageCircle className="w-6 h-6" />
				<span className="text-sm mt-1">AI 채팅</span>
			</div>
			<div
				onClick={() => navigate('/my')}
				className={`flex flex-col items-center cursor-pointer p-2 rounded ${isActive('/my')}`}
			>
				<User className="w-6 h-6" />
				<span className="text-sm mt-1">저장한 꿀팁</span>
			</div>
		</div>
	);
}
