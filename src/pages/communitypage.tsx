import { useState } from 'react';
import { MessageCircle, X, MoreVertical } from 'lucide-react';
import Button from '../components/button';
import { mockData } from '../components/community/mockData';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Community() {
	const [replyTo, setReplyTo] = useState<string | null>(null);
	const [commentInput, setCommentInput] = useState('');
	const [showMoreFor, setShowMoreFor] = useState<number | null>(null);

	const handleReplyClick = (nickname: string) => {
		setReplyTo(nickname);
	};

	const handleCancelReply = () => {
		setReplyTo(null);
	};

	return (
		<div className="flex flex-col min-h-screen">
			{/* 본문 */}
			<div className="flex flex-col items-start justify-start px-2 py-4 border-b gap-5">
				<div className="flex gap-2 items-start justify-start">
					<div className="text-base text-black font-bold">
						미딩
					</div>
					<div className="text-base text-gray-400">
						{mockData.writeDate}
					</div>
					<div className="text-base text-gray-400">
						{mockData.writeTime}
					</div>
					{mockData.isMine && (
						<button onClick={() => setShowMoreFor(mockData.id)} className='bg-transparent'>
							<MoreVertical size={16} />
						</button>
					)}
				</div>

				<div className="w-full flex flex-col items-start justify-start">
					<h1 className="text-xl font-bold mt-2">{mockData.title}</h1>
					<p className="mt-1 text-gray-700">{mockData.content}</p>
					<div className="w-full flex justify-between mt-4 text-sm text-gray-500">
						<div className="flex items-center gap-1">
							<Button border='border-1 border-gray-200' borderRadius='rounded-full' padding='px-3 py-1'>
								<span>🤍 좋아요 {mockData.likes}</span>
							</Button>
						</div>
						<span>댓글 {mockData.comments}개</span>
					</div>
				</div>
			</div>

			{/* 댓글 */}
			<div className="flex flex-col gap-4 mt-4">
				{mockData.comment.map(([main, replies], i) => (
					<div key={main.id} className="bg-white p-2 rounded flex flex-col items-start justify-start">
						<div className="text-sm text-black font-semibold">
							{main.nickname}
							<span className="text-xs text-gray-500 ml-1">
								{main.time}분 전
							</span>
							{main.isMine && (
								<button onClick={() => setShowMoreFor(main.id)} className="bg-transparent">
									<MoreVertical size={16} />
								</button>
							)}
						</div>
						<p className="text-sm text-black">{main.content}</p>
						<button
							className="text-xs mt-1 mb-2 flex items-center gap-1 px-2 py-1 border-2 border-gray-300 rounded-full"
							onClick={() => handleReplyClick(main.nickname)}
						>
							<MessageCircle size={14} /> 답변하기
						</button>
						<div className="w-full flex flex-col bg-gray-200">
							{/* 대댓글 */}
							{replies.map((r) => (
								<div key={r.id} className="ml-4 mt-2 p-2 rounded flex flex-col items-start justify-start">
									<div className="text-sm text-black font-semibold">
										{r.nickname}
										<span className="text-xs text-gray-500 ml-1">
											{r.time}분 전
										</span>
										{r.isMine && (
											<button onClick={() => setShowMoreFor(r.id)} className='bg-transparent'>
												<MoreVertical size={16} />
											</button>
										)}
									</div>
									<p className="text-sm">{r.content}</p>
									<button
										className="text-xs mt-1 mb-2 flex items-center gap-1 px-2 py-1 border-2 border-gray-300 rounded-full"
										onClick={() => handleReplyClick(main.nickname)}
									>
										<MessageCircle size={14} /> 답변하기
									</button>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			{/* 답글 작성 안내 표시 */}
			{replyTo && (
				<div className="fixed bottom-[70px] left-1/2 -translate-x-1/2 bg-[#F2F2F2] px-4 py-2 text-sm text-gray-500 w-[380px] rounded-full flex justify-between items-center shadow-md">
					<span>{replyTo}님에게 답글 남기는 중...</span>
					<button onClick={handleCancelReply}>
						<X size={16} />
					</button>
				</div>
			)}

			{/* 입력창 */}
			<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[400px] px-4 bg-white py-3 border-t shadow-inner">
				<div className="flex items-center gap-2">
					<input
						type="text"
						value={commentInput}
						onChange={(e) => setCommentInput(e.target.value)}
						placeholder="댓글을 입력해주세요"
						className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
					/>
					<button className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm">
						등록
					</button>
				</div>
			</div>

			{showMoreFor && (
				<div
					className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[400px] h-full 
					bg-black bg-opacity-50 rounded-lg shadow-lg flex justify-center items-end"
					onClick={() => setShowMoreFor(null)}
				>
					<div className="bg-white w-full rounded-t-lg p-4" onClick={(e) => e.stopPropagation()}>
						<button
							className="w-full flex justify-center items-center gap-2 py-3 text-red-600 font-semibold"
							onClick={() => {
								const ok = confirm('작성한 댓글을 삭제하시겠어요?');
								if (ok) {
									setShowMoreFor(null);
									toast.success('삭제되었습니다.');
								}
							}}
						>
							🗑 삭제하기
						</button>
					</div>
				</div>
			)}

		</div>
	);
}
