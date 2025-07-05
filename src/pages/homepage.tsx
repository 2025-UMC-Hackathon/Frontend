// 깃허브에서 이슈를 파고, dev에서 feature로 뻗어나가주세요!

import { useState } from 'react';
import { BoardItem } from '../components/BoardItem';
import TagDropdown from '../components/dropdown';
import ic_post from '../../assets/ic_post.svg';

export default function Home() {
	const [selectedTag, setSelectedTag] = useState<string[]>([]);

	// 임시
	const DisabilityType = [
		{ label: '시각 장애', value: 'visual' },
		{ label: '청각 장애', value: 'hearing' },
		{ label: '지체 장애', value: 'physical' },
		{ label: '지적 장애', value: 'intellectual' },
		{ label: '자폐성 장애', value: 'autism' },
		{ label: '정신 장애', value: 'mental' },
	];
	// 임시
	const Worries = [
		{ label: '진로 선택', value: 'career_path' },
		{ label: '취업 준비', value: 'job_hunting' },
		{ label: '전공 적합성', value: 'major_fit' },
		{ label: '편입/유학 고민', value: 'transfer_abroad' },
		{ label: '학업 스트레스', value: 'study_stress' },
		{ label: '자존감/불안', value: 'self_esteem' },
		{ label: '대인관계', value: 'relationships' },
		{ label: '장래에 대한 불안', value: 'future_uncertainty' },
	];

	return (
		<div className="flex flex-col items-start">
			<div className="flex items-center gap-[11px] mb-[18px] ml-[18px]">
				<TagDropdown
				tags={DisabilityType.map(type => type.label)}
				selectedTags={selectedTag}
				onTagChange={setSelectedTag}
				selectionMode="single"
				placeholder="장애 유형"
				/>

				<TagDropdown
					tags={Worries.map(type => type.label)}
					selectedTags={selectedTag}
					onTagChange={setSelectedTag}
					selectionMode="single"
					placeholder="고민"
				/>
			</div>
			


			<BoardItem 
				title="Lorem ipsum (글 제목)"
				content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. . ."
				createdAt="4분전"
				nickname="닉네임"
			/>

			<button
				className="
					w-[135px] h-[48px] 
					rounded-full border border-black 
					px-4 py-3 gap-[10px] 
					flex items-center justify-center
				"
			>
				<img src={ic_post} alt="icon" className="w-4 h-4" />
				글 작성하기
			</button>			

		</div>
	);
}
