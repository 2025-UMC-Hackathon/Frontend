import PageItem from '../components/mypage/PageItem';
import { writtenPosts } from '../../mockdata/dummyMyPage';
import { useNavigate } from 'react-router-dom';


export default function WrittenByMe() {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-start p-2">
		{writtenPosts.map((post, idx) => (
			<PageItem
				key={idx}
				{...post}
				type="written"
				onClick={() => navigate('/community')}
			/>
		))}
		</div>
	);
}