// 로그인 페이지에서 쓰일 TextField 컴포넌트

type LoginTextFieldProps = {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'number';
    disabled?: boolean;
    width?: string;
    required?: boolean;
    error?: string;
    variant?: 'login' | 'signup';
};

const LoginTextField = ({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    disabled,
    width,
    required,
    error,
    variant = 'login', 
}: LoginTextFieldProps) => {
    const variantStyle = {
        login: {
            wrapper: 'w-[300px]',
            input: 'h-[58px] px-4',
            radius: 'rounded-[8px]',
            font: 'text-base',
            border: 'border-[#000000] border-opacity-40',
        },
        signup: {
            wrapper: 'w-[266px]',
            input: 'h-[48px] px-3 py-3',
            radius: 'rounded-[4px]',
            font: 'text-sm',
            border: 'border-[#000000] border-opacity-10',
        },  
    };

    const style = variantStyle[variant];

    return (
        <div className={`flex flex-col ${width ?? style.wrapper}`}>
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
