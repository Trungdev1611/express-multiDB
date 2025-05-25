import { Menu } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const items = [
  {
    label: 'Users',
    key: '/users',
    icon: <UserOutlined />,
  },
  {
    label: 'Department',
    key: '/department',
    icon: <TeamOutlined />,
  },
  {
    label: 'Position',
    key: '/position',
    icon: <ProfileOutlined />,
  },
];

const Navbar: React.FC = () => {
  const router = useRouter();
  const [current, setCurrent] = useState<string>('/users');
  const pathname = usePathname();

  useEffect(() => {
    setCurrent(pathname || '/users');
  }, [pathname]);

  const onClick = (e: { key: string }) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="inline"
      style={{ height: '100vh'}}
      items={items}
    />
  );
};

export default Navbar;
