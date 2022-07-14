const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Message.init(
    {
      message: DataTypes.STRING,
      sender_id: DataTypes.INTEGER,
      conversation_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Message',
      tableName: 'messages',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Message;
};
