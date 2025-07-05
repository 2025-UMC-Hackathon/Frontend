// 깃허브에서 이슈를 파고, dev에서 feature로 뻗어나가주세요!
// = Board 페이지

import ic_post from "../assets/ic_post.svg";
import { useNavigate } from 'react-router-dom';
import { BoardList } from '../components/board/BoardList';


export default function Home() {

	const navigate =useNavigate();

	return (
		<div className="flex flex-col items-start">
			{/* 배너 */}
			<div className="w-[348px] h-[90px] bg-[#D9D9D9] rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.25)] mx-auto mt-[14px]" />
			<BoardList />

			<button
				onClick={()=>navigate("/write")}
				className="
					fixed bottom-[110px] left-1/2 transform -translate-x-1/2
					w-[135px] h-[48px] bg-[#CACAD0]
					rounded-full border border-[#9C9C9C]
					p-3 gap-[10px] 
					flex items-center justify-center
					font-medium text-sm text-[#000000]
				"
			>
				<img src={ic_post} alt="icon" className="w-6 h-6" />
				글 작성하기
			</button>			

		</div>
	);
}
