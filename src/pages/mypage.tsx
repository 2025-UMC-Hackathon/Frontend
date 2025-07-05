import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { ClipboardList } from 'lucide-react';


export default function MyPage() {
	const navigate = useNavigate();

	const handleWrittenByMe = () => {
		navigate('/writtedbyme');
	};

	const handleLikedByMe = () => {
		navigate('/likedbyme');
	};

	return (
		<div className="flex flex-col w-full">
				{/* 탭 버튼들 */}
				<div className="flex flex-col mx-[28px]">
					<button
						onClick={handleWrittenByMe}
						className="bg-white p-[16px] font-medium cursor-pointer transition duration-200 active:bg-[#1D1B201A]"
					>
						<div className="flex items-center">
							<ClipboardList size={20} color="#171D1E"/>
							<span className="text-[#3F484A] ml-[12px]">내가 작성한 게시물</span>
						</div>
						
					</button>
					<button
						onClick={handleLikedByMe}
						className="bg-white p-[16px] font-medium cursor-pointer transition duration-300 active:bg-[#1D1B201A]"
					>
						<div className="flex items-center">
							<Heart size={20} color="#171D1E"/>
							<span className="text-[#3F484A] ml-[12px]">공감한 게시물</span>
						</div>						
					</button>
				</div>
			</div>
	);
}