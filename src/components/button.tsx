import type { ReactNode } from 'react';

interface CustomButtonProps {
	text?: string;
	children?: ReactNode;
	width?: string;
	height?: string;
	padding?: string;
	backgroundColor?: string;
	borderRadius?: string;
	border?: string;
	fontColor?: string;
	fontWeight?: string;
	onClick?: () => void;
	variant?: 'primary' | 'secondary' | 'danger' | 'outline';
}

type VariantStyle = {
	bg: string;
	text: string;
	border?: string;
};

const variantStyles: Record<NonNullable<CustomButtonProps['variant']>, VariantStyle> = {
	primary: {
		bg: 'bg-blue-500',
		text: 'text-white',
	},
	secondary: {
		bg: 'bg-gray-300',
		text: 'text-gray-800',
	},
	danger: {
		bg: 'bg-red-600',
		text: 'text-white',
	},
	outline: {
		bg: 'bg-white',
		text: 'text-blue-500',
		border: 'border border-blue-500',
	},
};

export default function Button({
	text,
	children,
	width = 'w-auto',
	height = 'h-auto',
	padding = 'px-4 py-2',
	backgroundColor,
	border,
	borderRadius,
	fontColor,
	fontWeight,
	onClick,
	variant,
}: CustomButtonProps) {
	const variantClass: VariantStyle = variant ? variantStyles[variant] : { bg: '', text: '', border: '' };

	const className = `
		${width} ${height} ${padding}
		${backgroundColor ?? variantClass.bg}
		${fontColor ?? variantClass.text}
		${borderRadius ?? 'rounded-md'}
		${border ?? variantClass.border ?? ''}
		${fontWeight ?? 'text-sm'}
		transition hover:opacity-90 grid place-items-center
		outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent
	`.trim();

	return (
		<button className={className} onClick={onClick}>
			{text ?? children}
		</button>
	);
}
