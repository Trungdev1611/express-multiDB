import { UserData } from "@/uitl/type";
import { Modal, Table } from "antd";


interface UserListModalProps {
  visible: boolean;
  onCancel: () => void;
  loading: boolean;
  users: UserData[];
}

const userColumns = [
  { title: "User ID", dataIndex: "id", key: "id" },
  { title: "Username", dataIndex: "username", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
];

const UserListModal: React.FC<UserListModalProps> = ({
  visible,
  onCancel,
  loading,
  users,
}) => {
  return (
    <Modal
      open={visible}
      title="Users in Position"
      footer={null}
      onCancel={onCancel}
      width={600}
    >
      <Table
        columns={userColumns}
        dataSource={users}
        rowKey="id"
        loading={loading}
      />
    </Modal>
  );
};

export default UserListModal;
