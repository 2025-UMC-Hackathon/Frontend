import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { disabilityType, worryType } from '../components/write/mockData';
import { serverCall } from '../components/utils/serverCall';
import { useNavigate } from 'react-router-dom';

export default function Write() {
	const navigate = useNavigate();
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

   

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;
      
        try {
          const res = await serverCall('POST', '/api/post', {
            title,
            content,
            selectedDisability,
            selectedWorry,
          });
          // 성공 시 처리 (예: 페이지 이동, 알림 등)
          console.log('게시글 등록 성공:', res);
          navigate('/');
          // 예시: navigate('/community');
        } catch (error) {
          // 실패 시 처리
          alert('게시글 등록 중 오류가 발생했습니다.');
          console.error(error);
        }
      };




	return (
		<div className="flex flex-col min-h-[90vh] px-4 py-6 justify-between">

			<div className="flex flex-col items-center justify-center gap-2">
				{/* 드롭다운 영역 */}
				<div className="w-full flex gap-2 mb-6">
                
                {/* --- 장애유형 드롭다운 수정 --- */}
                <div className="relative">
                    {/* 1. 텍스트와 버튼을 감싸는 flex 컨테이너 */}
                    <div className="flex items-center gap-1">
                        {/* 2. 텍스트 표시 부분 */}
                        <div className="border border-gray-300 rounded-l-full px-4 py-1.5 text-sm bg-white text-gray-600">
                            {selectedDisability ?? '장애유형'}
                        </div>
                        {/* 3. 아이콘 버튼 부분 */}
                        <button
                            onClick={() => setOpenType(openType === 'disability' ? null : 'disability')}
                            className="border border-gray-300 rounded-r-full p-2 bg-white transition hover:bg-gray-50"
                        >
                            <ChevronDown size={16} className="text-gray-600" />
                        </button>
                    </div>
                    {/* 드롭다운 메뉴 */}
                    {openType === 'disability' && (
                        <div className="absolute top-full mt-1 left-0 bg-white border shadow-lg rounded-md w-full min-w-max z-10">
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
                    <div className="flex items-center gap-1">
                        <div className="border border-gray-300 rounded-l-full px-4 py-1.5 text-sm bg-white text-gray-600">
                            {selectedWorry ?? '고민'}
                        </div>
                        <button
                            onClick={() => setOpenType(openType === 'worry' ? null : 'worry')}
                            className="border border-gray-300 rounded-r-full p-2 bg-white transition hover:bg-gray-50"
                        >
                            <ChevronDown size={16} className="text-gray-600" />
                        </button>
                    </div>
                    {openType === 'worry' && (
                        <div className="absolute top-full mt-1 left-0 bg-white border shadow-lg rounded-md w-full min-w-max z-10">
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
					placeholder="제목을 입력해주세요"
					className="w-full border-b py-3 text-[#171D1E] placeholder:text-[#171D1E] placeholder:font-semibold mb-4 focus:outline-none"
					
				/>

				{/* 내용 */}
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="내용을 입력해주세요."
					rows={8}
					className="w-full text-sm placeholder-gray-400 focus:outline-none resize-none text-[#171D1E]"
					
				/>
			</div>

			{/* 하단 등록 버튼 */}
			<div className="flex items-center justify-center bg-white shadow-inner">
            <form onSubmit={handleSubmit}>
				<button
                    type="submit"
					disabled={!isFormValid}
					className={`fixed w-[338px] h-[56px]  rounded-full text-sm font-semibold ${isFormValid ? 'bg-[#CDE7EC] text-[#334B4E]' : 'bg-[#171D1E]/10 text-[#171D1E]/9'
						}`}
				>
					등록하기
				</button>
                </form>
			</div>
		</div>
	);
}
