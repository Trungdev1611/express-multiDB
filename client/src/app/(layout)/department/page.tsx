'use client'
import { useToast } from '@/context/ToastContext';
import departmentAPI from '@/util/api/department/Department';
import { DepartmentType } from '@/util/api/department/type';
import { ParamsUserFilter } from '@/util/api/user/type';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'


const columns: GridColDef<(DepartmentType)>[] = [
    {
        field: 'id', headerName: 'ID', width: 90, headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'name',
        headerName: 'Department name',
        editable: true,
        headerAlign: 'center',
        align: 'center',
        flex: 2
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


const DepartmentPage = () => {
    const { showToast } = useToast();
    const [selectedRow, setSelectedRow] = React.useState<GridRowSelectionModel>([]);
    const [params, setParams] = useState<ParamsUserFilter>({
        page: 1,
        pageSize: 10,
        sortBy: "id",
        sort: "asc",
        search: ''

    })
    const [total, setTotal] = useState(0)
    const { data: departmentList , isLoading, isError} = useQuery({
        queryKey: ['getListDepartment', params],
        queryFn: async () => {
            const res = await departmentAPI.getDepartmentListTable(params)
            setTotal(res.paginate.total)
            return res.data 
        },
    })

    useEffect(() => {
        if (isError) {
            showToast("Get list user error", "error");
        }
    }, [isError, showToast]);
  return (
    <div>
         <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={departmentList}
                    columns={[...columns
                        // , columnAction
                    ]}
                    rowCount={total}
                    loading={isLoading}
                    paginationMode="server"
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: params.pageSize ,
                                page:  params.page - 1,

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
    </div>
  )
}

export default DepartmentPage