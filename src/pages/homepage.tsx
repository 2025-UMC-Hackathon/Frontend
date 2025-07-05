import { useNavigate } from 'react-router-dom';
import Button from "../components/button";
import LoginTextField from '../components/LoginTextField';

export default function Home() {
	const navigate = useNavigate();

	const handleChange = () => {
		console.log("handle");
	}
	

	return (
		<div className="flex flex-col items-center justify-start p-2">
			<p className="mb-4 text-lg">여기는 홈화면~</p>

			<LoginTextField
				placeholder="이메일"
				value="이메일을 입력하세요"
				onChange={handleChange}
				type="email"
				required
				width="w-[300px]"
				error="올바르지 않은 이메일 형태입니다."
			/>


			<Button
				text="마이페이지"
				width="w-30"
				height="h-10"
				backgroundColor="bg-green-600"
				borderRadius="rounded-full"
				fontColor="text-white"
				onClick={() => navigate('/my')}
			/>
		</div>
	);
}
