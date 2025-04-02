'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:  async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("department", "created_at", {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'), // Gán mặc định là thời gian hiện tại
    });

    await queryInterface.sequelize.query(`
      UPDATE department
      SET created_at = NOW()
      WHERE created_at IS NULL;
    `);
  },

  

   down : async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("department", "created_at");
  }
};
