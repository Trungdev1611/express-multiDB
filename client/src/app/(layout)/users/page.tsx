'use client'
import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Filter from '@/components/users/Filter';
import { useToast } from '@/context/ToastContext';
import userAPI from '@/util/api/user/User';
import { ParamsCreateNewUser, ParamsUserFilter, UserType } from '@/util/api/user/type';
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query';

import ModalCreate from '@/components/users/ModalCreate';
import { EditOutlined } from '@mui/icons-material';
import { exportDataExcel } from '@/util/util';
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
    const [selectedRow, setSelectedRow] = React.useState<GridRowSelectionModel>([]);
    const { showToast } = useToast();
    const [total, setTotal] = useState(0)
    const [params, setParams] = useState<ParamsUserFilter>({
        page: 1,
        pageSize: 10,
        sortBy: "id",
        sort: "asc",
        search: ''

    })
    const [itemEdit, setItemEdit] = useState<null | UserType>(null)
    const [openCreate, setOpenCreate] = useState(false)
    const { data: responseUser, isLoading, isError , refetch} = useQuery({
        queryKey: ['userList', params],
        queryFn: async () => {
            const res = await userAPI.getUserList(params)
            setTotal(res.paginate.total)
            return res
        },
    })

    useEffect(() => {
        if (isError) {
            showToast("Get list user error", "error");
        }
    }, [isError, showToast]);

    function handleClose() {
        setOpenCreate(false)
        setItemEdit(null)
    }
    async function onSubmitModal(values: ParamsCreateNewUser, reset: () => void) {
        try {
            if(!itemEdit) {
                await userAPI.createNewUser(values)
                showToast(`Create new user successfully`, "success")
            }
            else {
                await userAPI.editUser(itemEdit.id, values)
                setItemEdit(null)
                showToast(`Create new user successfully`, "success")
            }
            refetch()
            reset();
            handleClose()
        } catch (error) {
            console.log(`error`, error)
        }
    }

    async function deleteUser() {
        if(selectedRow?.length <1) {
            showToast("Select at least one user to delete", `warning`)
            return
        }
        try {
            await userAPI.deleteUsers({listIdsDelete: selectedRow as Array<number>})
            refetch()
        } catch (error) {
            // showToast("delete users failed", `error`)
            console.log(`error`, error)
        }
    }
    console.log(`selectedRow`, selectedRow)

    function handleClick(value: UserType) {
        console.log(`valueClick`, value)
        setItemEdit(value)
    }

    const  columnAction:GridColDef<(UserType)> = {
        field: 'action',
        headerName: '',
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        flex: 0.5,
        renderCell: (value) => (
            <div>
                <EditOutlined className='cursor-pointer' onClick = {() => {
                    setOpenCreate(true)
                    handleClick(value.row)
                } }/>
            </div>
        ),
    }

   async function exportToExcel() {
        try {
            const data = await userAPI.exportExcelUsers()
            console.log(`data`, data)
            await exportDataExcel(data)
            showToast("Export data successfully", `success`)
        } catch (error) {
            console.log(`error`, error)
        }
    }
    return (
        <div className='p-3'>

            <Filter setParams={setParams} />

            <div className='flex justify-end mb-5 gap-x-2'>
                <Button variant="outlined" onClick={() => setOpenCreate(true)}>Create New</Button>
                <Button variant="outlined" color='error' onClick={ deleteUser}>Delete users</Button>
                <Button variant="outlined" color='info' onClick={ exportToExcel}>Export Excel</Button>
            </div>
   
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={responseUser?.data}
                    columns={[...columns, columnAction]}
                    rowCount={total}
                    loading={isLoading}
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
                    onRowSelectionModelChange={(newSelection) => {
                        setSelectedRow(newSelection);
                    }}
                    rowSelectionModel={selectedRow}
                    pageSizeOptions={[5, 10, 15, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    showCellVerticalBorder
                />
            </Box>

            {<ModalCreate
                handleClose={handleClose}
                onSubmitModal={onSubmitModal}
                openCreate={openCreate}
                itemEdit = {itemEdit}
            />

            }

        </div>

    )
}
