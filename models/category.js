'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false
    },
    title: DataTypes.STRING
  }, {
    timestamps: false,
  });
  Category.associate = function(models) {
    models.hasMany(models.Auth, {as: "user"})
  };
  return Category;
};