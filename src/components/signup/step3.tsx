import Button from "../button";
import Modal from "../modal";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Step3() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	// 렌더링 시 모달이 열림 
	useEffect(() => {
		setOpen(true);
	}, []);

	return (
		<div className="w-full max-w-md flex flex-col items-center justify-center gap-4">
			{open && (
				<Modal onClose={() => setOpen(false)}>
					<p className="mb-4">회원가입이 완료되었습니다!</p>
					<Button variant="primary" onClick={() => navigate('/login')}>
						로그인하러 가기
					</Button>
				</Modal>
			)}
		</div>
	);
}
