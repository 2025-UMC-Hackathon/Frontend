import { useState, useMemo } from 'react';
import BoardItem from './BoardItem';
import TagDropdown from '../dropdown'; // 기존 dropdown.tsx import
import type { BoardItemProps } from './BoardItem';
import { dummyBoard } from '../../../mockdata/dummyBoard';

const BoardList = () => {
    const [selectedDisabilityType, setSelectedDisabilityType] = useState<string[]>([]);
    const [selectedWorry, setSelectedWorry] = useState<string[]>([]);

    // 모든 고유한 태그들을 추출
    const allDisabilityTypes = useMemo(() => {
        const types = new Set<string>();
        dummyBoard.forEach((item: BoardItemProps) => {
            if (item.disabilityType) {
                types.add(item.disabilityType);
            }
        });
        return Array.from(types);
    }, []);

    const allWorries = useMemo(() => {
        const worries = new Set<string>();
        dummyBoard.forEach((item: BoardItemProps) => {
            if (item.worry) {
                worries.add(item.worry);
            }
        });
        return Array.from(worries);
    }, []);

    // 필터링된 게시글 목록
    const filteredBoard = useMemo(() => {
        return dummyBoard.filter((item: BoardItemProps) => {
            const matchesDisabilityType = selectedDisabilityType.length === 0 || 
                (item.disabilityType && selectedDisabilityType.includes(item.disabilityType));
            const matchesWorry = selectedWorry.length === 0 || 
                (item.worry && selectedWorry.includes(item.worry));
            
            return matchesDisabilityType && matchesWorry;
        });
    }, [selectedDisabilityType, selectedWorry]);

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
                            variant='board'
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