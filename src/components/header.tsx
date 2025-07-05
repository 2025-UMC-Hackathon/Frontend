import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from "react";

const backComponentMap: Record<string, ReactNode> = {
	'/signup': <span className="text-base font-bold">회원가입</span>,
	'/community':
		(<div className="flex flex-col items-center justify-center">
			<p className="text-base font-bold">도란도란</p>
			<p className="text-sm">자유게시판</p>
		</div>),
	'/write': <span className="text-base font-bold">글 작성하기</span>,
	'/chat':
		(<div className="flex items-center justify-center">
			<p className="text-base font-bold">담담이</p>
			<p className="text-sm text-gray-200">GPT3.5</p>
		</div>),
	'/mypage': <span className="text-base font-bold">마이페이지</span>,
	'/writtedbyme':
		(<div className="flex flex-col items-center justify-center">
			<p className="text-base font-bold">마이페이지</p>
			<p className="text-sm">내가 작성한 글</p>
		</div>),
	'/likedbyme':
		(<div className="flex flex-col items-center justify-center">
			<p className="text-base font-bold">마이페이지</p>
			<p className="text-sm">공감한 글</p>
		</div>),
};

export default function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname;

	// splash, login, root 경로에서는 Header 숨김
	if (path === '/splash' || path === '/login' || path === '/') return null;

	const centerComponent = backComponentMap[path];

	if (centerComponent) {
		return (
			<div className="bg-white p-3 flex items-center h-16">
				<button
					className="w-[30%] bg-white text-xl font-basic flex items-center gap-2"
					onClick={() => navigate(-1)}
				>
					<ArrowLeft size={20} color="#000" />
				</button>

				<div className="w-[40%] flex items-center justify-center">
					{centerComponent}
				</div>
			</div>
		);
	}

	return null;
}
