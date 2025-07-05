import React from 'react';

interface ConfirmDeleteModalProps {
	onCancel: () => void;
	onConfirm: () => void;
}

export default function ConfirmDeleteModal({ onCancel, onConfirm }: ConfirmDeleteModalProps) {
	return (
		<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[400px] h-full 
		bg-black bg-opacity-50 p-6 rounded-lg shadow-lg">
			<div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white
			shadow-lg w-[300px] flex flex-col items-center justify-center gap-2 rounded-lg">
				<div className="text-center px-4 py-6 font-semibold text-base">
					삭제 하시겠습니까?
				</div>
				<div className="w-full border-t flex">
					<button
						onClick={onCancel}
						className="w-1/2 py-3 text-blue-500 font-medium border-r"
					>
						취소
					</button>
					<button
						onClick={onConfirm}
						className="w-1/2 py-3 text-blue-600 font-semibold"
					>
						삭제
					</button>
				</div>
			</div>
		</div>
	);
}
