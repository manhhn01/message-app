'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConversationUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ConversationUser.init(
    {
      conversation_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ConversationUser',
      tableName: 'conversation_users',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return ConversationUser;
};
