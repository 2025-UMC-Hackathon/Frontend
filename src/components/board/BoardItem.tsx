import ic_landing_chat from '../../assets/ic_landing_chatting.svg';

export type BoardItemProps = {
    title: string;
    content: string;
    createdAt: string;
    nickname: string;
    disabilityType?: string;
    worry?: string;
    commentNum?: number;
    onClick: () => void;
};

const BoardItem = ({
    title,
    content,
    createdAt,
    nickname,
    commentNum,
    onClick,
}: BoardItemProps) => {
    return (
        <div className="flex flex-col text-left bg-white w-full border-b border-[#D9D9D9] cursor-pointer" onClick={onClick}>
            <div className="px-[16px] py-[10px]">
                <h2 className="text-[12px] font-semibold mb-[10px]">{title}</h2>
                <p className="text-[12px] font-semibold mb-[11px] line-clamp-2">{content}</p>
            </div>
            <div className="flex items-center justify-between text-[10px] text-xs text-[#9C9C9C] px-[16px] pb-[10px]">
                <div className="flex gap-[7px]">
                    <span>{createdAt}</span>
                    <span>|</span>
                    <span>{nickname}</span>
                </div>
                <div className="flex items-center">
                    <img src={ic_landing_chat} alt="채팅 아이콘" />
                    <span className="ml-[1.33px]">{commentNum}</span>
                </div>
            </div>
        </div>
    );
};

export default BoardItem;