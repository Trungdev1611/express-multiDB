'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tests", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // ✅ Nên thêm `allowNull: false` nếu name là bắt buộc
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tests");
  }
};
