'use client'
import React, { useEffect, useState } from 'react';
import { Table, Input, DatePicker, Form, Row, Col, Button, Select } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import dayjs from 'dayjs';
import api from '@/uitl/api';
import Link from 'next/link';


interface Department {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}


const DepartmentTable: React.FC = () => {
    const [data, setData] = useState<Department[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [filters, setFilters] = useState<{
        name?: string;
        date?: string;
        operation?: string
    }>({});

    const fetchData = async (
        page: number,
        pageSize: number,
        filters = {}
    ) => {
        setLoading(true);
        try {
            const res = await api.getQuery('v1/department', {
                page,
                pageSize,
                ...filters,
            });

            setData(res.data.data);
            setPagination({
                current: res.data.paginate.page,
                pageSize: res.data.paginate.pageSize,
                total: res.data.paginate.total,
            });
        } catch (error) {
            console.error('Failed to fetch department data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pagination.current!, pagination.pageSize!);
    }, []);

    const handleTableChange = (pagination: TablePaginationConfig) => {
        fetchData(pagination.current!, pagination.pageSize!, filters);
    };

    const onFinish = (values:  typeof filters) => {
        const { name, date, operation } = values;

        const newFilters: typeof filters = {};
        if (name) newFilters.name = name;
        if(date) newFilters.date = dayjs(date).format("YYYY-MM-DD")
        if(operation) newFilters.operation = operation
        setFilters(newFilters);
        fetchData(1, pagination.pageSize!, newFilters); // reset về page 1 khi filter
    };

    const columns: ColumnsType<Department> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
    render:(v) =>  <Link href={`/department/${v}`} className='text-blue-300'>{v}</Link>

        },
        {
            title: 'Department Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
        },
    ];

    return (
        <>
            <Form layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item name="name" label="Department Name">
                            <Input placeholder="Search by name" allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="date" label="Date">
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item name="operation" label="Ngày tạo so với">
                            <Select
                                options={[
                                    { label: 'Lớn hơn', value: 'greater' },
                                    { label: 'Nhỏ hơn', value: 'smaller' },
                                    { label: 'Bằng', value: 'equal' },
                                ]}
                                placeholder="Chọn điều kiện"
                                allowClear
                            />
                        </Form.Item>
                    </Col>


                    <Col span={4} style={{ display: 'flex', alignItems: 'end' }}>
                        <Button type="primary" htmlType="submit">
                            Filter
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
            />
        </>
    );
};

export default DepartmentTable;
