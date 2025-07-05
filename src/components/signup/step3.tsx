import Button from "../button";
import { useNavigate } from "react-router-dom";
import icon from '../../assets/check_small.svg';

export default function Step3() {
	const navigate = useNavigate();

	return (
		<div className="w-full max-w-md flex flex-col items-center justify-center gap-10">
			<div className="flex flex-col items-center justify-center gap-3">
				<img src={icon} alt="아이콘" className="w-100 h-100" />
				<p className="text-base font-bold">회원가입이 완료되었습니다!</p>
			</div>

			<Button backgroundColor="bg-[#CDE7EC]" borderRadius="rounded-full"
				fontWeight="font-bold" fontColor="#008491" padding="p-4" width="w-full"
				onClick={() => { navigate('/login') }}>로그인하러 가기</Button>
		</div>
	);
}
