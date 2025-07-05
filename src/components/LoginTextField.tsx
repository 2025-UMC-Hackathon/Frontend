// 로그인 페이지에서 쓰일 TextField 컴포넌트

type LoginTextFieldProps = {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'number';
    disabled?: boolean;
    width?: string; // 예: "w-[300px]" 또는 "w-full"
    required?: boolean;
    error?: string;
};

const LoginTextField = ({
    label,
    value,
    onChange,
    placeholder,
    type,
    disabled,
    width,
    required,
    error,
}: LoginTextFieldProps) => {
    return (
        <div className={`flex flex-col ${width}`}>
            {label && (
                <label className="flex flex-start text-lg mb-[10px] gap-[2px]">
                    {label}
                    {required && <span>*</span>}
                </label>
            )}
            <div className={`flex items-center border border-[#333] border-opacity-20 rounded-[8px] px-3 py-3 bg-white`}>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="flex-1 text-base bg-transparent outline-none placeholder:text-[#CACAD0]"
                />
            </div>
            {error && <span className="flex flex-start mt-[3px] text-[11px] text-[#838389]">{error}</span>}
        </div>
    );
};

export default LoginTextField;
