export type BoardItemProps = {
    title: string;
    content: string;
    createdAt: string;
    nickname: string;
    disabilityType?: string;
    worry?: string;
};

export const BoardItem = ({
    title,
    content,
    createdAt,
    nickname,
    disabilityType,
    worry,
}: BoardItemProps) => {


    return (
        <div className="flex flex-col text-left bg-white w-full h-[100px] border-t border-[#D9D9D9]">
            <div className="px-[15px] py-[10px]">
                <h2 className="text-[12px] font-semibold mb-[10px]">{title}</h2>
                <p className="text-[12px] font-semibold mb-[11px] line-clamp-2">
                    {content}
                </p>
                {/* 태그 섹션 */}
                {(disabilityType || worry) && (
                    <div className="flex flex-wrap gap-[6px] mb-[8px]">
                        {disabilityType && (
                            <span 
                                className="px-[8px] py-[2px] bg-[#E8F4FD] text-[#0066CC] text-[10px] rounded-[12px] font-medium"
                            >
                                {disabilityType}
                            </span>
                        )}
                        {worry && (
                            <span 
                                className="px-[8px] py-[2px] bg-[#FFF2E8] text-[#FF6B35] text-[10px] rounded-[12px] font-medium"
                            >
                                {worry}
                            </span>
                        )}
                    </div>
                )}
                <div className="flex items-center text-[10px] gap-[7px] text-xs text-[#9C9C9C]">
                    <span>{createdAt}</span>
                    <span>|</span>
                    <span>{nickname}</span>
                </div>
            </div>
            
        </div>
    );
};