'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import api from '@/uitl/api';
import { useParams } from 'next/navigation';
import { Card, DatePicker } from 'antd';

const UserDetailPage = () => {
    const params = useParams();
    const { id } = params

    const [user, setUser] = useState<any>(null);
    const [dateData, setDateData] = useState<null | Dayjs>(null);

    useEffect(() => {
        if (id) {
            api.getQuery(`/v1/users/details/${id}`, { date: dateData ? dayjs(dateData).add(1, 'month'): null  }).then((res) => {
                setUser(res.data.data);
            });
        }
    }, [id, dateData]);

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            setDateData(date)
        }
        else {
            setDateData(null)
        }
    };
    if (!user) return <div>Loading...</div>;
    let currentMonth: number | null | string = null;
    return (
        <Card style={{ padding: 24 }} >
            <div className='flex flex-col gap-y-4'>
                <h2>Thông tin người dùng</h2>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Department:</strong> {user.department?.name}</p>
                <p><strong>Position:</strong> {user.position?.name}</p>
                <p><strong>Created At:</strong> {dayjs(user.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>

            </div>


            <h3>Lịch sử chấm công</h3>
            <div>
                <div className='flex justify-end mb-6 gap-x-2 items-center'>
                    <span>
                        Chọn tháng:</span>
                    <DatePicker
                        className="w-[250px]"
                        onChange={handleDateChange}
                        value={dateData}
                         format="MM/YYYY"
      picker="month"
                        placeholder="Chọn tháng/năm"
                        allowClear
                    />

                </div>
            </div>
            <ul>
                <ul>
                    {user.attendances?.map((item) => {
                        const itemMonth = dayjs(item.createdAt).format("YYYY-MM");
                        const showMonthHeader = itemMonth !== currentMonth;
                        if (showMonthHeader) currentMonth = itemMonth;

                      
                        const isFullDay = item.status === "enough" ? true :false

                        return (
                            <React.Fragment key={item.id}>
                                {showMonthHeader && (
                                    <li style={{ fontWeight: "bold", marginTop: "1em" }}>
                                        Chấm công tháng {dayjs(item.createdAt).format("MMMM YYYY")}
                                    </li>
                                )}
                                <li>
                                    {isFullDay ? '✅' : '⚠️'} Check-in: {dayjs(item.checkIn).format("HH:mm")} – Check-out: {dayjs(item.checkOut).format("HH:mm")} ngày {dayjs(item.checkIn).format("DD-MM-YYYY")}
                                </li>
                            </React.Fragment>
                        );
                    })}
                </ul>
            </ul>
        </Card>
    );
};

export default UserDetailPage;
