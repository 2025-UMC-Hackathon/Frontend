import PageItem from '../components/mypage/PageItem';
import { likedPosts } from '../../mockdata/dummyMyPage';
import { useNavigate } from 'react-router-dom';

export default function LikedByMe() {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-start p-2">
		{likedPosts.map((post, idx) => (
			<PageItem
				key={idx}
				{...post}
				type="liked"
				onClick={() => navigate('/community')}
			/>
		))}
		</div>
	);	
}