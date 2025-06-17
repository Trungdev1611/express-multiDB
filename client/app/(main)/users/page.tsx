'use client'
import React, { useEffect, useState } from 'react'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import dayjs from 'dayjs';
import { Button, notification, Table } from 'antd';
import api from '@/uitl/api';
import Link from 'next/link';
import { UserData } from '@/uitl/type';
import { exportExcelClient } from '@/utils';

const columns: ColumnsType<UserData> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render:(v) =>  <Link href={`/users/${v}`} className='text-blue-300'>{v}</Link>
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: 'Updated At',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
  },
];
const Users = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await api.getQuery('v1/users/getlist', {
        page,
        pageSize,
      });
      setData(res.data.data);
      setPagination({
        current: res.data.paginate.page,
        pageSize: res.data.paginate.pageSize,
        total: res.data.paginate.total,
      });
    } catch (error) {
      console.error('Failed to fetch users', error);
      notification.error({
        message: "failed to get user data"
      })
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current!, pagination.pageSize!);
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchData(pagination.current!, pagination.pageSize!);
  };

  async function handleExport() {
    try {
      const res =  await api.getQuery(`v1/users/export-excel/user`, pagination,{ responseType: 'blob' }  )
      exportExcelClient(res.data)
      console.log(`res`, res)
    } catch (error) {
      console.log(`err`, error)
    }
  }
  return (
    <div>
      <div className='flex justify-end mt-2 mb-2'>
        <Button color="cyan" variant="solid"
        onClick = {handleExport}
        >Export excel</Button>
      </div>
          <Table  
      dataSource = {data}
      columns={columns}
      rowKey="id"
      pagination={pagination}
      loading = {loading}
      onChange={handleTableChange}

    />
    </div>
  )
}

export default Users