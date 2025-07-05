type CommentType = {
	id: number;
	nickname: string;
	content: string;
	time: number;
	isMine: boolean;
};

type PostType = {
	id: number;
	nickname: string;
	writeDate: string;
	writeTime: string;
	title: string;
	content: string;
	likes: number;
	comments: number;
	isMine: boolean;
	comment: [CommentType, CommentType[]][];
};


export const mockData: PostType = {
	id: 1,
	nickname: '나영',
	writeDate: '2025-07-05',
	writeTime: '19:30',
	title: '글 제목!!',
	content: '글 내용~~',
	likes: 19,
	comments: 22,
	isMine: true,
	comment: [
		[
			{
				id: 1,
				nickname: '해피',
				content: '나는 답글!!',
				time: 4,
				isMine: false,
			},
			[
				{ id: 1, nickname: '니니', content: '나는야 답글의 답글!', time: 4, isMine: false },
				{ id: 2, nickname: '나영', content: '나도 답글의 답글!', time: 4, isMine: true },
			],
		],
		[
			{
				id: 2,
				nickname: '나영',
				content: '내가 쓴 댓글입니다.',
				time: 4,
				isMine: true,
			},
			[],
		],
	],
};
