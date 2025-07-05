import { useState, useMemo } from 'react';
import { BoardItem } from './BoardItem';
import { TagDropdown } from './TagDropdown';
import type { BoardItemProps } from './BoardItem';
import { dummyBoard } from '../../../mockdata/dummyBoard';

export const BoardList = () => {
    const [selectedDisabilityType, setSelectedDisabilityType] = useState<string>('');
    const [selectedWorry, setSelectedWorry] = useState<string>('');

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
            const matchesDisabilityType = !selectedDisabilityType || 
                item.disabilityType === selectedDisabilityType;
            const matchesWorry = !selectedWorry || 
                item.worry === selectedWorry;
            
            return matchesDisabilityType && matchesWorry;
        });
    }, [selectedDisabilityType, selectedWorry]);

    return (
        <div className="w-full">
            {/* TagDropdown 컴포넌트 사용 */}
            <TagDropdown
                selectedDisabilityType={selectedDisabilityType}
                selectedWorry={selectedWorry}
                onDisabilityTypeChange={setSelectedDisabilityType}
                onWorryChange={setSelectedWorry}
                allDisabilityTypes={allDisabilityTypes}
                allWorries={allWorries}
            />

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