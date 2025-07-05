import { CornerDownRight, MessageCircle, Trash2 } from 'lucide-react';

interface ReplyType {
	id: number;
	nickname: string;
	time: string;
	content: string;
	isMine: boolean;
}

export default function ReplyItem({
	reply,
	onReply,
	onDelete,
}: {
	reply: ReplyType;
	onReply: () => void;
	onDelete: () => void;
}) {
	return (
		<div className="w-full ml-4 mt-2 p-2 rounded flex items-start gap-2">
			<CornerDownRight size={20} />
			<div className="w-full flex flex-col items-start justify-start">
				<div className="w-full flex justify-between text-sm font-semibold">
					<div className="flex items-center">
						{reply.nickname}
						<span className="text-xs text-gray-500 ml-1">{reply.time}분 전</span>
					</div>
					<div className="flex items-center">
						<button className="p-2 bg-transparent" onClick={onReply}>
							<MessageCircle size={14} />
						</button>
						{reply.isMine && (
							<button className="p-2 bg-transparent" onClick={onDelete}>
								<Trash2 size={16} />
							</button>
						)}
					</div>
				</div>
				<p className="text-sm">{reply.content}</p>
			</div>
		</div>
	);
}
