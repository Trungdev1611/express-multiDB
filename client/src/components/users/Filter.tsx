import { MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FormFieldSelect, { SelectItem } from '../common/FormFieldSelect'
import api from '@/util/api'

const Filter = () => {
  const [filterData, setFilterData] = useState({department: [] as Array<SelectItem> , roles: [] as Array<SelectItem>})
  useEffect(() => {
    async function getDataFilter() {
      try {
          let [departmentRes, rolesRes] = await Promise.all(
            [
              api.get<Array<SelectItem>>('/department'),[]
              // api.get<Array<SelectItem>>('/roles'),
            ] )
            setFilterData({
              department: departmentRes.data,
              roles: [] //rolesRes.data ,
            });
      } catch (error) {
        console.log("error", error)
      }
    }
    getDataFilter()
  },[])
  return (
    <div className='flex gap-10 py-5'>
      <FormFieldSelect label='Department' options={filterData.department}  />
      <FormFieldSelect label='Roles'  options={filterData.roles} />

    </div>
  )
}

export default Filter
