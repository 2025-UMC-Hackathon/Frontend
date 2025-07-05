import type { ReactNode } from 'react';

interface BoxProps {
	children: ReactNode;
	width?: string;
	height?: string;
	padding?: string;
	margin?: string;
	backgroundColor?: string;
	borderRadius?: string;
	border?: string;
	boxShadow?: string;
	flexDirection?: 'row' | 'col';
	variant?: 'card' | 'panel' | 'glass' | 'bordered';
}

export default function Box({
	children,
	width = 'w-full',
	height = 'h-auto',
	padding,
	margin,
	backgroundColor,
	borderRadius,
	border,
	boxShadow,
	flexDirection = 'row',
	variant,
}: BoxProps) {

	// variant에 따른 기본 스타일
	const variantClasses: Record<string, string> = {
		card: 'bg-white rounded-lg shadow-md p-4',
		panel: 'bg-gray-100 p-4 rounded-md',
		glass: 'bg-white/30 backdrop-blur-md p-4 rounded-xl',
		bordered: 'bg-white border border-gray-300 p-4 rounded-md',
	};

	// variant가 있을 경우 해당 스타일 적용
	const baseClass = variant ? variantClasses[variant] : '';

	// 커스텀 props는 variant 위에 덮어쓰기 가능
	const className = `
	  ${baseClass}
	  ${width} ${height} ${padding ?? ''} ${margin ?? ''}
	  ${backgroundColor ?? ''} ${borderRadius ?? ''} ${border ?? ''} ${boxShadow ?? ''}
	  flex flex-${flexDirection}
	`.trim();

	return <div className={className}>{children}</div>;
}