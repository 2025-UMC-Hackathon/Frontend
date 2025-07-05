import Modal from "../components/modal";
import Button from "../components/button";
import { useState } from 'react';

export default function Chat() {
	const [open, setOpen] = useState(false);
	const modalOpen = () => {
		setOpen(true);
	}
	return (
		<div className="flex flex-col items-center justify-start p-2">
			여기는 AI 채팅 페이지~

			<Button
				text="모달오픈"
				width="w-30"
				height="h-10"
				backgroundColor="bg-green-600"
				borderRadius="rounded-full"
				fontColor="text-white"
				onClick={modalOpen}
			/>
			{open && (
				<Modal onClose={() => setOpen(false)}>
					<h2 className="text-lg font-bold">모달 제목</h2>
					<p>모달 내용입니다.</p>
				</Modal>
			)}
		</div>
	);
}
