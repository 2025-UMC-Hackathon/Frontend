// 깃허브에서 이슈를 파고, dev에서 feature로 뻗어나가주세요!

import { useNavigate } from 'react-router-dom';
import Button from "../components/button";

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-start p-2">
			<p className="mb-4 text-lg">여기는 홈화면~</p>

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
