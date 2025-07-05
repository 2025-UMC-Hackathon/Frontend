import { serverCall } from '../../utils/serverCall';

interface PostData {
	id: number;
	nickname: string;
	writeDate: string;
	writeTime: {
		hour: number;
		minute: number;
		second: number;
	};
	title: string;
	content: string;
	likes: number;
	comments: number;
}

export const fetchPost = async ({ postId }: { postId: number }): Promise<PostData | null> => {
	try {
		const response = await serverCall<{ result: PostData }>('GET', `/api/posts/${postId}`);
		return response.result;
	} catch (error) {
		console.error('게시글 불러오기 실패:', error);
		return null;
	}
};

