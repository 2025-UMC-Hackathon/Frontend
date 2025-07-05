import { Heart } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import ConfirmDeleteModal from '../community/deleteModal';

export type PageItemProps = {
    title: string;
    content: string;
    type?: 'liked' | 'written' | 'undefined';
    onClick: () => void;
};

const PageItem = ({
    title,
    content,
    type,
    onClick,
}: PageItemProps) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const UnActivateLiked = () => {
        console.log('좋아요 취소하기');
    };

    const ActivatedDeleted = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        setDeleteModalOpen(false);
        // 실제 삭제 로직 추가
    };

    let rightIcon = null;
    if (type === 'liked') {
        rightIcon = <Heart fill="#171D1E" onClick={UnActivateLiked} />;
    } else if (type === 'written') {
        rightIcon = <Trash2 onClick={ActivatedDeleted} />;
    }

    return (
        <div className="flex flex-row text-left items-center justify-between bg-white w-full px-[24px] py-[14px] cursor-pointer" onClick={onClick}>
            <div>
                <h2 className="text-base text-[#49454E]">{title}</h2>
                <p className="text-[14px] text-[#1D1B20] line-clamp-3">{content}</p>
            </div>
            {rightIcon && (
                <div className="flex-shrink-0 flex items-center">{rightIcon}</div>
            )}
            {deleteModalOpen && (
                <ConfirmDeleteModal
                    onCancel={() => setDeleteModalOpen(false)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
};

export default PageItem; 