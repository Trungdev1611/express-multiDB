'use client'
import { Box, Button } from '@mui/material'
import React, {  useState } from 'react'
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
    const [total, setTotal] = useState(0)
    const [params, setParams] = useState({
        page: 1,
        pageSize: 10,
        sortBy: "id",
        sort: "asc",

    })
    const {  data: responseUser, isLoading, isError } = useQuery({
        queryKey: ['userList', params],
        queryFn: async () => {
          const res = await userAPI.getUserList(params)
          console.log("res", res)
          setTotal(res.paginate.total)

          return res
        },
      })

    if (isError) {
        showToast("get list user error", "error") 
    }
    return (
        <div className='p-3'>
    
                     <Filter />
     
                 <div className='flex justify-end mb-5'>
                     <Button variant="outlined">Create New</Button>
                 </div>
                    <Box sx={{ width: '100%' }}>
                    <DataGrid
                        rows={responseUser?.data}
                        columns={columns}
                        rowCount={total}
                        loading = {isLoading}
                        paginationMode="server" 
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: params.pageSize,
                                    page: params.page - 1,
    
                                },
                            },
                        }}
                        onPaginationModelChange={(params) => {
                            setParams((prev) => ({
                              ...prev,
                              page: params.page + 1, 
                              pageSize: params.pageSize,
                            }));
                          }}
                        pageSizeOptions={[5,10, 15, 20]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        showCellVerticalBorder
                    />
                </Box>
        </div>

    )
}
