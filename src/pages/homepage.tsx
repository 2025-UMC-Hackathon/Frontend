import logo_example from '../assets/logo_example.svg';
import ic_landing_write from '../assets/ic_landing_write.svg';
import BoardList from '../components/board/BoardList'
import { useNavigate } from 'react-router-dom';
import homepageimage from '../assets/homepageimage.png';

export default function HomePage() {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col min-h-screen pb-[80px] relative bg-white">

			<img src={logo_example} alt="로고 이미지"
				className="w-auto h-[28px] self-start px-[16px]" />

			<h2 className="flex items-start px-[16px] mt-[32px] text-[20px] leading-[28px] font-semibold text-[#171D1E]">히로님을 위한 소식</h2>
			<img
				src={homepageimage}
				alt="이야기를 나눠서 많은 도움이 됐어요"
				className="mt-[1px] mb-[2px] w-full rounded-[24px] object-cover"
			/>




			<BoardList />


			<button
				onClick={() => navigate("/write")}
				className="
						fixed 
						bottom-[112px] right-[350px]
						w-[48px] h-[48px] p-[15px]
						rounded-full border border-[#BFC8CA] bg-[#DEE3E4]
						shadow-[0px_4px_4px_rgba(0,0,0,0.15)]
						flex items-center justify-center
						z-50
					"
			>
				<img src={ic_landing_write} alt="icon" className="w-[18px] h-[18px]" />
			</button>


		</div>
	);
}
