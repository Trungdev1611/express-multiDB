'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable("products", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          allowNull: false,
          unique: true, // ✅ `unique` hợp lý nhưng `autoIncrement` + `primaryKey` sai
          type: Sequelize.STRING,
        },
        original: {
          type: Sequelize.STRING,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: { // ✅ Đổi `updatedAt` thành `updated_at` để đồng nhất
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: { // ✅ Sửa `reference` thành `references`
            model: "users",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
      });
    } catch (error) {
      console.error("Migration failed:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("products");
  }
};
