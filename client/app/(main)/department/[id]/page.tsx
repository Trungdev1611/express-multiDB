'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import api from '@/uitl/api';
import { useParams, useRouter } from 'next/navigation';

const DepartmentDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const [department, setDepartment] = useState<any>(null);

    useEffect(() => {
        if (id) {
            api.get(`/v1/department/detail/${id}`).then((res) => {
                setDepartment(res.data.data);
            });
        }
    }, [id]);

    if (!department) return <div>Loading...</div>;

    const columns: ColumnsType<any> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text, record) => (
                <a
                    className="text-blue-600 underline"
                    onClick={() => router.push(`/users/${record.id}`)}
                >
                    {text}
                </a>
            ),
        },
    
        {
            title: 'contract code',
            dataIndex: ['contract', 'numberCode'],
            key: 'name-contract',
        },
        {
            title: 'contract status',
            dataIndex: ['contract', 'status'],
            key: 'status-contract',
        },
    ];

    return (
        <Card title={`Chi tiết phòng ban: ${department.name}`} style={{ padding: 24 }}>
            <p><strong>Ngày tạo:</strong> {new Date(department.createdAt).toLocaleString()}</p>
            <p><strong>Ngày cập nhật:</strong> {new Date(department.updatedAt).toLocaleString()}</p>

            <h3 className="mt-6 mb-2 font-bold text-lg">Danh sách nhân viên</h3>
            <Table
                columns={columns}
                dataSource={department.users}
                rowKey="id"
                pagination={false}
            />
        </Card>
    );
};

export default DepartmentDetailPage;
