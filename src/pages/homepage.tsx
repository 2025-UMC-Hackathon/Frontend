// 깃허브에서 이슈를 파고, dev에서 feature로 뻗어나가주세요!
// = Board 페이지

import { useState } from 'react';
// import { BoardItem } from '../components/board/BoardItem';
import TagDropdown from '../components/dropdown';
import ic_post from "../assets/ic_post.svg";
import { useNavigate } from 'react-router-dom';
import { BoardList } from '../components/board/BoardList';


export default function Home() {
	const [selectedTag, setSelectedTag] = useState<string[]>([]);

	const navigate =useNavigate();

	// 임시
	const DisabilityTypes = [
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
			<div className="w-[348px] h-[90px] bg-[#D9D9D9] rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.25)] mx-auto mt-[38px]" />

			<div className="flex items-center gap-[11px] mb-[18px] ml-[18px] mt-[38px]">
				<TagDropdown
					tags={DisabilityTypes.map(type => type.label)}
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
			


			<BoardList />

			{/* 추후에 글 작성 페이지 경로로 수정해야 함!!!!!!! */}
			<button
				onClick={()=>navigate("/my")}
				className="
					fixed bottom-[110px] left-1/2 transform -translate-x-1/2
					w-[135px] h-[48px] bg-[#CACAD0]
					rounded-full border border-[#9C9C9C]
					p-3 gap-[10px] 
					flex items-center justify-center
					font-medium text-sm text-[#000000]
				"
			>
				<img src={ic_post} alt="icon" className="w-6 h-6" />
				글 작성하기
			</button>			

		</div>
	);
}
