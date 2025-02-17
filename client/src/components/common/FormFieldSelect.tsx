import { MenuItem, Select } from '@mui/material'
import React from 'react'

interface SelectItem {
    label: string,
    value: string | number
}
interface FormFieldSelect {
    options: Array<SelectItem>,
    value?: string,
    className?: string

}

const FormFieldSelect = (props: FormFieldSelect) => {
    const {options = [],value = "", className } = props
  return (
    <div className='flex gap-4 items-center flex-1'>
                <span>Department</span>
                <Select
                    displayEmpty
                    value={value}
                    className={`w-full ${className}`}
                //   onChange={handleChange}
                >
                    <MenuItem value="" disabled>
                        Please select an option
                    </MenuItem>
                    {options.map(item =>  {
                        return <MenuItem value={item.value} key = {item.value}>{item.label}</MenuItem>}) }
          
                    
                </Select>
            </div>
  )
}

export default FormFieldSelect