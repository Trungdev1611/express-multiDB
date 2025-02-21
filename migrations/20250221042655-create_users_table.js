'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add altering commands here. //up sẽ chạy khi chạy migration file này, down sẽ chạy khi cần undo
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  const tableExists = await queryInterface.describeTable("users"); //check if users table exist
  if (!tableExists) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // 🟢 Thêm giá trị mặc định
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), // 🟢 Tự động cập nhật
      },
      //liên kết foreign key
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "departments",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "roles",
          key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      }
    });
  }
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.  //revert ở đây ta sẽ xoá bảng users (ngược lại với up)
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
  await queryInterface.dropTable("users");
}
