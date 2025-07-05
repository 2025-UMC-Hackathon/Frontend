import { useState } from 'react';
import Step1 from "../components/signup/step1";
import Step2 from "../components/signup/step2";
import Step3 from "../components/signup/step3";
import { serverCall } from '../components/utils/serverCall';

export default function Signup() {
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);

	const [role, setRole] = useState('');
	const [disability, setDisability] = useState('');
	const [type, setType] = useState('');
	const [nickname, setNickname] = useState('');
	const [birth, setBirth] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [confirm, setConfirm] = useState('');

	const goToNext = async () => {
		if (step === 2) {
			// Step2 → Step3 로 넘어갈 때 회원가입 요청
			setLoading(true);

			try {
				const requestBody = {
					nickname,
					email,
					pwd: password,
					birthDate: birth,
					disabilityType: disability, // ex: 시각
					userType: role,             // ex: 성인장애인
					disabilityLevel: type,      // ex: 중증
				};

				const res = await serverCall('POST', '/api/signup', requestBody);
				console.log('회원가입 성공:', res);
				setStep(3);
			} catch (err) {
				console.error('회원가입 실패:', err);
				alert('회원가입 실패!');
			} finally {
				setLoading(false);
			}
		} else {
			setStep((prev) => prev + 1);
		}
	};

	return (
		<div className="h-[80vh] flex flex-col items-center justify-center p-4">
			{loading ? (
				<div className="text-center text-gray-600 font-bold text-lg">로딩 중...</div>
			) : (
				<>
					{step === 1 && (
						<Step1
							onNext={goToNext}
							role={role}
							setRole={setRole}
							disability={disability}
							setDisability={setDisability}
							type={type}
							setType={setType}
						/>
					)}
					{step === 2 && (
						<Step2
							onNext={goToNext}
							nickname={nickname}
							birth={birth}
							email={email}
							password={password}
							setNickname={setNickname}
							setBirth={setBirth}
							setEmail={setEmail}
							setPassword={setPassword}
						/>
					)}
					{step === 3 && <Step3 />}
				</>
			)}
		</div>
	);
}
