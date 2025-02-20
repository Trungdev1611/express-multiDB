

import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import React from "react"

export interface SelectItem {
    name: string
    id: string | number
}
interface FormFieldSelect {
    options: Array<SelectItem>
    value?: string | number | null | undefined
    className?: string
    label?: string
    onChange: (event: SelectChangeEvent<string>) => void;

}

const FormFieldSelect = (props: FormFieldSelect) => {
    const { options = [], value = "", className, label, onChange  } = props
    return (
        <div className="flex gap-4 items-center flex-1">
            {label && <span className="text-sm">{label}</span>}
            <Select
                displayEmpty
                value={value as string}
                className={`w-full ${className}`}
                sx={{
                    height: '40px',  
                    fontSize: '14px' 
                }}
              onChange={onChange}
            >
                <MenuItem value="" disabled>
                    Please select an option
                </MenuItem>
                {options?.map((item) => {
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
