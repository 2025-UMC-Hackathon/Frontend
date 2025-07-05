import { useState, useMemo, useEffect } from 'react';
import BoardItem from './BoardItem';
import { useNavigate } from 'react-router-dom';
import { serverCall } from '../utils/serverCall';
import { disabilityType, worryType } from '../write/mockData';
import { ChevronDown } from 'lucide-react';

const BoardList = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [openType, setOpenType] = useState<'disability' | 'worry' | null>(null);

    // 단일 선택으로 변경
    const [selectedDisabilityType, setSelectedDisabilityType] = useState<string | null>(null);
    const [selectedWorry, setSelectedWorry] = useState<string | null>(null);

    const navigate = useNavigate();

    // 드롭다운에서 값 선택
    const handleSelect = (type: 'disability' | 'worry', value: string) => {
        if (type === 'disability') setSelectedDisabilityType(value);
        else setSelectedWorry(value);
        setOpenType(null);
    };

    // API 호출 함수
    const fetchPosts = async (tags: string[], cursor: string = '-1', size: number = 10) => {
        try {
            const params = new URLSearchParams();
            tags.forEach(tag => params.append('tags', tag));
            params.append('cursor', cursor);
            params.append('size', size.toString());

            const response = await serverCall(
                'GET',
                `/api/posts?${params.toString()}`
            );
            return response.result.posts;
        } catch (error: any) {
            alert('게시글 불러오기 실패');
            return [];
        }
    };

    // 드롭다운 값이 바뀔 때마다 게시글 다시 불러오기
    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            // 선택된 값이 없으면 '전체'로
            const tags = [
                ...(selectedDisabilityType ? [selectedDisabilityType] : []),
                ...(selectedWorry ? [selectedWorry] : []),
            ];
            const tagQuery = tags.length > 0 ? tags : ['전체'];
            const data = await fetchPosts(tagQuery, '-1', 10);
            setPosts(data);
            setLoading(false);
        };
        loadPosts();
    }, [selectedDisabilityType, selectedWorry]);

    // 필터링된 게시글 (API에서 이미 필터링되므로 바로 posts 사용)
    const filteredBoard = posts;

    return (
        <div className="w-full">
            {/* 드롭다운 영역 */}
            <div className="w-full flex gap-2 mb-6">
                {/* 장애유형 드롭다운 */}
                <div className="relative">
                    <div className="flex items-center gap-1">
                        <div className="border border-gray-300 rounded-l-full px-4 py-1.5 text-sm bg-white text-gray-600">
                            {selectedDisabilityType ?? '장애유형'}
                        </div>
                        <button
                            onClick={() => setOpenType(openType === 'disability' ? null : 'disability')}
                            className="border border-gray-300 rounded-r-full p-2 bg-white transition hover:bg-gray-50"
                        >
                            <ChevronDown size={16} className="text-gray-600" />
                        </button>
                    </div>
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
                {/* 고민 드롭다운 */}
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
            {/* 게시글 목록 */}
            <div className="w-full">
                {loading ? (
                    <div className="flex items-center justify-center h-[200px] text-[14px] text-[#9C9C9C]">
                        로딩중...
                    </div>
                ) : filteredBoard.length > 0 ? (
                    filteredBoard.map((item: any, index: number) => (
                        <BoardItem
                            key={item.id ?? index}
                            title={item.title}
                            content={item.content}
                            createdAt={item.createdAt}
                            nickname={item.nickname}
                            disabilityType={item.disabilityType}
                            worry={item.worry}
                            commentNum={item.commentNum}
                            onClick={() => navigate('/community')}
                        />
                    ))
                ) : (
                    <div className="flex items-center justify-center h-[200px] text-[14px] text-[#9C9C9C]">
                        해당하는 게시글이 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardList;