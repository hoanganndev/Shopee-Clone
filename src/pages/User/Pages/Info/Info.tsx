import { Fragment } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { FormData } from '../Profile/Profile'

const Info = () => {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>() // retrieve all hook methods

  return (
    <Fragment>
      <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Input
            classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
            register={register}
            name='name'
            placeholder='Tên'
            errorMessage={errors.name?.message}
          />
        </div>
      </div>
      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Số điện thoại'
                errorMessage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Input
            classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
            register={register}
            name='address'
            placeholder='Địa chỉ'
            errorMessage={errors.address?.message}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Info
