import { MenuItem, Select } from "@mui/material"
import React from "react"

export interface SelectItem {
    name: string
    id: string | number
}
interface FormFieldSelect {
    options: Array<SelectItem>
    value?: string
    className?: string
    label?: string
}

const FormFieldSelect = (props: FormFieldSelect) => {
    const { options = [], value = "", className, label } = props
    return (
        <div className="flex gap-4 items-center flex-1">
            {label && <span className="text-sm">{label}</span>}
            <Select
                displayEmpty
                value={value}
                className={`w-full ${className}`}
                sx={{
                    height: '40px',  
                    fontSize: '14px' 
                }}
            //   onChange={handleChange}
            >
                <MenuItem value="" disabled>
                    Please select an option
                </MenuItem>
                {options.map((item) => {
                    return (
                        <MenuItem value={item.id} key={item.id}>
                            {item.name}
                        </MenuItem>
                    )
                })}
            </Select>
        </div>
    )
}

export default FormFieldSelect
