import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
	MessageCircle, X, CornerDownRight, Heart,
	MessageSquareText, Trash2, Send, MoreVertical, Share2
} from 'lucide-react';
import Button from '../components/button';
import ConfirmDeleteModal from '../components/community/deleteModal';
import { toast } from 'react-toastify';
import { mockData } from '../components/community/mockData';
import 'react-toastify/dist/ReactToastify.css';

interface CommentType {
	id: number;
	nickname: string;
	time: number;
	content: string;
	isMine: boolean;
}

interface ReplyType extends CommentType { }

function CommentItem({
	comment,
	onReply,
	onDelete
}: {
	comment: CommentType,
	onReply: () => void,
	onDelete: () => void
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

function ReplyItem({
	reply,
	onReply,
	onDelete
}: {
	reply: ReplyType,
	onReply: () => void,
	onDelete: () => void
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

export default function Community() {
	const [replyTo, setReplyTo] = useState<string | null>(null);
	const [commentInput, setCommentInput] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showOptions, setShowOptions] = useState(false);
	const location = useLocation();

	const handleShare = async () => {
		try {
			await navigator.clipboard.writeText(window.location.origin + location.pathname);
			toast.success('링크가 복사되었습니다!');
			setShowOptions(false);
		} catch (err) {
			toast.error('클립보드 복사 실패');
		}
	};

	const handleReplyClick = (nickname: string) => setReplyTo(nickname);
	const handleCancelReply = () => setReplyTo(null);

	const handleDelete = () => {
		setShowModal(false);
		toast.success('삭제되었습니다.');
	};

	return (
		<div className="flex flex-col min-h-screen">
			{/* 본문 */}
			<div className="flex flex-col px-6 gap-5">
				<div className="w-full flex justify-between items-center">
					<div className="flex gap-2 text-base">
						<span className="font-bold text-black">미딩</span>
						<span className="text-gray-400">{mockData.writeDate}</span>
						<span className="text-gray-400">{mockData.writeTime}</span>
					</div>
					{mockData.isMine && (
						// <button onClick={() => setShowModal(true)} className="bg-transparent">
						// 	<Trash2 size={16} />
						// </button>
						<div className="relative">
							<button onClick={() => setShowOptions(prev => !prev)} className="bg-transparent p-2">
								<MoreVertical size={20} />
							</button>

							{showOptions && (
								<div className="absolute right-0 top-10 w-52 bg-white rounded-xl shadow-lg border text-sm z-50">
									<button
										onClick={handleShare}
										className="w-full flex justify-between items-center px-4 py-3 hover:bg-gray-100"
									>
										<span>게시물 공유</span>
										<Share2 size={18} />
									</button>

									{mockData.isMine && (
										<button
											onClick={() => {
												setShowOptions(false);
												setShowModal(true);
											}}
											className="w-full flex justify-between items-center px-4 py-3 text-red-500 hover:bg-gray-100"
										>
											<span>삭제</span>
											<Trash2 size={18} color="red" />
										</button>
									)}
								</div>
							)}
						</div>

					)}
				</div>

				<div className="w-full flex flex-col gap-3 items-start justify-start">
					<h1 className="text-base font-bold">{mockData.title}</h1>
					<p className="text-gray-700">{mockData.content}</p>
					<div className="w-full flex justify-between border-t py-3 text-sm text-gray-500">
						<Button width="w-[50%]" backgroundColor="bg-transparent" padding="px-3 py-1">
							<div className="flex justify-center items-center gap-2 font-bold text-black">
								<Heart size={20} /> 좋아요 {mockData.likes}
							</div>
						</Button>
						<div className="flex justify-center items-center gap-2 w-[50%] font-bold text-black">
							<MessageSquareText size={20} /> 댓글 {mockData.comments}개
						</div>
					</div>
				</div>
			</div>

			{/* 댓글 리스트 */}
			<div className="flex flex-col gap-4 mt-4 px-3">
				{mockData.comment.map(([main, replies]) => (
					<div key={main.id} className="bg-white p-2 rounded flex flex-col gap-1">
						<CommentItem
							comment={main}
							onReply={() => handleReplyClick(main.nickname)}
							onDelete={() => setShowModal(true)}
						/>
						{replies.map((reply) => (
							<ReplyItem
								key={reply.id}
								reply={reply}
								onReply={() => handleReplyClick(main.nickname)}
								onDelete={() => setShowModal(true)}
							/>
						))}
					</div>
				))}
			</div>

			{/* 답글 안내 표시 */}
			{replyTo && (
				<div className="fixed bottom-[70px] left-1/2 -translate-x-1/2 bg-[#F2F2F2] px-4 py-2 text-sm text-gray-500 w-[380px] rounded-full flex justify-between items-center shadow-md">
					<span>{replyTo}님에게 답글 남기는 중...</span>
					<button onClick={handleCancelReply}>
						<X size={16} />
					</button>
				</div>
			)}

			{/* 입력창 */}
			<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[400px] px-4 bg-white py-3">
				<div className="flex items-center gap-2">
					<input
						type="text"
						value={commentInput}
						onChange={(e) => setCommentInput(e.target.value)}
						placeholder="댓글을 입력하세요"
						className="flex-1 bg-[#F5F5F5] rounded-lg px-3 py-2 text-sm focus:outline-none"
					/>
					<button className="bg-white text-gray-400 px-4 py-2 rounded-lg text-sm">
						<Send size={20} />
					</button>
				</div>
			</div>

			{/* 삭제 모달 */}
			{showModal && (
				<ConfirmDeleteModal onCancel={() => setShowModal(false)} onConfirm={handleDelete} />
			)}
		</div>
	);
}
