

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
    label?: string | React.ReactNode
    onChange: (event: SelectChangeEvent<string>) => void;
    placeholder?: string,
    required?: boolean,
    layout?: "horizontal" | "vertical"

}


const FormFieldSelect = (props: FormFieldSelect) => {
    const { options = [], value = "", className, label, onChange , placeholder = "Please select an option" , required = false, layout ="horizontal"} = props
    return (
        <div className={`${layout === "horizontal" ? "items-center" : "flex-col gap-2"} flex gap-4  flex-1`}>
            <span>
            {label && <span className="text-sm inline-block">{label}</span>}
            {label && required && <span className="text-red-400 ml-1">*</span>}
            </span>

            <Select
                displayEmpty
                value={value as string}
                className={`w-full ${className}`}
                sx={{
                    height: '40px',  
                    fontSize: '14px',
                }}
              onChange={onChange}
            >
                
                <MenuItem value="" disabled>
                   {placeholder}
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
