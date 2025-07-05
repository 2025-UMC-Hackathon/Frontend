import { useState } from 'react';
import ai_icon from '../assets/chat_icon.svg';
import { ArrowUp } from 'lucide-react';
import Button from '../components/button';
import { serverCall } from '../components/utils/serverCall';

interface Message {
	sender: 'me' | 'ai';
	text: string;
	type?: 'loading' | 'text';
}

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');

	const handleSend = async () => {
		if (!input.trim()) return;

		// 사용자의 메시지 추가
		const userMessage: Message = { sender: 'me', text: input, type: 'text' };
		const loadingMessage: Message = { sender: 'ai', text: '...', type: 'loading' };

		setMessages((prev) => [...prev, userMessage, loadingMessage]);
		setInput('');

		try {
			const response = await serverCall<{ answer: string }>('POST', '/api/chat', { message: input });

			setMessages((prev) =>
				prev.map((msg, i) =>
					i === prev.length + 1 - 1 // 마지막(로딩) 메시지를 실제 응답으로 교체
						? { sender: 'ai', text: response.answer, type: 'text' }
						: msg
				)
			);
		} catch (error) {
			console.error('AI 응답 실패:', error);
			setMessages((prev) =>
				prev.map((msg, i) =>
					i === prev.length + 1 - 1
						? { sender: 'ai', text: 'AI 응답에 실패했어요.', type: 'text' }
						: msg
				)
			);
		}
	};

	return (
		<div className="flex flex-col justify-between h-[90vh] bg-white px-4 py-2">
			{/* 안내 문구 */}
			{messages.length === 0 ? (
				<div className="flex flex-col items-center justify-center h-full">
					<img src={ai_icon} alt="아이콘" className="w-40 h-40" />
					<p className="text-[#000] mt-4">담담이는 대답을 잘해요!</p>
				</div>
			) : (
				<div className="flex-1 flex flex-col gap-2 overflow-y-auto">
					{messages.map((msg, idx) => (
						<div
							key={idx}
							className={`flex items-center gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
						>
							{msg.sender === 'ai' && <img src={ai_icon} alt="AI" className="w-10 h-10" />}
							<div
								className={`px-3 py-2 rounded-2xl text-sm font-bold max-w-[70%] ${msg.sender === 'me'
									? 'bg-[#CDE7EC] text-[#334B4E] rounded-br-md'
									: 'bg-[#E3E9EA] text-[#3F484A] rounded-bl-md'
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
			)}

			{/* 입력창 */}
			<div className="flex items-center mt-2">
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && handleSend()}
					className="flex-1 border-none px-5 py-2 rounded-lg focus:outline-none text-sm text-gray-500 bg-[#F5F5F5]"
					placeholder="어떤 도움이 필요하세요?"
				/>
				<Button
					borderRadius="rounded-full"
					backgroundColor="bg-gray-200"
					width="w-auto"
					padding="p-2"
					onClick={handleSend}
				>
					<ArrowUp size={20} />
				</Button>
			</div>
		</div>
	);
}
