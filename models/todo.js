'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    do: DataTypes.TEXT,
    desc: DataTypes.TEXT,
    thumbnail: DataTypes.TEXT,
    accepted: DataTypes.TINYINT,
    deleted: DataTypes.TINYINT,
    categoryId: DataTypes.UUID,
    userId: DataTypes.UUID,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  todo.associate = function(models) {
    todo.belongsTo(models.Auth, {
      as: "user",
      foreignKey: 'userId'
    });
    todo.belongsTo(models.Category, {
      as: "category",
      foreignKey: 'categoryId'
    });
  };
  return todo;
};