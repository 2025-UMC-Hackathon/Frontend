import { useEffect, useState } from 'react';
import Picker from 'react-mobile-picker-scroll';

interface Props {
	initValue: { year: string; month: string; day: string };
	onCancel: () => void;
	onConfirm: (year: string, month: string, day: string) => void;
}

export default function DatePickerWheel({ initValue, onCancel, onConfirm }: Props) {
	const [pickerValue, setPickerValue] = useState(initValue);

	const optionGroups = {
		year: ['2019', '2020', '2021', '2022', '2023', '2024'],
		month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		day: Array.from({ length: 31 }, (_, i) => `${i + 1}`),
	};

	const handleChange = (name: string, value: string) => {
		setPickerValue((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// 스크롤 방지
	useEffect(() => {
		const originalStyle = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = originalStyle;
		};
	}, []);

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white rounded-xl shadow-md p-4 w-[90%] max-w-md">
				<div className="text-center font-bold mb-4 text-lg">생년월일</div>

				<Picker
					optionGroups={optionGroups}
					valueGroups={pickerValue}
					onChange={handleChange}
				/>

				<div className="flex justify-between mt-6">
					<button className="px-4 py-2 text-gray-500" onClick={onCancel}>취소</button>
					<button className="px-4 py-2 bg-green-500 text-white rounded-md"
						onClick={() => onConfirm(pickerValue.year, pickerValue.month, pickerValue.day)}
					>
						확인
					</button>
				</div>
			</div>
		</div>
	);
}
