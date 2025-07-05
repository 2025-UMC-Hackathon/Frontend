import { MessageCircle, Trash2 } from 'lucide-react';

interface CommentType {
	id: number;
	nickname: string;
	time: string;
	content: string;
	isMine: boolean;
}

export default function CommentItem({
	comment,
	onReply,
	onDelete,
}: {
	comment: CommentType;
	onReply: () => void;
	onDelete: () => void;
}) {
	return (
		<div className="w-full flex flex-col items-start justify-start bg-[#F5F5F5] px-2 py-3 rounded">
			<div className="w-full flex items-start justify-between text-sm font-semibold">
				<div className="flex items-center">
					{comment.nickname}
					<span className="text-xs text-gray-500 ml-1">{comment.time}분 전</span>
				</div>
				<div className="flex items-center">
					<button className="p-2 bg-transparent" onClick={onReply}>
						<MessageCircle size={14} />
					</button>
					{comment.isMine && (
						<button className="p-2 bg-transparent" onClick={onDelete}>
							<Trash2 size={16} />
						</button>
					)}
				</div>
			</div>
			<p className="text-sm text-black">{comment.content}</p>
		</div>
	);
}
