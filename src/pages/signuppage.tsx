import { useState } from 'react';
import Step1 from "../components/signup/step1";
import Step2 from "../components/signup/step2";
import Step3 from "../components/signup/step3";

export default function Signup() {
	const [step, setStep] = useState(1);
	const goToNext = () => setStep((prev) => prev + 1);

	return (
		<div className="h-[80vh] flex flex-col items-center justify-center p-4">

			{step === 1 && <Step1 onNext={goToNext} />}
			{step === 2 && <Step2 onNext={goToNext} />}
			{step === 3 && <Step3 />}
		</div>
	);
}
