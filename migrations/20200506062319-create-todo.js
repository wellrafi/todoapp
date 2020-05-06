'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      do: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      desc: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      thumbnail: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      accepted: {
        type: Sequelize.TINYINT,
        allowNull: true
      },
      deleted: {
        type: Sequelize.TINYINT,
        allowNull: true
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Categories",
          key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Auths",
          key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('todos');
  }
};