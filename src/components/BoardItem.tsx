type BoardItemProps = {
    title: string;
    content: string;
    createdAt: string;
    nickname: string;
};

export const BoardItem = ({
    title,
    content,
    createdAt,
    nickname,
}: BoardItemProps) => {
    return (
        <div className="flex flex-col text-left bg-white w-full h-[100px] border-t border-[#D9D9D9]">
            <div className="px-[15px] py-[10px]">
                <h2 className="text-[12px] font-semibold mb-[10px]">{title}</h2>

                <p className="text-[12px] font-semibold mb-[11px] line-clamp-2">
                    {content}
                </p>

                <div className="flex items-center text-[10px] gap-[7px] text-xs text-[#9C9C9C]">
                    <span>{createdAt}</span>
                    <span>|</span>
                    <span>{nickname}</span>
                </div>
            </div>
            
        </div>
    );
};