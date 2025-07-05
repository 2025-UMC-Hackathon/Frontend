import { useNavigate } from "react-router-dom";
import Button from "./button";

export default function Header() {
	const navigate = useNavigate();

	return (
		<div className="bg-white dark:bg-gray-900 shadow-md p-3 flex justify-between items-center h-16">
			<span className="text-xl font-bold text-gray-800 dark:text-white">
				서비스명
			</span>

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
