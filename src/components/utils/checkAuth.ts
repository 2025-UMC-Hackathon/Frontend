import { serverCall } from './serverCall';

export const checkAuth = async (): Promise<boolean> => {
	try {
		// 인증된 사용자만 접근 가능 API
		await serverCall('GET', '/api/me/posts');
		return true; // 인증된 사용자
	} catch (error: any) {
		alert('로그인 후 사용하실 수 있습니다!');
		return false; // 인증되지 않은 사용자
	}
};
