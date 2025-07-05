import { MoreVertical, Trash2, Share2, Heart, MessageSquareText } from 'lucide-react';
import { useState } from 'react';
import Button from '../button';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { serverCall } from '../utils/serverCall';

interface Props {
	post: {
		nickname: string;
		writeDate: string;
		writeTime: { hour: number; minute: number };
		title: string;
		content: string;
		likes: number;
		comments: number;
	};
	onDelete: () => void;
	postId: number;
}

export default function PostContent({ post, onDelete, postId }: Props) {
	const [showOptions, setShowOptions] = useState(false);
	const location = useLocation();

	// 좋아요 관련 상태
	const [isLiked, setIsLiked] = useState(false);
	const [likes, setLikes] = useState(post.likes);

	// 공유
	const handleShare = async () => {
		try {
			await navigator.clipboard.writeText(window.location.origin + location.pathname);
			toast.success('링크가 복사되었습니다!');
			setShowOptions(false);
		} catch {
			toast.error('클립보드 복사 실패');
		}
	};

	// 좋아요 토글 핸들러
	const handleLike = async () => {
		// 낙관적 업데이트
		setIsLiked(prev => !prev);
		setLikes(prev => prev + (isLiked ? -1 : 1));

		try {
			await serverCall('POST', `/api/post/${postId}/like`);
			// 서버 응답 무시 (낙관적 업데이트)
		} catch (err) {
			alert('좋아요 실패');
			// 롤백
			setIsLiked(prev => !prev);
			setLikes(prev => prev + (isLiked ? 1 : -1));
		}
	};

	return (
		<div className="flex flex-col px-6 gap-5">
			{/* 작성자 정보 & 옵션 */}
			<div className="w-full flex justify-between items-center">
				<div className="flex gap-2 text-base">
					<span className="font-bold text-black">{post.nickname}</span>
					<span className="text-gray-400">{post.writeDate}</span>
					<span className="text-gray-400">
						{post.writeTime.hour}:{post.writeTime.minute.toString().padStart(2, '0')}
					</span>
				</div>

				<div className="relative">
					<button onClick={() => setShowOptions((prev) => !prev)} className="bg-transparent p-2">
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
							<button
								onClick={() => {
									setShowOptions(false);
									onDelete();
								}}
								className="w-full flex justify-between items-center px-4 py-3 text-red-500 hover:bg-gray-100"
							>
								<span>삭제</span>
								<Trash2 size={18} color="red" />
							</button>
						</div>
					)}
				</div>
			</div>

			{/* 게시글 본문 */}
			<div className="w-full flex flex-col gap-3 items-start justify-start">
				<h1 className="text-base font-bold">{post.title}</h1>
				<p className="text-gray-700">{post.content}</p>
				<div className="w-full flex justify-between border-t py-3 text-sm text-gray-500">
					<Button width="w-[50%]" backgroundColor="bg-transparent" padding="px-3 py-1" onClick={handleLike}>
						<div className="flex justify-center items-center gap-2 font-bold text-black">
							<Heart size={20} color={isLiked ? 'red' : 'gray'} fill={isLiked ? 'red' : 'none'} />
							좋아요 {likes}
						</div>
					</Button>
					<div className="flex justify-center items-center gap-2 w-[50%] font-bold text-black">
						<MessageSquareText size={20} />
						댓글 {post.comments}
					</div>
				</div>
			</div>
		</div>
	);
}
