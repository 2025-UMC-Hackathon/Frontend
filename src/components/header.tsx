import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

export default function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname;

	// splash, login 페이지에서는 Header 숨김
	if (path === '/splash' || path === '/login' || path === '/') return null;

	// 경로별 텍스트
	const backTextMap: Record<string, string> = {
		'/signup': '회원가입',
		'/community': '커뮤니티',
		'/write': '글 작성하기',
		'/chat': 'AI 채팅',
		'/mypage': '마이페이지',
		'/writtedbyme': '내가 작성한 글',
		'/likedbyme': '좋아요 한 게시물',
	};

	// 뒤로가기 버튼이 필요한 경로
	if (backTextMap[path]) {
		return (
			<div className="bg-white p-3 flex items-center h-16">
				<button
					className="w-[30%] bg-white text-xl font-basic flex items-center gap-2"
					onClick={() => navigate(-1)}
				>
					<ArrowLeft size={20} color="#000" />
				</button>
				<div className="w-[40%] flex items-center justify-center">{backTextMap[path]}</div>
			</div>
		);
	}

	// 기본 로고 헤더 ("/"인 경우) -> null로 수정 
	// return (
	// 	<div className="bg-white p-3 flex justify-start items-start h-16">
	// 		<Button width="w-auto" padding="p-0" backgroundColor="bg-0" onClick={() => { navigate('/') }}>
	// 			<img src={logo} alt="아이콘" className="w-[70px] h-[20px]" />
	// 		</Button>
	// 	</div>
	// );
}
