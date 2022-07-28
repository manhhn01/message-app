const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Message, {
        foreignKey: 'conversationId',
      });
      this.belongsToMany(models.User, {
        foreignKey: 'conversationId',
        otherKey: 'userId',
        through: 'ConversationUser',
      });
      this.belongsTo(models.User, {
        foreignKey: 'creatorId',
        as: 'Creator',
      });
    }
  }
  Conversation.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      avatar: DataTypes.STRING,
      creatorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Conversation',
      tableName: 'Conversations',
    }
  );
  return Conversation;
};
