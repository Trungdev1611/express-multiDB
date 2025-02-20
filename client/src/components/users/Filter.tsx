'use client'

import React, { useEffect, useState } from 'react'
import FormFieldSelect, { SelectItem } from '../common/FormFieldSelect'
import departmentAPI from '@/util/api/department/Department'
import roleAPI from '@/util/api/roles/Roles'


const Filter = () => {
    const [filterData, setFilterData] = useState({ department: [] as Array<SelectItem>, roles: [] as Array<SelectItem> })
    useEffect(() => {
        async function getDataFilter() {
            try {
                const [department, roles] = await Promise.all(
                    [departmentAPI.getDepartmentList(), roleAPI.roleList()])
                console.log("department", department, roles)
                setFilterData({department, roles: [],});
            } catch (error) {
                setFilterData({ department: [], roles: [] })
                console.log("error", error)
            }
        }
        getDataFilter()
    }, [])
    return (
        <div className='flex gap-10 py-5'>
            <FormFieldSelect label='Department' options={filterData.department} />
            <FormFieldSelect label='Roles' options={filterData.roles} />

        </div>
    )
}

export default Filter
