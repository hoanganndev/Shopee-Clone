import { forwardRef, InputHTMLAttributes, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function inputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  // khi người dùng không truyền value, onChange thì input vẫn hoạt động được bình thường
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    // is number
    if (/^\d+$/.test(value) || value === '') {
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
      // Cập nhập local value state
      setLocalValue(value)
    }
  }

  return (
    <div className={className}>
      <input
        className={classNameInput}
        value={value || localValue}
        {...rest}
        onChange={handleChange}
        ref={ref}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
