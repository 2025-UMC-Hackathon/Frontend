import { serverCall } from '../../utils/serverCall';

export interface CommentData {
	id: number;
	nickname: string;
	content: string;
	userId: number;
	postId: number;
	parentId: number;
	writeDate: string;
	createdAt: string;
	children: CommentData[]; // 재귀 형태
}

export const fetchComment = async ({
	postId,
}: {
	postId: number;
}): Promise<CommentData[] | null> => {
	try {
		const response = await serverCall<{ result: CommentData[] }>(
			'GET',
			`/api/comments/${postId}`
		);
		return response.result;
	} catch (error) {
		console.error('댓글 목록 불러오기 실패:', error);
		return null;
	}
};
