import { useState, useEffect, useRef } from 'react';
import BoardItem from './BoardItem';
import { disabilityType, worryType } from '../write/mockData';
import { ChevronDown } from 'lucide-react';
import { usePosts } from './usePost';
import { useNavigate } from 'react-router-dom';

const BoardList = () => {
    const [openType, setOpenType] = useState<'disability' | 'worry' | null>(null);
    const [selectedDisabilityType, setSelectedDisabilityType] = useState<string | null>(null);
    const [selectedWorry, setSelectedWorry] = useState<string | null>(null);

    const tags = [selectedDisabilityType, selectedWorry].filter(Boolean) as string[];
    const tagQuery = tags.length > 0 ? tags : [];

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = usePosts(tagQuery, 10);

    const posts = data?.pages.flatMap(page => page.posts) ?? [];

    useEffect(() => {
  console.log("posts:", posts.map(p => p.id));
}, [posts]);


    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
            fetchNextPage();
            }
        },
        { threshold: 1 }
    );
        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }
        return () => {
            if (sentinelRef.current) observer.unobserve(sentinelRef.current);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const navigate = useNavigate();

    // 드롭다운에서 값 선택
    const handleSelect = (type: 'disability' | 'worry', value: string) => {
        if (type === 'disability') setSelectedDisabilityType(value);
        else setSelectedWorry(value);
        setOpenType(null);
    };

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

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
                {isLoading ? (
                <div className="flex items-center justify-center h-[200px] text-[14px] text-[#9C9C9C]">
                    로딩중...
                </div>
                ) : posts.length > 0 ? (
                    posts.map((post, index) => (
                        <BoardItem
                            key={`post-${index}`}
                            /* key={post.id} */
                            title={post.title}
                            content={post.content}
                            createdAt={post.createdAt}
                            nickname={post.nickname}
                            commentCnt={post.commentCnt}
                            onClick={() => navigate(`/community`)}
                            />
                        ))
                ) : (
                    <div className="flex items-center justify-center h-[200px] text-[14px] text-[#9C9C9C]">
                        해당하는 게시글이 없습니다.
                    </div>
                )}
                {/* 무한 스크롤 트리거용 sentinel */}
                <div ref={sentinelRef} style={{ height: 1 }} />
                {hasNextPage && !isFetchingNextPage && (
                    <button onClick={handleLoadMore} className="text-center w-full mt-4 text-blue-500">
                        더 보기
                    </button>
                )}
        </div>
    </div>

    );
};

export default BoardList;