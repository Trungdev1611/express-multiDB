'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const tableExists = await queryInterface.describeTable("departments")
  if(tableExists) {
    await queryInterface.createTable("departments", {
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
    })
  }
 
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("departments")
}
