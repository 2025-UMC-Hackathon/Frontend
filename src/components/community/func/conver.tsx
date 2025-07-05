// CommentType으로 변환하는 헬퍼 함수

interface CommentType {
	id: number;
	nickname: string;
	content: string;
	time: string;
	isMine: boolean;
}
interface CommentData {
	id: number;
	userNickname: string;
	content: string;
	userId: number;
	postId: number;
	parentId: number;
	writeDate: string;
	createdAt: string;
	time: string;
	children: CommentData[]; // 재귀 형태
}

export const convertToCommentTypeTuple = (
	data: CommentData[],
	currentUserId: number
): [CommentType, CommentType[]][] => {
	return data.map((parent) => {
		const main: CommentType = {
			id: parent.id,
			nickname: parent.userNickname,
			content: parent.content,
			time: parent.time,
			isMine: parent.userId === currentUserId,
		};

		const replies: CommentType[] = (parent.children || []).map((child) => ({
			id: child.id,
			nickname: child.userNickname,
			content: child.content,
			time: child.time,
			isMine: child.userId === currentUserId,
		}));

		return [main, replies];
	});
};

