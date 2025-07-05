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
				backgroundColor: 'bg-[#CDE7EC]',
				fontColor: 'text-[#334B4E]',
				fontWeight: 'font-bold',
				border: 'border-0',
				borderRadius: 'rounded-full'
			}
			: {
				backgroundColor: 'bg-white',
				fontColor: 'text-[#3F484A]',
				fontWeight: 'font-base',
				border: 'border-1 border-[#BFC8CA]',
				borderRadius: 'rounded-full'
			};
	};

	return (
		<div className="w-full flex flex-col gap-10 items-center justify-center">
			<p className="text-sm font-bold font-[#334B4E]">어떤 입장으로 오시게 되었나요?</p>
			<div className="w-full flex gap-2">
				{['성인 장애인', '장애인 자녀를 둔 부모'].map((v) => {
					const style = getStyle(role === v);
					return (
						<Button
							key={v}
							text={v}
							variant="primary"
							backgroundColor={style.backgroundColor}
							fontColor={style.fontColor}
							fontWeight={style.fontWeight}
							border={style.border}
							borderRadius={style.borderRadius}
							onClick={() => setRole(v)}
							width='w-1/2'
							height='h-auto'
							padding='p-2'
						/>
					);
				})}
			</div>

			<p className="text-sm font-bold font-[#334B4E]">어떤 입장으로 오시게 되었나요?</p>
			<div className="flex gap-2 flex-wrap">
				{['눈', '귀', '신체', '머리', '기타'].map((v) => {
					const style = getStyle(disability === v);
					return (
						<Button
							key={v}
							text={v}
							variant="primary"
							backgroundColor={style.backgroundColor}
							fontColor={style.fontColor}
							fontWeight={style.fontWeight}
							border={style.border}
							onClick={() => setDisability(v)}
							borderRadius={style.borderRadius}
						/>
					);
				})}
			</div>

			<p className="text-sm font-bold font-[#334B4E]">어느 정도인가요?</p>
			<div className="flex gap-2">
				{['심해요', '가벼운 정도예요'].map((v) => {
					const style = getStyle(type === v);
					return (
						<Button
							key={v}
							text={v}
							variant="primary"
							backgroundColor={style.backgroundColor}
							fontColor={style.fontColor}
							fontWeight={style.fontWeight}
							border={style.border}
							onClick={() => setType(v)}
							borderRadius={style.borderRadius}
						/>
					);
				})}
			</div>

			<button
				disabled={!isValid}
				onClick={onNext}
				className={`mt-4 w-full rounded-full font-bold py-4
				${isValid ? 'bg-[#CDE7EC] text-[#3F484A]' : 'bg-[#E9E9E9] text-gray-500'}`}
			>
				다음
			</button>
		</div>
	);
}
