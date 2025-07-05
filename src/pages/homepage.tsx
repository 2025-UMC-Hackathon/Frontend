// 깃허브에서 이슈를 파고, dev에서 feature로 뻗어나가주세요!

import { BoardItem } from '../components/BoardItem';

export default function Home() {

	return (
		<div className="flex flex-col items-center justify-start">
			<BoardItem 
				title="Lorem ipsum (글 제목)"
				content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. . ."
				createdAt="4분전"
				nickname="닉네임"
			/>
		</div>
	);
}
