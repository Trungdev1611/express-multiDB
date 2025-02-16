import { MenuItem, Select } from '@mui/material'
import React from 'react'

const Filter = () => {
    return (
        <div className='flex gap-10 py-5'>
            <div className='flex gap-4 items-center flex-1'>
                <span>Department</span>
                <Select
                    displayEmpty
                    value={""}
                    className='w-full'
                //   onChange={handleChange}
                >
                    <MenuItem value="" disabled>
                        Please select an option
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </div>

            <div className='flex gap-4 items-center flex-1'>
                <span>Roles</span>
                <Select
                    displayEmpty
                    className='w-full'
                    value={""}
                //   onChange={handleChange}
                >
                    <MenuItem value="" disabled>
                        Please select an option
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </div>

        </div>
    )
}

export default Filter
