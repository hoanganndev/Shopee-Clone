import { InputHTMLAttributes, useState } from 'react'
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form'

export type InputNumberProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

// InputV2 vừa có chức năng của 1 input thường, vừa có chức năng của 1 inputNumber
function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputNumberProps<TFieldValues, TName>) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value as string)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const numberCondition =
      type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    //type = number hoặc text đều dùng được
    if (numberCondition || type !== 'number') {
      // Cập nhập local value state
      setLocalValue(valueFromInput)
      // Gọi field.onChange để cập nhập vào state react hook form
      field.onChange(event)
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
    }
  }

  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...rest}
        {...field}
        onChange={handleChange}
        value={value || localValue}
      />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2

// //TODO: ví dụ function lastName có giá trị là kết quả return của person

// type Gen<TFunc> = {
//   getName: TFunc
// }

// function Hexa<TFunc extends () => string, TLastName extends ReturnType<TFunc>>(props: {
//   person: Gen<TFunc>
//   lastName: TLastName
// }) {
//   return null
// }

// const handleName: () => 'Hoang An' = () => 'Hoang An'

// function myApp() {
//   return <Hexa person={{ getName: handleName }} lastName='Hoang An' />
// }
