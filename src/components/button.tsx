
interface CustomButtonProps {
	text: string;
	width?: string;
	height?: string;
	padding?: string;
	backgroundColor?: string;
	borderRadius?: string;
	fontColor?: string;
	onClick?: () => void;
}

export default function Button({
	text,
	width = 'w-auto',
	height = 'h-auto',
	padding = 'p1',
	backgroundColor = 'bg-blue-500',
	borderRadius = 'rounded-md',
	fontColor = 'text-white',
	onClick,
}: CustomButtonProps) {
	const className = `${width} ${height} ${padding} ${backgroundColor} ${borderRadius} ${fontColor}
	transition hover:opacity-90 grid place-items-center border-0 focus:outline-none`;

	return (
		<button className={className} onClick={onClick}>
			{text}
		</button>
	);
}
