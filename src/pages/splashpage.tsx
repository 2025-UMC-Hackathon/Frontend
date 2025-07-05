import logo_example from '../assets/logo_example.svg';
import ic_landing_news from '../assets/ic_landing_news.svg';
import ic_landing_write from '../assets/ic_landing_write.svg';
import BoardList from '../components/board/BoardList'
import { useNavigate } from 'react-router-dom';

export default function Splash() {
	const navigate = useNavigate();
	
	return (
		<div className="flex flex-col p-[16px]">
			<img src={logo_example} alt="로고 이미지"
				className="w-auto h-[28px] self-start px-[16px]" />
			
			<h2 className="flex items-start px-[16px] mt-[32px] text-[20px] leading-[28px] font-semibold text-[#171D1E]">히로님을 위한 소식</h2>
			<img src={ic_landing_news} alt="유저를 위한 소식" 
				className="mt-[8px] mb-[24px]" />

			

			<BoardList />
			
			<div className="w-[400px] relative">
				<button
					onClick={()=>navigate("/write")}
					className="
						absolute
						bottom-[32px] right-[32px]
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
			
		</div>
	);
}
