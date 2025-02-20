'use client'

import React, { useEffect, useState } from 'react'
import FormFieldSelect, { SelectItem } from '../common/FormFieldSelect'
import departmentAPI from '@/util/api/department/Department'
import roleAPI from '@/util/api/roles/Roles'
import { Controller, useForm } from 'react-hook-form'
import { FilterUserProps, ParamsUserFilter } from '@/util/api/user/type'


const Filter = (props: FilterUserProps) => {
    const {setParams} = props
    const { control, handleSubmit } = useForm<ParamsUserFilter>();

    const [filterData, setFilterData] = useState({ department: [] as Array<SelectItem>, roles: [] as Array<SelectItem> })
    useEffect(() => {
        async function getDataFilter() {
            try {
                const [department, roles] = await Promise.all(
                    [departmentAPI.getDepartmentList(), roleAPI.roleList()])
                console.log("department", department, roles)
                setFilterData({ department, roles: roles, });
            } catch (error) {
                setFilterData({ department: [], roles: [] })
                console.log("error", error)
            }
        }
        getDataFilter()
    }, [])

    function onSubmit(values: ParamsUserFilter) {
        console.log("values", values)
        setParams(prev => ({...prev, ...values}))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className='flex gap-10 py-5'>
                <Controller
                    name="department_id"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                        <FormFieldSelect label='Department' options={filterData.department} {...field} />
                    )}
                />
                <Controller
                    name="role_id"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                        <FormFieldSelect label='Roles' options={filterData.roles} {...field} />
                    )}
                />
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}

export default Filter
