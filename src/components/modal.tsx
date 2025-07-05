import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
	children: ReactNode;
	onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
	const modalRoot = document.getElementById('modal-root');
	if (!modalRoot) return null;

	return ReactDOM.createPortal(
		<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[400px] h-full 
		bg-black bg-opacity-50 p-6 rounded-lg shadow-lg">
			<div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[300px] flex-col">
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-2xl font-bold text-gray-500 hover:text-gray-800 p-1"
					aria-label="Close modal"
				>
					&times;
				</button>

				{children}
			</div>
		</div>,
		modalRoot
	);
}
