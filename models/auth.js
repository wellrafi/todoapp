'use strict';
module.exports = (sequelize, DataTypes) => {
  const Auth = sequelize.define('Auth', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    slug: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    photo: DataTypes.STRING,
    postCode: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birthday: DataTypes.DATE,
    active: DataTypes.TINYINT,
    roleId: DataTypes.UUID,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Auth.associate = function(models) {
    Auth.hasMany(models.todo, {
      as: "todos", 
      foreignKey: "userId"
    })
  };
  return Auth;
};