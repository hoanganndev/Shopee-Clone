import { describe, it, expect } from 'vitest'
import { AxiosError } from 'axios'
import { isAxiosError, isAxiosErrorUnprocessableEntity } from '../utils'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

// describe mô tả tập hợp tất cả các ngữ cảnh
// hoặc 1 đơn vị cần test: ex function, component
describe('isAxiosError', () => {
  // it dùng để nghi chú trường hợp cần test
  it('isAxiosError trả về boolean', () => {
    // expect dùng để mong đợi giá trị trả về
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosErrorUnprocessableEntity', () => {
  it('isAxiosErrorUnprocessableEntity trả về boolean', () => {
    expect(isAxiosErrorUnprocessableEntity(new Error())).toBe(false)

    expect(
      isAxiosErrorUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError, //500
          data: null
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosErrorUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity, //422
          data: null
        } as any)
      )
    ).toBe(true)
  })
})
