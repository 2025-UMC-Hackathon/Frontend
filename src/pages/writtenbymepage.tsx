import BoardItem from '../components/board/BoardItem';
import { writtenPosts } from '../../mockdata/dummyMyPage';
import { useNavigate } from 'react-router-dom';


export default function WrittenByMe() {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-start p-2">
		{writtenPosts.map((post, idx) => (
			<BoardItem
				key={idx}
				{...post}
				variant="page" // 또는 "board" 원하는 스타일로
				type="written"
				onClick={() => navigate('/community')}
			/>
		))}
		</div>
	);
}