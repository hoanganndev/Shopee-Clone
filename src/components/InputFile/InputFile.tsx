import { Fragment, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange?: (file?: File) => void
}

const InputFile = ({ onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    console.log(fileFromLocal)
    // 1MB = 1.048.576 bytes
    if (
      fileFromLocal &&
      (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))
    ) {
      toast.error('Dung lượng file tối đa 1MB, định dạng PNG, JPG ', {
        position: 'top-center'
      })
    } else {
      onChange && onChange(fileFromLocal)
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <Fragment>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(e) => {
          ;(e.target as any).value = null
        }}
      />
      <button
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        type='button'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}

export default InputFile
