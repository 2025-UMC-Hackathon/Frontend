import { useState } from 'react';
import TextField from '../TextField';
import Button from '../button';
import Modal from '../modal';
import DatePickerWheel from './datePickerWheel';
import { Calendar, AlertCircle } from 'lucide-react';

interface Props {
	onNext: () => void;
	nickname: string;
	birth: string;
	email: string;
	password: string;
	setNickname: (v: string) => void;
	setBirth: (v: string) => void;
	setEmail: (v: string) => void;
	setPassword: (v: string) => void;
}

export default function Step2({ onNext, nickname, birth, email, password, setNickname, setBirth, setEmail, setPassword }: Props) {
	// const [nickname, setNickname] = useState('');
	// const [birth, setBirth] = useState('');
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [modalOpen, setModalOpen] = useState(false);

	const [nicknameError, setNicknameError] = useState('');
	const [nicknameSuccess, setNicknameSuccess] = useState(false);

	const [passwordError, setPasswordError] = useState('');
	const [passwordSuccess, setPasswordSuccess] = useState(false);

	const isValid =
		nickname &&
		birth &&
		email &&
		password &&
		confirm &&
		password === confirm &&
		!nicknameError;

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	const handleConfirm = (y: string, m: string, d: string) => {
		setBirth(`${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`);
		closeModal();
	};

	// mockData 
	const checkNickname = () => {
		if (nickname === '해리포터') {
			setNicknameError('이미 사용중인 닉네임 입니다.');
			setNicknameSuccess(false);
		} else {
			setNicknameError('');
			setNicknameSuccess(true);
		}
	};

	const handlePasswordConfirm = (value: string) => {
		setConfirm(value);
		if (password !== value) {
			setPasswordError('비밀번호가 일치하지 않습니다.');
			setPasswordSuccess(false);
		} else {
			setPasswordError('');
			setPasswordSuccess(true);
		}
	};

	return (
		<div className="w-full max-w-md flex flex-col gap-4 items-start justify-center">
			<p className='font-bold'>닉네임*</p>
			<div className="w-full flex items-center justify-center gap-2 relative">
				<input
					type="text"
					value={nickname}
					onChange={(e) => {
						setNickname(e.target.value);
						setNicknameError('');
						setNicknameSuccess(false);
					}}
					className={`w-full p-2 border rounded-lg ${nicknameError ? 'border-red-500' : nicknameSuccess ? 'border-[#008491]' : 'border-gray-200'}`}
					placeholder="Label"
				/>
				<Button
					width="w-[30%]"
					borderRadius="rounded-lg"
					backgroundColor="bg-[#E9E9E9]"
					fontColor="text-[#9A9C9C]"
					onClick={checkNickname}
					padding='px-1 py-2'
				>
					중복체크
				</Button>
			</div>
			{nicknameError && (
				<div className="flex items-center text-red-500 text-sm gap-1 ml-1">
					<AlertCircle size={16} /> {nicknameError}
				</div>
			)}
			{!nicknameError && nicknameSuccess && (
				<div className="text-sm text-[#008491] ml-1">사용 가능한 닉네임입니다.</div>
			)}

			<p className='font-bold'>생년월일*</p>
			<div className="w-full flex items-center justify-center gap-0">
				<TextField placeholder="2001년 11월 21일" variant="signup" value={birth} onChange={() => { }} />
				<Button width="w-auto" onClick={openModal}>
					<Calendar size={20} color="#666666" />
				</Button>
			</div>

			<p className='font-bold'>이메일 주소*</p>
			<TextField
				placeholder="dodamdodam@dodam.com"
				variant="signup"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<p className='font-bold'>비밀번호*</p>
			<TextField
				type="password"
				placeholder="Password"
				variant="signup"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
					setPasswordError('');
					setPasswordSuccess(false);
				}}
			/>

			<p className='font-bold'>비밀번호 확인*</p>
			<input
				type="password"
				placeholder="Password Check"
				value={confirm}
				onChange={(e) => handlePasswordConfirm(e.target.value)}
				className={`w-full p-2 border rounded-lg ${passwordError ? 'border-red-500' : passwordSuccess ? 'border-[#008491]' : 'border-gray-200'}`}
			/>
			{passwordError && (
				<div className="flex items-center text-red-500 text-sm gap-1 ml-1">
					<AlertCircle size={16} /> {passwordError}
				</div>
			)}
			{!passwordError && passwordSuccess && (
				<div className="text-sm text-[#008491] ml-1">비밀번호가 일치합니다.</div>
			)}

			<button
				disabled={!isValid}
				onClick={onNext}
				className={`mt-4 w-full py-4 rounded-full font-bold
					${isValid ? 'bg-[#CDE7EC] text-[#3F484A]' : 'bg-[#E9E9E9] text-gray-500'}`}
			>
				다음
			</button>

			{modalOpen && (
				<Modal onClose={closeModal}>
					<DatePickerWheel
						initValue={{ year: '2022', month: '5', day: '11' }}
						onCancel={closeModal}
						onConfirm={(y, m, d) => handleConfirm(y, m, d)}
					/>
				</Modal>
			)}
		</div>
	);
}
