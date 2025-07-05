import { useState, useMemo, useEffect } from 'react';
import BoardItem from './BoardItem';
import TagDropdown from '../dropdown';
import type { BoardItemProps } from './BoardItem';
import { useNavigate } from 'react-router-dom';
import { serverCall } from '../utils/serverCall';

const BoardList = () => {
    const [posts, setPosts] = useState<BoardItemProps[]>([]);

    const [selectedDisabilityType, setSelectedDisabilityType] = useState<string[]>([]);
    const [selectedWorry, setSelectedWorry] = useState<string[]>([]);

    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
            const postsData = await serverCall('GET', '/api/posts');
            setPosts(postsData);
        } catch (error:any){
            console.log(error);
            alert('postData 불러오기 실패');
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);


    // 장애유형 태그 추출
    const allDisabilityTypes = useMemo(() => {
        const types = new Set<string>();
        posts.forEach((item) => {
            if (item.disabilityType) types.add(item.disabilityType);
        });
        return Array.from(types);
    }, [posts]);

    // 고민 유형 태그 추출
    const allWorries = useMemo(() => {
        const worries = new Set<string>();
        posts.forEach((item) => {
            if (item.worry) worries.add(item.worry);
        });
        return Array.from(worries);
    }, [posts]);

    // 필터링된 게시글 목록
    const filteredBoard = useMemo(() => {
    return posts.filter((item) => {
            const matchesDisabilityType =
                selectedDisabilityType.length === 0 ||
                (item.disabilityType && selectedDisabilityType.includes(item.disabilityType));
            const matchesWorry =
                selectedWorry.length === 0 ||
                (item.worry && selectedWorry.includes(item.worry));

            return matchesDisabilityType && matchesWorry;
        });
    }, [posts, selectedDisabilityType, selectedWorry]);

    
    return (
        <div className="w-full">
            {/* 필터 섹션 */}
            <div className="flex items-center justify-between gap-[11px] mb-[18px] ml-[18px] mt-[32px]">
                <span className="text-[14px] leading-[20px] font-semibold text-[#171D1E]">
                    게시물
                </span>
                <div className="flex gap-1">
                    <TagDropdown
                        tags={allDisabilityTypes}
                        selectedTags={selectedDisabilityType}
                        onTagChange={setSelectedDisabilityType}
                        selectionMode="single"
                        placeholder="장애 유형"
                    />
                    
                    <TagDropdown
                        tags={allWorries}
                        selectedTags={selectedWorry}
                        onTagChange={setSelectedWorry}
                        selectionMode="single"
                        placeholder="고민"
                    />
                </div>
                
            </div>

            {/* 게시글 목록 */}
            <div className="w-full">
                {filteredBoard.length > 0 ? (
                    filteredBoard.map((item: BoardItemProps, index: number) => (
                        <BoardItem
                            key={index}
                            title={item.title}
                            content={item.content}
                            createdAt={item.createdAt}
                            nickname={item.nickname}
                            disabilityType={item.disabilityType}
                            worry={item.worry}
                            commentNum={item.commentNum}
                            onClick={()=>navigate('/community')}
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