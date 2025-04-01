'use client'

import React, { useEffect } from 'react'
import FormFieldSelect, { SelectItem } from '../common/FormFieldSelect'
import departmentAPI from '@/util/api/department/Department'
import roleAPI from '@/util/api/roles/Roles'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { FilterUserProps, ParamsUserFilter } from '@/util/api/user/type'
import TextFieldForm from '../common/TextFieldForm'
import { useDebounce } from '@/hooks/UseDebounce'
import { useQuery } from '@tanstack/react-query'


const Filter = (props: FilterUserProps) => {
    const { setParams } = props
    const { control, handleSubmit } = useForm<ParamsUserFilter>();
    const watchFields = useWatch({ control })
    // const [filterData, setFilterData] = useState({ department: [] as Array<SelectItem>, roles: [] as Array<SelectItem> })
    const watchDebounceValue = useDebounce(watchFields)
    const { data = {department: [] as Array<SelectItem>, roles: [] as Array<SelectItem>}  } = useQuery({
        queryKey: ["listFilters"],
        queryFn: async () => {
          const [department, roles] = await Promise.all([
            departmentAPI.getDepartmentList(),
            roleAPI.roleList(),
          ]);
          return { department, roles };
        },
        
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false
      });
    

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function onSubmit(values: ParamsUserFilter) {
        // console.log("values", values)
        // setParams(prev => ({...prev, ...values}))
    }
    useEffect(() => {
        console.log(`watchAllFields`, watchFields)
        if (Object.values(watchDebounceValue)) {
            setParams((prev) => ({ ...prev, ...watchDebounceValue }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchDebounceValue]);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-10 py-3'>
                <Controller
                    name="search"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                        <TextFieldForm label={<span className='min-w-[90px] inline-block'>Search</span>}  {...field} />
                    )}
                />
                <div className='flex-1'></div>
            </div>
            <div className='flex gap-10 py-3'>
                <Controller
                    name="department_id"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                        <FormFieldSelect 
                        label={<span className='min-w-[90px] inline-block'>Department</span>} 
                        options={data.department}
                        isIntinify
                        fetchMoreData={departmentAPI.getDepartmentList}
                        {...field} />
                    )}
                />

                <Controller
                    name="role_id"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                        <FormFieldSelect label={<span className='min-w-[90px]inline-block'>Roles</span>} options={data.roles} {...field} />
                    )}
                />
            </div>
            {/* <button type="submit">Submit</button> */}
        </form>
    )
}

export default Filter
