import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { disabilityType, worryType } from '../components/write/mockData';

export default function Write() {
	const [selectedDisability, setSelectedDisability] = useState<string | null>(null);
	const [selectedWorry, setSelectedWorry] = useState<string | null>(null);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [openType, setOpenType] = useState<'disability' | 'worry' | null>(null);

	const isFormValid =
		selectedDisability !== null &&
		selectedWorry !== null &&
		title.trim() !== '' &&
		content.trim() !== '';

	const handleSelect = (type: 'disability' | 'worry', value: string) => {
		if (type === 'disability') setSelectedDisability(value);
		else setSelectedWorry(value);
		setOpenType(null);
	};

	return (
		<div className="flex flex-col min-h-[90vh] px-4 py-6 justify-between">

			<div className="flex flex-col items-center justify-center gap-2">
				{/* 드롭다운 영역 */}
				<div className="w-full flex gap-2 mb-6 items-start justify-start">
					<div className="relative">
						<button
							onClick={() => setOpenType(openType === 'disability' ? null : 'disability')}
							className="border rounded-full px-4 py-2 text-sm flex items-center gap-1"
						>
							{selectedDisability ?? '장애유형'}
							<ChevronDown size={16} />
						</button>
						{openType === 'disability' && (
							<div className="absolute top-10 left-0 bg-white border shadow rounded w-full z-10">
								{disabilityType.map((item) => (
									<div
										key={item}
										className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
										onClick={() => handleSelect('disability', item)}
									>
										{item}
									</div>
								))}
							</div>
						)}
					</div>

					<div className="relative">
						<button
							onClick={() => setOpenType(openType === 'worry' ? null : 'worry')}
							className="border rounded-full px-4 py-2 text-sm flex items-center gap-1"
						>
							{selectedWorry ?? '고민'}
							<ChevronDown size={16} />
						</button>
						{openType === 'worry' && (
							<div className="absolute top-10 left-0 bg-white border shadow rounded w-full z-10">
								{worryType.map((item) => (
									<div
										key={item}
										className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
										onClick={() => handleSelect('worry', item)}
									>
										{item}
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* 제목 */}
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="제목을 입력해주세요."
					className="w-full border-b py-3 text-base font-semibold placeholder-gray-400 mb-4 focus:outline-none"
				/>

				{/* 내용 */}
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="내용을 입력해주세요."
					rows={8}
					className="w-full text-sm placeholder-gray-400 focus:outline-none resize-none"
				/>
			</div>

			{/* 하단 등록 버튼 */}
			<div className="flex items-center justify-center bg-white shadow-inner">
				<button
					disabled={!isFormValid}
					className={`w-[400px] text-white rounded-full text-sm font-semibold ${isFormValid ? 'bg-green-500' : 'bg-gray-400'
						}`}
				>
					등록하기
				</button>
			</div>
		</div>
	);
}
