import { useState } from 'react';
import Step1 from "../components/signup/step1";
import Step2 from "../components/signup/step2";
import Step3 from "../components/signup/step3";
import Box from '../components/box';

export default function Signup() {
	const [step, setStep] = useState(1);

	const goToNext = () => setStep((prev) => prev + 1);

	const getBoxColor = (boxStep: number) =>
		step === boxStep ? 'bg-green-500 text-white' : 'bg-gray-100 text-black';

	return (
		<div className="flex flex-col items-center justify-start p-4 min-h-screen">
			<div className="w-full max-w-md flex justify-center gap-4 mb-6">
				{[1, 2, 3].map((num) => (
					<Box
						key={num}
						width="w-10"
						height="h-10"
						borderRadius="rounded-full"
						backgroundColor={getBoxColor(num)}
						padding="p-0"
					>
						{num}
					</Box>
				))}
			</div>

			{step === 1 && <Step1 onNext={goToNext} />}
			{step === 2 && <Step2 onNext={goToNext} />}
			{step === 3 && <Step3 />}
		</div>
	);
}
