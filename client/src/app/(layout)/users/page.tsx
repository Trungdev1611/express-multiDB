'use client'
import { Box, Paper } from '@mui/material'
import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90,     headerAlign: 'center',
        align: 'center', },
    {
        field: 'firstName',
        headerName: 'First name',
        editable: true,
        headerAlign: 'center',
        align: 'center',
        flex: 1
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        editable: true,
        headerAlign: 'center',
        align: 'center',
        flex: 1
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        editable: true,
        headerAlign: 'center',
        align: 'center',
        flex: 0.5
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        flex: 2
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function Users() {
    return (
        <div className=' '>
            Filter
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    showCellVerticalBorder
                />
            </Box>
        </div>

    )
}
