'use client'
import { Table, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import api from '@/uitl/api';
import UserListModal from '@/components/ModalUsers';

const { Search } = Input;

const Position = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    total: 0,
  });

  const [nameFilter, setNameFilter] = useState('');
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const fetchData = async (params = {}) => {
    setLoading(true);
    const { page, pageSize } = pagination;
    const res = await api.getQuery('/position', {
        name: nameFilter,
        page: page,
        pageSize: pageSize,
        ...params,
    
    });

    setData(res.data.data); // giả sử API trả về: { items: [...], total: xxx }
    setPagination(prev => ({
      ...prev,
      ...res.data.paginate,
    }));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.pageSize, nameFilter]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
    });
  };

  const handleSearch = (value: string) => {
    setPagination({ ...pagination, page: 1 }); // reset page khi search
    setNameFilter(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenUserModal = async (positionId:any) => {
    setUserLoading(true);
    setUserModalVisible(true);
  
    try {
      const {data} = await api.getQuery(`/position/${positionId}`); // hoặc gọi API backend của bạn
      setSelectedUsers(data.data.users); // cần định dạng như [{ id, name, email }]
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setUserLoading(false);
    }
  };


  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
    {
      title: 'User Count',
      dataIndex: 'userCount',
      key: 'userCount',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (count:number, record:any) => (
        <Button type="link" onClick={() => handleOpenUserModal(record.id)}>
          {count}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Search
        placeholder="Search by name"
        enterButton
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />

<UserListModal
        visible={userModalVisible}
        onCancel={() => setUserModalVisible(false)}
        loading={userLoading}
        users={selectedUsers}
      />
    </>
  );
};

export default Position;
