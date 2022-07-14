const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Message, { foreignKey: 'conversation_id' });
      this.belongsToMany(models.User, {
        foreignKey: 'conversation_id',
        otherKey: 'user_id',
        through: 'ConversationUser',
      });
    }
  }
  Conversation.init(
    {
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Conversation',
      tableName: 'conversations',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Conversation;
};
