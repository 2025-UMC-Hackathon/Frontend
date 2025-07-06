import { useEffect, useState } from 'react';
import { X, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDeleteModal from '../components/community/deleteModal';
import { fetchPost } from '../components/community/func/fetchPost';
import { fetchComment } from '../components/community/func/fetchComment';
import PostContent from '../components/community/PostContent';
import CommentSection from '../components/community/CommentSection';
import { convertToCommentTypeTuple } from '../components/community/func/conver';
import { serverCall } from '../components/utils/serverCall';

interface PostData {
	id: number;
	nickname: string;
	writeDate: string;
	writeTime: {
		hour: number;
		minute: number;
		second: number;
	};
	title: string;
	content: string;
	likes: number;
	comments: number;
}

interface CommentType {
	id: number;
	nickname: string;
	content: string;
	time: string;
	isMine: boolean;
}

const postId = 1;
const currentUserId = 6; // 실제 로그인된 사용자 ID로 교체 필요

export default function Community() {
	const [post, setPost] = useState<PostData | null>(null);
	const [comment, setComment] = useState<[CommentType, CommentType[]][]>([]);
	const [commentInput, setCommentInput] = useState('');
	const [replyTo, setReplyTo] = useState<string | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

	// 게시글 데이터 불러오기
	useEffect(() => {
		fetchPost({ postId })
			.then((raw) => {
				if (raw) {
					const createdAt = new Date(raw.createdAt);
					const writeTime = {
						hour: createdAt.getHours(),
						minute: createdAt.getMinutes(),
						second: createdAt.getSeconds(),
					};

					const convertedPost: PostData = {
						id: raw.id,
						nickname: raw.nickname,
						writeDate: raw.createdAt.split('T')[0],
						writeTime,
						title: raw.title,
						content: raw.content,
						likes: raw.likes,
						comments: raw.commentCnt,
					};

					setPost(convertedPost);
				}
			})
			.catch((err) => console.error('게시글 불러오기 실패:', err));
	}, []);

	// 댓글 데이터 불러오기
	const loadComments = async () => {
		try {
			const data = await fetchComment({ postId });
			if (data) {
				const converted = convertToCommentTypeTuple(data, currentUserId);
				setComment(converted);
			} else {
				setComment([]);
			}
		} catch (err) {
			console.error('댓글 목록 불러오기 실패:', err);
			setComment([]);
		}
	};

	useEffect(() => {
		loadComments();
	}, []);

	// 댓글 작성
	const handleSubmitComment = async () => {
		if (!commentInput.trim()) return;

		try {
			const parentId = localStorage.getItem('parentId');
			const query: Record<string, any> = {
				postId,
				content: commentInput.trim(),
			};
			if (parentId) query.parentId = parentId;

			const searchParams = new URLSearchParams(query).toString();
			const urlWithParams = `/api/comments?${searchParams}`;

			await serverCall('POST', urlWithParams);

			toast.success('댓글이 등록되었습니다');

			await loadComments();
			setCommentInput('');
			setReplyTo(null);
			localStorage.removeItem('parentId');
		} catch (error) {
			console.error('댓글 등록 실패:', error);
			toast.error('댓글 등록에 실패했습니다.');
		}
	};


	const handleCancelReply = () => {
		setReplyTo(null);
		localStorage.removeItem('parentId');
	};

	const handleDelete = async () => {
		if (deleteTargetId === null) return;

		try {
			await serverCall('DELETE', `/api/comments/${deleteTargetId}`);
			toast.success('댓글이 삭제되었습니다.');

			await loadComments();
			setDeleteTargetId(null);
		} catch (error) {
			console.error('댓글 삭제 실패:', error);
			toast.error('댓글 삭제에 실패했습니다.');
		} finally {
			setShowModal(false);
		}
	};


	return (
		<div className="flex flex-col min-h-screen">
			{post && (
				<PostContent post={post} onDelete={() => setShowModal(true)} postId={postId} />
			)}

			<CommentSection
				comments={comment}
				onReply={(nickname, parentId) => {
					setReplyTo(nickname);
					localStorage.setItem('parentId', parentId.toString());
				}}
				onDelete={(commentId) => {
					setDeleteTargetId(commentId);
					setShowModal(true);
				}}
			/>

			{/* 답글 안내 표시 */}
			{replyTo && (
				<div className="fixed bottom-[70px] left-1/2 -translate-x-1/2 bg-[#F2F2F2] px-4 py-2 text-sm 
				text-gray-500 w-[380px] rounded-full flex justify-between items-center shadow-md">
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
					<button
						onClick={handleSubmitComment}
						className="bg-white text-gray-400 px-4 py-2 rounded-lg text-sm"
					>
						<Send size={20} />
					</button>
				</div>
			</div>

			{showModal && (
				<ConfirmDeleteModal
					onCancel={() => {
						setShowModal(false);
						setDeleteTargetId(null);
					}}
					onConfirm={handleDelete}
				/>
			)}
		</div>
	);
}
