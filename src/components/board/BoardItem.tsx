import ic_landing_chat from '../../assets/ic_landing_chatting.svg';

export type BoardItemProps = {
    title: string;
    content: string;
    createdAt: string;
    nickname: string;
    disabilityType?: string;
    worry?: string;
    commentNum?: number;
    variant?: 'board' | 'page';
};

const BoardItem = ({
    title,
    content,
    createdAt,
    nickname,
    commentNum,
    variant = 'board',
}: BoardItemProps) => {

    const boardStyles = {
        container: "flex flex-col text-left bg-white w-full border-b border-[#D9D9D9]",
        content: "px-[16px] py-[10px]",
        title: "text-[12px] font-semibold mb-[10px]",
        description: "text-[12px] font-semibold mb-[11px] line-clamp-2",
        footer: "flex items-center justify-between text-[10px] text-xs text-[#9C9C9C]",
        info: "flex gap-[7px]",
        comment: "flex"
    };

    const pageStyles = {
        container: "flex flex-col text-left bg-white w-full rounded-lg shadow-md mb-4",
        content: "px-[20px] py-[16px]",
        title: "text-[16px] font-bold mb-[12px] text-gray-800",
        description: "text-[14px] font-medium mb-[12px] line-clamp-3 text-gray-600",
        footer: "flex items-center justify-between text-[12px] text-gray-500",
        info: "flex gap-[10px]",
        comment: "flex items-center"
    };

    const styles = variant === 'board' ? boardStyles : pageStyles;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>
                    {content}
                </p>
                <div className={styles.footer}>
                    <div className={styles.info}>
                        <span>{createdAt}</span>
                        <span>|</span>
                        <span>{nickname}</span>
                    </div>
                    
                    <div className={styles.comment}>
                        <img src={ic_landing_chat} alt="채팅 아이콘" />
                        <span className="ml-[1.33px]">{commentNum}</span>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default BoardItem;