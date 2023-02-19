export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
export interface SuccessResponse<Data> {
  message: string
  data: Data
}

/**
 * cú pháp -? sẽ loại bỏ undefined của key optional
 * NonNullable là 1 utils của typescript sẽ loại bỏ đi giá trị undefind của 1 type
 */
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
