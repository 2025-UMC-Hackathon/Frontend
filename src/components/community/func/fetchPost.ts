import { serverCall } from '../../utils/serverCall';

interface RawPostData {
	id: number;
	nickname: string;
	createdAt: string;
	title: string;
	content: string;
	likes: number;
	commentCnt: number;
}

export const fetchPost = async ({ postId }: { postId: number }): Promise<RawPostData | null> => {
	try {
		const response = await serverCall<{ result: RawPostData }>('GET', `/api/posts/${postId}`);
		return response.result;
	} catch (error) {
		console.error('게시글 불러오기 실패:', error);
		return null;
	}
};
