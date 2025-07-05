import ic_landing_chat from '../../assets/ic_landing_chatting.svg';
import { Heart } from 'lucide-react';
import { Trash2 } from "lucide-react";
import { useState } from 'react';
import ConfirmDeleteModal from '../community/deleteModal';

export type BoardItemProps = {
    title: string;
    content: string;
    createdAt: string;
    nickname: string;
    disabilityType?: string;
    worry?: string;
    commentNum?: number;
    variant?: 'board' | 'page';
    onClick: ()=>void;
    type?: 'liked' | 'written' | 'undefined';
};

const BoardItem = ({
    title,
    content,
    createdAt,
    nickname,
    commentNum,
    variant = 'board',
    onClick,
    type,
}: BoardItemProps) => {
    
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);


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
        container: "flex flex-col text-left bg-white w-full mb-4",
        content: "px-[24px] py-[14px]",
        title: "text-base text-[#49454E]",
        description: "text-[14px] line-clamp-3",
        footer: "",
        info: "",
        comment: "",
    };

    const UnActivateLiked = () => {
        console.log("좋아요 취소하기");
    }

    const ActivatedDeleted = (e: React.MouseEvent) => {
        e.stopPropagation(); // 부모 클릭 방지
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        setDeleteModalOpen(false);
        // 실제 삭제 로직 추가
    };

    let rightIcon = null;
    if (type === 'liked'){
        rightIcon = <Heart fill="#171D1E" onClick={UnActivateLiked} />;
    } else if (type === 'written'){
        rightIcon = <Trash2 onClick={ActivatedDeleted} />;
    }

    const styles = variant === 'board' ? boardStyles : pageStyles;

    return (
        <div className={`${styles.container} cursor-pointer`}  onClick={onClick}>
            <div className={`${styles.content} flex items-center justify-between`} >
                <div>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{content}</p>
                </div>
                {rightIcon && (
                    <div className="ml-4 flex-shrink-0 flex items-center">
                    {rightIcon}
                    </div>
                )}
                { variant === 'board' && (
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
                )}
            </div>
            {deleteModalOpen && (
                <ConfirmDeleteModal
                    onCancel={() => setDeleteModalOpen(false)}
                    onConfirm={handleDelete}
                />
            )}
                
        </div>
    );
};

export default BoardItem;