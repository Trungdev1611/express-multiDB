import { TextField } from '@mui/material'
import React, { ChangeEvent } from 'react'


interface TextFieldFormProps {
  value?: string | number | null | undefined
  className?: string
  label?: string | React.ReactNode
  onChange: (event: ChangeEvent) => void;
  placeholder?: string,
  required?: boolean,
  layout?: "horizontal" | "vertical"

}

const TextFieldForm = ({ onChange, value, placeholder = "Tye in here....", label, required, layout = "horizontal" }: TextFieldFormProps) => {
  return (
    <div className={`${layout === "horizontal" ? "items-center" : "flex-col gap-2"} flex gap-4  flex-1`}>
      <span className=''>
        {label && <span className="text-sm inline-block">{label}{label && required && <span className="text-red-400 ml-1">*</span>}</span>}
       
      </span>
      <TextField
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className='!w-full !h-[40px]'
        InputProps={{ sx: { height: "40px", width: "100%" } }}
      />
    </div>

  )
}

export default TextFieldForm