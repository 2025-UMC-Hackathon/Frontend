import { useNavigate } from 'react-router-dom';

export default function MyPage() {
	const navigate = useNavigate();

	const handleWrittenByMe = () => {
		navigate('/writtedbyme');
	};

	const handleLikedByMe = () => {
		navigate('/likedbyme');
	};

	return (
		<div className="flex flex-col items-center justify-start p-2">
			<div className="w-full max-w-md">
				{/* 탭 버튼들 */}
				<div className="flex gap-2 mb-4">
					<button
						onClick={handleWrittenByMe}
						className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
					>
						내가 작성한 글
					</button>
					<button
						onClick={handleLikedByMe}
						className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
					>
						좋아요
					</button>
				</div>
			</div>
		</div>
	);
}