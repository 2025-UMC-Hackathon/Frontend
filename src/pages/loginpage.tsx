import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import clsx from 'clsx'; 
import logoImage from '../assets/Logo.svg'; 
import { serverCall } from '../components/utils/serverCall';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    validateEmail();
    if (!isActive) return;
  
    try {
      const login = await serverCall('POST', `/auth/login`, { email, password: pw });
      const { isSuccess, code, message, result } = login;
      if (isSuccess && code === 'COMMON200') {
        const accessToken = result;
        localStorage.setItem('accessToken', accessToken);
        // 로그인 성공 처리 (예: 페이지 이동)
        // navigate('/home');
      } else {
        alert('로그인 실패: ' + message);
      }
    } catch (error) {
      alert('로그인 중 오류가 발생했습니다.');
    }
  };
  
  
  
  
  // 포커스 상태
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPwFocused, setIsPwFocused] = useState(false);
  
  // 호버 상태
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isPwHovered, setIsPwHovered] = useState(false);

  // 에러 상태
  const [emailError, setEmailError] = useState('');

  // --- 2. 로직 및 상태 업데이트 ---
  const isActive = email.length > 0 && pw.length > 0 && !emailError;

  // 이메일 유효성 검사 (포커스가 해제될 때)
  const validateEmail = () => {
    if (email.length > 0 && !email.includes('@')) {
      setEmailError('이메일 또는 주소가 올바르지 않습니다!');
    } else {
      setEmailError('');
    }
  };

  

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      {/* ... 로고, h1 등 ... */}
      <div className="mt-24 mb-16 flex justify-center">
      <img src={logoImage} alt="도담도담 로고" className="w-[172px] h-[40px]" />
      </div>

      <form
        className="flex w-full flex-col items-center gap-5"
        style={{ maxWidth: 360 }}
        onSubmit={handleLogin}
      >
        <div className="relative w-full">
        <label 
    htmlFor="email" 
    className={clsx(
      "absolute left-8 -top-2 bg-white px-1 text-sm  ",
      {
        // 에러, 포커스, 호버 등 상태에 따라 글자색 변경
        'text-[#BA1A1A]': emailError,
        'text-[#006973]': isEmailFocused && !emailError,
        'text-gray-400': isEmailHovered && !isEmailFocused && !emailError,
        'text-[#7A757F]': email.length > 0 && !isEmailFocused && !emailError,
        // 기본 라벨 색상
        'text-gray-500': !emailError && !isEmailFocused && !isEmailHovered && email.length === 0,
      }
    )}
  >
    이메일 주소
  </label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="이메일 주소"
            type="email"
            // --- 3. 동적 className 적용 ---
            className={clsx(
              // 기본 스타일
              "w-full h-14 px-6 rounded-full text-lg placeholder:text-[#AEB5BC] focus:outline-none transition-all",
              // 상태별 스타일 (객체 형태로)
              {

                // 에러 상태이면서 포커스 상태
               'border-[3.5px] border-[#BA1A1A] ring-2 ring-red-100': isEmailFocused && emailError,
                // 에러 상태 (가장 높은 우선순위)
                'border-[1px] border-[#BA1A1A]': emailError,
                
                // 포커스 상태
                'border-[3px] focus:border-[#006973] ring-2 focus:ring-[#008080]/20': isEmailFocused && !emailError,
                // 호버 상태
                'border-[1px] border-gray-400': isEmailHovered && !isEmailFocused && !emailError,
                // 텍스트가 있는 활성화 상태
                'border-[1px] border-[#7A757F]': email.length > 0 && !isEmailFocused && !emailError,
                // 기본(disabled) 상태
                'border border-gray-300': !emailError,
              }
            )}
            // --- 4. 이벤트 핸들러 연결 ---
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => {
              setIsEmailFocused(false);
              validateEmail(); // 포커스 아웃될 때 유효성 검사
            }}
            onMouseEnter={() => setIsEmailHovered(true)}
            onMouseLeave={() => setIsEmailHovered(false)}
            required
          />
         {emailError && <p className="mt-2 ml-4 text-sm text-left w-full text-[#BA1A1A]">{emailError}</p>}
        </div>
        

        {/* --- 비밀번호 입력란도 동일한 방식으로 적용 가능 --- */}
        <div className="w-full relative mb-5">
        <label
    htmlFor="password"
    className={clsx("absolute left-8 -top-2 bg-white px-1 text-sm  ",{
        'text-[#BA1A1A]': emailError,
        'text-[#006973]': isPwFocused,
        'text-gray-400': isPwHovered && !isPwFocused,
        'text-[#7A757F]': pw.length > 0 && !isPwFocused && !isPwHovered,
        'text-gray-500': pw.length === 0 && !isPwFocused && !isPwHovered,
    })}
  >
    비밀번호
  </label>
          <input
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="비밀번호"
            type="password"
            className={clsx(
              "w-full h-14 px-6 rounded-full text-lg placeholder:text-[#AEB5BC] focus:outline-none transition-all",
              {
                'border-[1px] border-[#BA1A1A]': emailError,
                'border-[3px] focus:border-[#006973] ring-2 focus:ring-[#008080]/20': isPwFocused, //포커스 되어있을때 
                'border-[1px] border-gray-400': isPwHovered && !isPwFocused,  //호버 되어있을때 
                'border-[1px] border-[#7A757F]': pw.length > 0 && !isPwFocused, //입력은 있는데 포커스 안되어있을때 
                'border border-gray-300': true,  //기본 아무 입력 없을때 
              }
            )}
            onFocus={() => setIsPwFocused(true)}
            onBlur={() => setIsPwFocused(false)}
            onMouseEnter={() => setIsPwHovered(true)}
            onMouseLeave={() => setIsPwHovered(false)}
            required
          />
        </div>

        {/* ... 버튼 및 회원가입 링크 ... */}
        <Button
          text="로그인"
          width="w-full"
          height="h-14"
          borderRadius="rounded-full"
          backgroundColor={isActive ? "bg-[#00B8C4]" : "bg-[#D2EDF2]"}
          fontColor="text-white"
          fontWeight="font-bold"
          disabled={!isActive}
          style={{ cursor: isActive ? 'pointer' : 'not-allowed' }}
        />


<div className="flex justify-center items-center gap-2 mt-2">
  <span
    className="font-bold text-[14px] leading-[20px] tracking-[0.1px] text-[#1D1B20]"
    style={{ fontFamily: 'Pretendard, sans-serif' }}
  >
    아직 도담도담의 회원이 아니신가요?
  </span>
  <button
    className="text-[#008080] font-bold underline text-[14px] leading-[20px] tracking-[0.1px]"
    style={{ fontFamily: 'Pretendard, sans-serif' }}
    onClick={() => navigate('/signup')}
    type="button"
  >
    회원가입
  </button>
</div>
      </form>
      {/* ... */}
    </div>
  );
}
