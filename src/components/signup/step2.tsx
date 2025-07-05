import { useState } from 'react';
import TextField from '../LoginTextField';

interface Props {
	onNext: () => void;
}

export default function Step2({ onNext }: Props) {
	const [nickname, setNickname] = useState('');
	const [birth, setBirth] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');

	const isValid =
		nickname && birth && email && password && confirm && password === confirm;

	return (
		<div className="w-full max-w-md flex flex-col gap-4 items-start justify-center">
			<h3>닉네임*</h3>
			<TextField placeholder="닉네임" variant='signup' value={nickname} onChange={(e) => setNickname(e.target.value)} />
			<h3>생년월일*</h3>
			<TextField placeholder="생년월일" variant='signup' value={birth} onChange={(e) => setBirth(e.target.value)} />
			<h3>이메일*</h3>
			<TextField placeholder="이메일" variant='signup' value={email} onChange={(e) => setEmail(e.target.value)} />
			<h3>비밀번호*</h3>
			<TextField type="password" placeholder="비밀번호" variant='signup' value={password} onChange={(e) => setPassword(e.target.value)} />
			<h3>비밀번호 확인*</h3>
			<TextField type="password" placeholder="비밀번호 확인" variant='signup' value={confirm} onChange={(e) => setConfirm(e.target.value)} />

			<button
				disabled={!isValid}
				onClick={onNext}
				className={`mt-4 w-full py-2 rounded ${isValid ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
					}`}
			>
				다음
			</button>
		</div>
	);
}
