import { useState } from 'react';
import Button from '../button';

interface Props {
	onNext: () => void;
}

export default function Step1({ onNext }: Props) {
	const [role, setRole] = useState('');
	const [disability, setDisability] = useState('');
	const [type, setType] = useState('');

	const isValid = role && disability && type;

	const getStyle = (selected: boolean) => {
		return selected
			? {
				backgroundColor: 'bg-green-500',
				fontColor: 'text-white',
				border: 'border-4 border-green-500',
			}
			: {
				backgroundColor: 'bg-white',
				fontColor: 'text-gray-600',
				border: 'border-4 border-gray-200',
			};
	};

	return (
		<div className="w-full max-w-md flex flex-col gap-4">
			<h2 className="text-xl font-bold">어떤 입장으로 참여하시나요?</h2>
			<div className="flex gap-2">
				{['성인 장애인', '장애인 자녀의 부모'].map((v) => {
					const style = getStyle(role === v);
					return (
						<Button
							key={v}
							text={v}
							variant="primary"
							backgroundColor={style.backgroundColor}
							fontColor={style.fontColor}
							border={style.border}
							onClick={() => setRole(v)}
						/>
					);
				})}
			</div>

			<h2 className="text-xl font-bold">장애유형을 선택해주세요</h2>
			<div className="flex gap-2 flex-wrap">
				{['시각', '청각', '신체장애', '지적장애', '발달장애', '기타'].map((v) => {
					const style = getStyle(disability === v);
					return (
						<Button
							key={v}
							text={v}
							variant="primary"
							backgroundColor={style.backgroundColor}
							fontColor={style.fontColor}
							border={style.border}
							onClick={() => setDisability(v)}
						/>
					);
				})}
			</div>

			<h2 className="text-xl font-bold">장애인 구분을 선택해주세요</h2>
			<div className="flex gap-2">
				{['중증', '경증'].map((v) => {
					const style = getStyle(type === v);
					return (
						<Button
							key={v}
							text={v}
							variant="primary"
							backgroundColor={style.backgroundColor}
							fontColor={style.fontColor}
							border={style.border}
							onClick={() => setType(v)}
						/>
					);
				})}
			</div>

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
