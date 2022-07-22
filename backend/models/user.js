const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Conversation, {
        through: 'ConversationUser',
        foreignKey: 'userId',
        otherKey: 'conversationId',
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: {
        type: DataTypes.STRING,
        defaultValue: '/images/user.jpg',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
    }
  );
  return User;
};
