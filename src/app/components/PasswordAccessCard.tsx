import React from "react";

export function PasswordCornerDecoration({
  className,
  transform,
}: {
  className?: string;
  transform?: string;
}) {
  return (
    <div className={`absolute size-[33px] ${className ?? ""}`}>
      <div className="size-full" style={{ transform }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
          <path
            d="M33 22.041C27.1702 22.522 22.523 27.1702 22.042 33H18.0322C18.5281 24.96 24.96 18.5271 33 18.0312V22.041Z"
            fill="#004E8D"
          />
        </svg>
      </div>
    </div>
  );
}

type PasswordAccessCardProps = {
  title: string;
  value: string;
  placeholder: string;
  helperText: string;
  panelClassName?: string;
  titleClassName?: string;
  inputClassName?: string;
  inputFieldClassName?: string;
  helperClassName?: string;
  inputWrapperClassName?: string;
  inputReadOnly?: boolean;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

export function PasswordAccessCard({
  title,
  value,
  placeholder,
  helperText,
  panelClassName = "",
  titleClassName = "",
  inputClassName = "",
  inputFieldClassName = "",
  helperClassName = "",
  inputWrapperClassName = "",
  inputReadOnly = false,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
}: PasswordAccessCardProps) {
  return (
    <div className={`relative h-[200px] w-[430px] rounded-[32px] border bg-[#e6e6e6]/96 ${panelClassName}`}>
      <div aria-hidden="true" className="absolute inset-0 rounded-[32px] bg-[#e6e6e6]" />
      <PasswordCornerDecoration className="left-0 top-0" />
      <PasswordCornerDecoration className="bottom-0 left-0" transform="scaleY(-1)" />
      <PasswordCornerDecoration className="bottom-0 right-0" transform="rotate(180deg)" />
      <PasswordCornerDecoration className="right-0 top-0" transform="scaleY(-1) rotate(180deg)" />
      <div aria-hidden="true" className="absolute inset-0 rounded-[32px] shadow-[inset_4px_4px_16px_0px_rgba(0,105,209,0.1)]" />

      <div className="absolute inset-0">
        <div className="absolute left-0 right-0 top-[24px] flex h-[64px] items-center justify-center px-[40px]">
          <p
            className={`w-full text-center font-['Manrope:Bold','Noto_Sans_JP:Bold',sans-serif] text-[12px] font-bold uppercase tracking-[1.44px] text-[#004e8d] ${titleClassName}`}
          >
            {title}
          </p>
        </div>

        <div className={`absolute left-[48px] right-[48px] top-[96px] ${inputWrapperClassName}`}>
          <div className="relative">
            <div className={`flex h-[56px] w-full items-center rounded-[8px] border px-[16px] transition-all duration-300 ${inputClassName}`}>
              <input
                type="password"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                readOnly={inputReadOnly}
                className={`h-full w-full border-0 bg-transparent text-center font-['Manrope:Light',sans-serif] text-[12px] font-light tracking-[1.44px] outline-none transition-colors duration-300 placeholder:text-center ${inputFieldClassName}`}
              />
            </div>
            {helperText ? (
              <p
                role="status"
                className={`pointer-events-none absolute left-1/2 top-[calc(100%+56px)] w-[390px] -translate-x-1/2 text-center font-['Manrope:Light',sans-serif] text-[12px] leading-6 text-[#a25f66] transition-all duration-300 ${helperClassName}`}
              >
                {helperText}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
