import { useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, User } from 'lucide-react';
import family from '../assets/nav_family.svg';

// 기존 Footer가 NaviBar의 역할입니다.
export default function Footer() {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname;

	const isActive = (path: string) => location.pathname === path ? 'bg-[#CDE7EC]' : '';

	if (path !== '/' && path !== '/my') return null;

	return (
		<div
			className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[400px] bg-[#E9EFF0] p-1 text-center z-50 border-t
			flex justify-around items-center
			rounded-tl-lg rounded-tr-lg shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.1)]">

			<div
				onClick={() => navigate('/')}
				className={`flex flex-col items-center cursor-pointer p-2`}
			>
				<div className={`flex items-center cursor-pointer p-2 rounded-full ${isActive('/')}`}>
					{/* <MessageSquareText className="w-6 h-6" /> */}
					<img src={family} alt="아이콘" className="w-6 h-6" />
				</div>
				<span className="text-sm mt-1 text-[#3F484A] font-bold">도란도란</span>
			</div>
			<div
				onClick={() => navigate('/chat')}
				className={`flex flex-col items-center cursor-pointer p-2`}
			>
				<div className={`flex items-center cursor-pointer p-2 rounded-full ${isActive('/chat')}`}>
					<MessageCircle className="w-6 h-6" />
				</div>
				<span className="text-sm mt-1 text-[#3F484A] font-bold">대화</span>
			</div>
			<div
				onClick={() => navigate('/mypage')}
				className={`flex flex-col items-center cursor-pointer p-2`}
			>
				<div className={`flex items-center cursor-pointer p-2 rounded-full ${isActive('/my')}`}>
					<User className="w-6 h-6" />
				</div>
				<span className="text-sm mt-1 text-[#3F484A] font-bold">마이페이지</span>
			</div>
		</div>
	);
}
