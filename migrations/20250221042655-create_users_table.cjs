'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableExists = await queryInterface.describeTable("users"); 
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
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        },
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  }
};
