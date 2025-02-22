'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableExists = await queryInterface.describeTable("department");
    if (!tableExists) {  // 🛑 Sửa lại điều kiện, chỉ tạo bảng nếu nó chưa tồn tại
      await queryInterface.createTable("department", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        }
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("departments");
  }
};
