'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    token: DataTypes.TEXT,
    authId: DataTypes.UUID,
    createdAt: DataTypes.DATE
  }, {
    timestamps: false
  });
  Token.associate = function(models) {
    // Token.belongsTo(models.Auth, {
    //   foreignKey: "authId",
    //   targetKey: "id",
    //   onDelete: "SET NULL",
    //   onUpdate: "CASCADE"
    // })
  };
  Token.removeAttribute('id');
  return Token;
};