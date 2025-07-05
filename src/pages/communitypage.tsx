import { useEffect, useState } from 'react';
import { X, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDeleteModal from '../components/community/deleteModal';
import { fetchPost } from '../components/community/func/fetchPost';
import { fetchComment } from '../components/community/func/fetchComment';
import PostContent from '../components/community/PostContent';
import CommentSection from '../components/community/CommentSection';
import { mockData } from '../components/community/mockData';

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

interface CommentData {
	id: number;
	nickname: string;
	content: string;
	userId: number;
	postId: number;
	parentId: number;
	writeDate: string;
	createdAt: string;
	children: CommentData[]; // 재귀 형태
}

const postId = 1;

export default function Community() {
	const [post, setPost] = useState<PostData | null>(null);
	const [comment, setComment] = useState<CommentData[] | null>(null);
	const [commentInput, setCommentInput] = useState('');
	const [replyTo, setReplyTo] = useState<string | null>(null);
	const [showModal, setShowModal] = useState(false);

	// 부모 컴포넌트에서 모든 데이터를 호출하고 자식들에게 props 전달한다 
	// 1. 본문 데이터 페칭 
	useEffect(() => {
		fetchPost({ postId })
			.then((data) => {
				if (data) setPost(data);
			})
			.catch((err) => console.error('게시글 불러오기 실패:', err));
	}, []);
	// 2. 댓글 데이터 페칭 
	useEffect(() => {
		fetchComment({ postId })
			.then((data) => {
				if (data) setComment(data);
			})
			.catch((err) => console.error('댓글 목록 불러오기 실패:', err));
	}, []);

	const handleCancelReply = () => setReplyTo(null);

	// 3. 삭제 기능 구현 필요 
	const handleDelete = () => {
		setShowModal(false);
		toast.success('삭제되었습니다.');
	};

	return (
		<div className="flex flex-col min-h-screen">
			{post && (
				<PostContent post={post} onDelete={() => setShowModal(true)} postId={postId} />
			)}

			<CommentSection
				comments={mockData.comment}
				onReply={(nickname) => setReplyTo(nickname)}
				onDelete={() => setShowModal(true)}
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
					<button className="bg-white text-gray-400 px-4 py-2 rounded-lg text-sm">
						<Send size={20} />
					</button>
				</div>
			</div>

			{showModal && (
				<ConfirmDeleteModal onCancel={() => setShowModal(false)} onConfirm={handleDelete} />
			)}
		</div>
	);
}
