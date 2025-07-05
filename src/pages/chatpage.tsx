import { useEffect, useState } from 'react';

interface Message {
	sender: 'me' | 'ai';
	text: string;
	type?: 'loading' | 'text';
}

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([
		{ sender: 'me', text: '안녕하세요.', type: 'text' },
		{ sender: 'ai', text: '...', type: 'loading' },
	]);

	useEffect(() => {
		// 2초 뒤 loading 메시지 나오도록 임시 조치 
		const timer = setTimeout(() => {
			setMessages((prev) =>
				prev.map((msg) =>
					msg.type === 'loading' ? { sender: 'ai', text: '안녕하세요. 어떤 도움이 필요하세요?', type: 'text' } : msg
				)
			);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="flex flex-col justify-between h-[90vh] bg-white px-4 py-2">
			{/* 메시지 리스트 */}
			<div className="flex-1 flex flex-col gap-2 overflow-y-auto">
				{messages.map((msg, idx) => (
					<div
						key={idx}
						className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
					>
						<div
							className={`px-3 py-2 rounded-xl text-sm max-w-[70%] ${msg.sender === 'me'
								? 'bg-[#5A5261] text-white rounded-br-none'
								: 'bg-[#EFE9F3] text-black rounded-bl-none'
								}`}
						>
							{msg.type === 'loading' ? (
								<div className="flex space-x-1 animate-pulse">
									<span>•</span>
									<span>•</span>
									<span>•</span>
								</div>
							) : (
								msg.text
							)}
						</div>
					</div>
				))}
			</div>

			{/* 입력창 */}
			<div className="border-t shadow-md px-4 py-3 flex items-center">
				<input
					className="flex-1 border-none focus:outline-none text-sm text-gray-500"
					placeholder="질문을 시작하세요."
				/>
			</div>
		</div>
	);
}
