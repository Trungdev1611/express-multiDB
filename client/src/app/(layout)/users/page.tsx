'use client'
import { Box, Button } from '@mui/material'
import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Filter from '@/components/users/Filter';
import { useToast } from '@/context/ToastContext';
import userAPI from '@/util/api/user/User';
import { UserType } from '@/util/api/user/type';
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query';
const columns: GridColDef<(UserType)>[] = [
    {
        field: 'id', headerName: 'ID', width: 90, headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'username',
        headerName: 'User name',
        editable: true,
        headerAlign: 'center',
        align: 'center',
        flex: 1
    },
    {
        field: 'email',
        headerName: 'Email',
        editable: true,
        headerAlign: 'center',
        align: 'center',
        flex: 1
    },
    {
        field: 'role_name',
        headerName: 'Role',
        type: 'number',
        editable: true,
        headerAlign: 'center',
        align: 'center',
        flex: 0.5
    },
    {
        field: 'created_at',
        headerName: 'Date',
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        flex: 2,
        valueFormatter: (value) => dayjs(value).format("DD-MM-YYYY")
    },
];


export default function Users() {
    const { showToast } = useToast();

    const { isLoading, data: responseUser, isError } = useQuery({
        queryKey: ['userList'],
        queryFn: async () => {
          const res = await userAPI.getUserList()
          console.log("res", res)
          return res
        },
      })
    
    
    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        showToast("get list user error", "error") 
        return 
    }
    // const total
    return (
        <div className='p-3'>
  
            <Box>
                <Filter />
            </Box>

            <div className='flex justify-end mb-5'>
                <Button variant="outlined">Create New</Button>
            </div>
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={responseUser?.data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    showCellVerticalBorder
                />
            </Box>
        </div>

    )
}
