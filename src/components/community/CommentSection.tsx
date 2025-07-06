import CommentItem from './CommentItem';
import ReplyItem from './ReplyItem';

interface CommentType {
	id: number;
	nickname: string;
	time: string;
	content: string;
	isMine: boolean;
	createdAtText: string;
}

interface Props {
	comments: [CommentType, CommentType[]][];
	onReply: (nickname: string, parentId: number) => void;
	onDelete: (commentId: number) => void;
}

export default function CommentSection({ comments, onReply, onDelete }: Props) {
	return (
		<div className="flex flex-col gap-4 mt-4 px-3">
			{comments.map(([main, replies]) => (
				<div key={main.id} className="bg-white p-2 rounded flex flex-col gap-1">
					<CommentItem
						comment={main}
						onReply={() => onReply(main.nickname, main.id)}
						onDelete={() => onDelete(main.id)}
					/>
					{replies.map((reply) => (
						<ReplyItem
							key={reply.id}
							reply={reply}
							onReply={() => onReply(main.nickname, main.id)}
							onDelete={() => onDelete(reply.id)}
						/>
					))}
				</div>
			))}
		</div>
	);
}
